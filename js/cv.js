// CV Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    loadCVData();
});

async function loadCVData() {
    try {
        // Load publications for CV
        const pubResponse = await fetch('data/publications.json');
        const publications = await pubResponse.json();

        // Separate by type
        const journals = publications.filter(p => p.type === 'journal');
        const conferences = publications.filter(p => p.type === 'conference');

        // Populate journals
        const journalContainer = document.getElementById('cv-journals');
        if (journalContainer && journals.length > 0) {
            journalContainer.innerHTML = journals.map(pub =>
                `<li>${formatCVPublication(pub)}</li>`
            ).join('');
        }

        // Populate conferences
        const confContainer = document.getElementById('cv-conferences');
        if (confContainer && conferences.length > 0) {
            confContainer.innerHTML = conferences.map(pub =>
                `<li>${formatCVPublication(pub)}</li>`
            ).join('');
        }

        // Load teaching
        const teachResponse = await fetch('data/teaching.json');
        const teaching = await teachResponse.json();
        const teachContainer = document.getElementById('cv-teaching');
        if (teachContainer) {
            teachContainer.innerHTML = teaching.map(item => `
                <div class="cv-entry">
                    <div class="cv-entry-header">
                        <strong>${item.course}</strong>
                        <span class="cv-date">${item.semester}</span>
                    </div>
                    <p>${item.role}</p>
                </div>
            `).join('');
        }

        // Load service
        const serviceResponse = await fetch('data/service.json');
        const service = await serviceResponse.json();

        const reviewers = service.filter(s => s.category === 'reviewer');
        const pc = service.filter(s => s.category === 'pc');
        const memberships = service.filter(s => s.category === 'membership');

        populateCVService('cv-service-reviewer', reviewers);
        populateCVService('cv-service-pc', pc);
        populateCVService('cv-service-membership', memberships);

        // Load awards
        const awardsResponse = await fetch('data/awards.json');
        const awards = await awardsResponse.json();
        const awardsContainer = document.getElementById('cv-awards');
        if (awardsContainer) {
            awardsContainer.innerHTML = awards.map(award => `
                <div class="cv-entry">
                    <div class="cv-entry-header">
                        <strong>${award.name}</strong>
                        <span class="cv-date">${award.year}</span>
                    </div>
                    <p>${award.description}</p>
                </div>
            `).join('');
        }

        // Load talks
        const talksResponse = await fetch('data/talks.json');
        const talks = await talksResponse.json();
        const talksContainer = document.getElementById('cv-talks');
        if (talksContainer) {
            talksContainer.innerHTML = talks.map(talk => `
                <div class="cv-entry">
                    <div class="cv-entry-header">
                        <strong>${talk.title}</strong>
                        <span class="cv-date">${talk.date}</span>
                    </div>
                    <p>${talk.venue}</p>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading CV data:', error);
    }
}

function formatCVPublication(pub) {
    let citation = formatAuthors(pub.authors) + '. ';
    citation += `"${pub.title}." `;
    citation += `<em>${pub.venue}</em>`;
    if (pub.meta) {
        citation += `, ${pub.meta}`;
    }
    citation += '.';
    return citation;
}

function formatAuthors(authors) {
    return authors.map(author => {
        if (author.includes('Younesi')) {
            return `<strong>${author}</strong>`;
        }
        return author;
    }).join(', ');
}

function populateCVService(containerId, items) {
    const container = document.getElementById(containerId);
    if (container && items.length > 0) {
        container.innerHTML = '<ul>' + items.map(item =>
            `<li>${item.name}${item.year ? ` (${item.year})` : ''}</li>`
        ).join('') + '</ul>';
    }
}
