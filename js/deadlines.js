document.addEventListener('DOMContentLoaded', function () {
    loadConferences();
});

let allConferences = [];

async function loadConferences() {
    try {
        const response = await fetch('data/conferences.json');
        allConferences = await response.json();

        renderConferences();
        setupDeadlineFilters();

        // Update countdowns every second
        setInterval(updateCountdowns, 1000);

    } catch (error) {
        console.error('Error loading conferences:', error);
    }
}

function renderConferences() {
    const upcomingContainer = document.getElementById('upcoming-conferences');
    const pastContainer = document.getElementById('past-conferences');

    if (!upcomingContainer || !pastContainer) return;

    const now = new Date();

    // Get active filter
    const activeBtn = document.querySelector('.filter-chip.active');
    const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

    upcomingContainer.innerHTML = '';
    pastContainer.innerHTML = '';

    allConferences.forEach(conf => {
        // Filter Logic
        if (filter !== 'all') {
            const tags = conf.tags || [];
            // Normalize tags for comparison
            const normalizedTags = tags.map(t => t.toLowerCase());
            if (!normalizedTags.includes(filter)) return;
        }

        // Handle TBD or invalid dates gracefully
        let deadline = null;
        let isPast = false;

        if (conf.deadline && conf.deadline !== 'TBD' && !isNaN(new Date(conf.deadline).getTime())) {
            deadline = new Date(conf.deadline);
            isPast = deadline < now;
        } else {
            // Treat TBD as upcoming but without a countdown
            isPast = false;
        }

        const card = createConferenceCard(conf, isPast, deadline);

        if (isPast) {
            pastContainer.appendChild(card);
        } else {
            upcomingContainer.appendChild(card);
        }
    });

    if (upcomingContainer.children.length === 0) {
        upcomingContainer.innerHTML = '<p class="no-deadlines">No upcoming deadlines found for this filter.</p>';
    }

    // Re-run countdown update immediately for new elements
    updateCountdowns();
}

function createConferenceCard(conf, isPast, deadlineObj) {
    const div = document.createElement('div');
    div.className = `conference-item ${isPast ? 'past' : 'upcoming'}`;

    // Tags
    const tagsHtml = (conf.tags || []).map(tag => `<span class="conf-tag">${tag}</span>`).join('');

    // Calendar Links - Only if we have a valid deadline
    let calLinks = '';
    if (!isPast && deadlineObj) {
        calLinks = `
            <div class="calendar-links">
                <a href="${generateGoogleCalendarLink(conf, deadlineObj)}" target="_blank" rel="noopener">Google</a>
                <a href="${generateIcsLink(conf, deadlineObj)}" target="_blank" rel="noopener">Outlook/iCal</a>
            </div>
        `;
    }

    // Countdown or Status Text
    let statusHtml = '';
    if (isPast) {
        statusHtml = '<div class="past-label">Deadline Passed</div>';
    } else if (deadlineObj) {
        statusHtml = `<div class="countdown" data-deadline="${conf.deadline}">Loading...</div>`;
    } else {
        statusHtml = '<div class="countdown tbd">Date TBD</div>';
    }

    // Deadline Text
    let deadlineText = 'Date TBD';
    if (deadlineObj) {
        deadlineText = deadlineObj.toLocaleString('en-GB', { timeZone: 'Europe/Vienna', timeZoneName: 'short' });
    } else if (conf.deadline) {
        deadlineText = conf.deadline; // Show raw text like "TBD" or "pull request to update"
    }

    div.innerHTML = `
        <div class="conf-header">
            <h3><a href="${conf.link}" target="_blank" rel="noopener">${conf.title}</a></h3>
            ${statusHtml}
        </div>
        
        <div class="conf-details">
            <div class="conf-full-name">${conf.full_name}</div>
            <div class="conf-meta">
                <span>${conf.date}</span> • <span>${conf.location}</span>
            </div>
            ${conf.rank ? `<div class="conf-rank">Rank: <strong>${conf.rank}</strong></div>` : ''}
            ${conf.note ? `<div class="conf-note">Note: ${conf.note}</div>` : ''}
            <div class="conf-deadline-date">Deadline: ${deadlineText}</div>
            
            <div class="conf-footer">
                <div class="conf-tags">${tagsHtml}</div>
                ${calLinks}
            </div>
        </div>
    `;

    return div;
}

function updateCountdowns() {
    const countdownEls = document.querySelectorAll('.countdown');
    const now = new Date();

    countdownEls.forEach(el => {
        // Skip TBD items
        if (el.classList.contains('tbd')) return;

        const deadlineStr = el.getAttribute('data-deadline');
        if (!deadlineStr || deadlineStr === 'TBD') return;

        const deadline = new Date(deadlineStr);
        if (isNaN(deadline.getTime())) return;

        const diff = deadline - now;

        if (diff <= 0) {
            el.textContent = "Deadline Passed";
            el.classList.add('urgent');
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Color coding
        el.classList.remove('urgent', 'warning', 'safe');
        if (days < 7) {
            el.classList.add('urgent'); // Red
        } else if (days < 30) {
            el.classList.add('warning'); // Orange
        } else {
            el.classList.add('safe'); // Green
        }
    });
}

function setupDeadlineFilters() {
    const filters = document.querySelectorAll('.filter-chip');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-chip.active')?.classList.remove('active');
            btn.classList.add('active');
            renderConferences();
        });
    });
}

// Calendar Generators
function generateGoogleCalendarLink(conf, deadlineObj) {
    const title = encodeURIComponent(`${conf.title} Deadline`);
    const details = encodeURIComponent(`Deadline for ${conf.full_name}\n${conf.note || ''}\nLink: ${conf.link}`);

    // Format dates for Google (YYYYMMDDTHHmmssZ)
    const startDate = deadlineObj;
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const fmt = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${fmt(startDate)}/${fmt(endDate)}`;
}

function generateIcsLink(conf, deadlineObj) {
    const startDate = deadlineObj.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(deadlineObj.getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, '');

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${conf.title} Deadline`,
        `DESCRIPTION:${conf.full_name}\\n${conf.link}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
