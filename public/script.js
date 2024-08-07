document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const darkModeBtn = document.getElementById('dark-mode-btn');

    // Toggle menu for mobile
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Handle link clicks
    navList.addEventListener('click', function(e) {
        const section = e.target.getAttribute('data-section');
        if (section) {
            e.preventDefault(); // Prevent default anchor behavior
            loadContent(section);
            // Close the menu after clicking a link on mobile
            if (window.innerWidth <= 768) { // Ensure this only happens on mobile view
                navList.classList.remove('active');
            }
        }
    });

    // Function to load content via AJAX
    function loadContent(section) {
        if (section === 'home') {
            document.getElementById('content').innerHTML = `
                <section class="hero_section">
                    <div class="text_container">
                        <h2><span class="lg_text">Hi,</span> I am Sanjay</h2>
                        <h1 class="lg_text">FULL STACK DEVELOPER</h1>
                    </div>
                </section>
                <section class="black_box">
                    <h2>WORK, I CAN DO FOR <span>YOU</span></h2>
                </section>
                <section class="work">
                    <div class="grid_item">
                        <div class="card">
                            <div class="image_container">
                                <img src="web.png" alt="web development" />
                            </div>
                            <div class="card_content">
                                <h3>Web Development</h3>
                                <p>I create responsive and dynamic websites that look great on all devices. I focus on both front-end design and back-end development to ensure a seamless user experience and reliable performance.</p>
                            </div>
                        </div>
                    </div>
                    <div class="grid_item">
                        <div class="card">
                            <div class="image_container">
                                <img src="mobile.png" alt="app development" />
                            </div>
                            <div class="card_content">
                                <h3>App Development</h3>
                                <p>I build high-performance mobile apps for various platforms. My apps are designed to be user-friendly and efficient, providing a smooth experience for all users.</p>
                            </div>
                        </div>
                    </div>
                    <div class="grid_item">
                        <div class="card">
                            <div class="image_container">
                                <img src="web.png" alt="UI UX Design" />
                            </div>
                            <div class="card_content">
                                <h3>UI UX Design</h3>
                                <p>I can create user-friendly and attractive designs. My focus is on making digital experiences easy to use and beautiful.</p>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            history.pushState(null, '', '#home');
        } else {
            const url = `${section}.html`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('content').innerHTML = data;
                    history.pushState(null, '', `#${section}`);
                })
                .catch(error => console.error('Error loading content:', error));
        }
    }

    // Handle browser navigation (back/forward buttons)
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        loadContent(hash || 'home');
    });

    // Load the default section on page load if there is a hash in the URL
    const hash = window.location.hash.substring(1);
    loadContent(hash || 'home');

    // Dark mode toggle functionality
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Save the user's preference in localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeBtn.textContent = '🌕'; // Change button icon to sun
        } else {
            localStorage.setItem('theme', 'light');
            darkModeBtn.textContent = '🌙'; // Change button icon to moon
        }
    });

    // Apply saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeBtn.textContent = '🌕'; // Set icon to sun if dark mode is saved
        } else {
            document.body.classList.remove('dark-mode');
            darkModeBtn.textContent = '🌙'; // Set icon to moon if light mode is saved
        }
    }
});
