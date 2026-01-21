// Main JavaScript for Academic CV Website

// ===================================
// Navigation Toggle (Mobile)
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ===================================
    // Set Current Year in Footer
    // ===================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===================================
    // Load Data and Populate Sections
    // ===================================
    loadNews();
    loadPublications();
    loadTeaching();
    loadService();
    loadProjects();
    loadTalks();
    loadAwards();

    // ===================================
    // Publication Filters - Moved inside loadPublications
    // ===================================
});

// ===================================
// Load News
// ===================================
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        const news = await response.json();
        const container = document.getElementById('news-container');

        if (!container) return;

        container.innerHTML = news.map(item => `
            <div class="news-item">
                <div class="news-date">${item.date}</div>
                <div class="news-content">${item.content}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// ===================================
// Load Publications
// ===================================
// State for publications
let allPublications = [];
let filteredPublications = [];
let displayedPublications = 10;
const PUBLICATIONS_BATCH_SIZE = 10;

// ===================================
// Load Publications
// ===================================
async function loadPublications() {
    try {
        // Create pagination container if it doesn't exist
        const pubSection = document.getElementById('publications').querySelector('.container');
        if (pubSection && !document.getElementById('pagination-container')) {
            const paginationDiv = document.createElement('div');
            paginationDiv.id = 'pagination-container';
            paginationDiv.className = 'pagination-container';
            paginationDiv.innerHTML = '<button id="load-more-btn" class="btn-pagination">Show More</button>';
            pubSection.appendChild(paginationDiv);

            document.getElementById('load-more-btn').addEventListener('click', loadMorePublications);
        }

        const response = await fetch('data/publications.json');
        allPublications = await response.json();

        // Initialize filtered list with all publications
        filteredPublications = [...allPublications];

        // Initial Render
        renderPublications();

        // Setup filters
        setupPublicationFilters();

    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

// Render the current set of publications based on filter and limit
function renderPublications() {
    const container = document.getElementById('publications-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!container) return;

    // Slice the data based on current limit
    const visibleItems = filteredPublications.slice(0, displayedPublications);

    container.innerHTML = visibleItems.map(pub => {
        const links = [];
        if (pub.doi) links.push(`<a href="${pub.doi}" class="pub-link" target="_blank" rel="noopener">DOI</a>`);
        if (pub.pdf) links.push(`<a href="${pub.pdf}" class="pub-link" target="_blank" rel="noopener">PDF</a>`);
        if (pub.code) links.push(`<a href="${pub.code}" class="pub-link" target="_blank" rel="noopener">Code</a>`);
        if (pub.data) links.push(`<a href="${pub.data}" class="pub-link" target="_blank" rel="noopener">Data</a>`);

        const selectedBadge = pub.selected ? '<span class="badge">Selected</span>' : '';

        return `
            <div class="publication" data-type="${pub.type}">
                <h3 class="pub-title">${pub.title}${selectedBadge}</h3>
                <div class="pub-authors">${formatAuthors(pub.authors)}</div>
                <div class="pub-venue">${pub.venue}</div>
                ${pub.meta ? `<div class="pub-meta">${pub.meta}</div>` : ''}
                <div class="pub-links">${links.join('')}</div>
            </div>
        `;
    }).join('');

    // Toggle Load More button visibility
    if (loadMoreBtn) {
        if (displayedPublications >= filteredPublications.length) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    }
}

function loadMorePublications() {
    displayedPublications += PUBLICATIONS_BATCH_SIZE;
    renderPublications();
}

// Format authors with bolding for "Younesi"
function formatAuthors(authors) {
    if (!authors) return '';
    return authors.map(author => {
        if (author.includes('Younesi')) {
            return `<span class="author-me">${author}</span>`;
        }
        return author;
    }).join(', ');
}

// ===================================
// Publication Filters
// ===================================
function setupPublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Reset display limit when filter changes
            displayedPublications = PUBLICATIONS_BATCH_SIZE;

            // Update filtered list
            if (filter === 'all') {
                filteredPublications = [...allPublications];
            } else {
                filteredPublications = allPublications.filter(pub => pub.type === filter);
            }

            renderPublications();
        });
    });
}

// ===================================
// Load Teaching
// ===================================
async function loadTeaching() {
    try {
        const response = await fetch('data/teaching.json');
        const teaching = await response.json();
        const container = document.getElementById('teaching-container');

        if (!container) return;

        container.innerHTML = teaching.map(item => `
            <div class="teaching-item">
                <div class="teaching-header">
                    <div class="teaching-title">${item.course}</div>
                    <div class="teaching-semester">${item.semester}</div>
                </div>
                <div class="teaching-role">${item.role}</div>
                <p>${item.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading teaching:', error);
    }
}

// ===================================
// Load Professional Service
// ===================================
async function loadService() {
    try {
        const response = await fetch('data/service.json');
        const service = await response.json();
        const container = document.getElementById('service-container');

        if (!container) return;

        let html = '';

        // Group by category
        const categories = {
            'Reviewer': service.filter(s => s.category === 'reviewer'),
            'Program Committee': service.filter(s => s.category === 'pc'),
            'Memberships': service.filter(s => s.category === 'membership')
        };

        for (const [category, items] of Object.entries(categories)) {
            if (items.length > 0) {
                html += `<div class="service-category">
                    <h3>${category}</h3>`;
                items.forEach(item => {
                    html += `<div class="service-item">
                        <span class="service-name">${item.name}</span>
                        ${item.year ? `<span class="service-year"> (${item.year})</span>` : ''}
                    </div>`;
                });
                html += `</div>`;
            }
        }

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading service:', error);
    }
}

// ===================================
// Load Projects
// ===================================
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('projects-container');

        if (!container) return;

        container.innerHTML = projects.map(project => {
            const links = [];
            if (project.github) links.push(`<a href="${project.github}" class="pub-link" target="_blank" rel="noopener">GitHub</a>`);
            if (project.demo) links.push(`<a href="${project.demo}" class="pub-link" target="_blank" rel="noopener">Demo</a>`);
            if (project.paper) links.push(`<a href="${project.paper}" class="pub-link" target="_blank" rel="noopener">Paper</a>`);

            return `
                <div class="project-card">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <p class="project-tech"><strong>Technologies:</strong> ${project.technologies}</p>
                    <div class="project-links">${links.join('')}</div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// ===================================
// Load Talks
// ===================================
async function loadTalks() {
    try {
        const response = await fetch('data/talks.json');
        const talks = await response.json();
        const container = document.getElementById('talks-container');

        if (!container) return;

        container.innerHTML = talks.map(talk => `
            <div class="talk-item">
                <h3 class="talk-title">${talk.title}</h3>
                <div class="talk-venue">${talk.venue}</div>
                <div class="talk-date">${talk.date}</div>
                ${talk.slides ? `<div class="pub-links"><a href="${talk.slides}" class="pub-link" target="_blank" rel="noopener">Slides</a></div>` : ''}
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading talks:', error);
    }
}

// ===================================
// Load Awards
// ===================================
async function loadAwards() {
    try {
        const response = await fetch('data/awards.json');
        const awards = await response.json();
        const container = document.getElementById('awards-container');

        if (!container) return;

        container.innerHTML = awards.map(award => `
            <div class="award-item">
                <div class="award-year">${award.year}</div>
                <div class="award-content">
                    <div class="award-name">${award.name}</div>
                    <p>${award.description}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading awards:', error);
    }
}
