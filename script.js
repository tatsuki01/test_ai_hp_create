/*
 * script.js
 *
 * This file is responsible for fetching topic data from data.json and rendering
 * cards in the Statistics and AI sections. It also implements a simple search
 * filter to allow users to quickly find topics of interest. The search is
 * case-insensitive and searches both titles and descriptions.
 */

// Global variables to hold topic data
let topics = [];

// Fetch data from JSON file when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            topics = data;
            renderCards(topics);
        })
        .catch(error => console.error('データの読み込みに失敗しました:', error));

    // Set current year in the footer automatically
    document.getElementById('year').textContent = new Date().getFullYear();

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = topics.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        renderCards(filtered);
    });
});

/**
 * Render cards based on the provided data array. Cards are separated into
 * Statistics and AI grids depending on their category field.
 *
 * @param {Array} data - Array of topic objects containing title, description,
 * category, and link.
 */
function renderCards(data) {
    const statGrid = document.getElementById('statistics-grid');
    const aiGrid = document.getElementById('ai-grid');
    // Clear existing content
    statGrid.innerHTML = '';
    aiGrid.innerHTML = '';

    data.forEach(item => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">もっと詳しく</a>
        `;
        // Append to correct grid based on category
        if (item.category.toLowerCase() === 'statistics') {
            statGrid.appendChild(card);
        } else if (item.category.toLowerCase() === 'ai' || item.category.toLowerCase() === 'ai/人工知能') {
            aiGrid.appendChild(card);
        }
    });
}