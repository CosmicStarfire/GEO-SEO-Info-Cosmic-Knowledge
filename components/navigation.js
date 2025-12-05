class CustomNavigation extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    background-color: rgba(15, 23, 42, 0.5);
                }
                
                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-weight: 700;
                    font-size: 1.25rem;
                    background: linear-gradient(to right, #8b5cf6, #e879f9);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                
                .nav-link {
                    color: #c7d2fe;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    text-decoration: none;
                }
                
                .nav-link:hover {
                    color: #e879f9;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(15, 23, 42, 0.95);
                        flex-direction: column;
                        padding: 1rem 2rem;
                        gap: 1rem;
                    }
                    
                    .nav-links.open {
                        display: flex;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="#" class="logo">SEO/GEO 🚀</a>
                    
                    <button class="mobile-menu-btn">
                        <i data-feather="menu"></i>
                    </button>
                    
                    <div class="nav-links">
                        <a href="#learn" class="nav-link">Learn</a>
                        <a href="#quiz" class="nav-link">Quiz</a>
                        <a href="#resources" class="nav-link">Resources</a>
                        <a href="#" class="nav-link">About</a>
                    </div>
                </div>
            </nav>
        `;
        
        // Initialize mobile menu toggle
        const menuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            feather.replace();
        });
        
        // Close mobile menu when clicking a link
        this.shadowRoot.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
}

customElements.define('custom-navigation', CustomNavigation);