// Simple script to handle small dynamic elements and theme toggle

document.addEventListener('DOMContentLoaded', function () {
    console.log("System initialized. Welcome to the portfolio.");

    // Theme Toggle Logic
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = toggleBtn.querySelector('i');

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-lightbulb');
        icon.classList.add('fa-moon');
    }

    toggleBtn.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-lightbulb');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-lightbulb');
        }
    });

    // Update 'Last Visit' with current time
    const dateElements = document.querySelectorAll('.block-content.small-text');
    if (dateElements.length > 0) {
        // We are targeting the specific block content for stats
        // This is a bit hacky but fits the old school vibe of "just make it work"
        const now = new Date();
        // We won't actually replace the text because it's hardcoded in HTML, 
        // but we could append a log message.
    }
});
