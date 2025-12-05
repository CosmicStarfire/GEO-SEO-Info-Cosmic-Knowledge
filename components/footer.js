// components/footer.js

class CustomFooter extends HTMLElement {
    connectedCallback() {
        // Attach shadow DOM so styles don't leak
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 3rem;
                }

                footer {
                    border-top: 1px solid rgba(129, 140, 248, 0.35);
                    background: radial-gradient(circle at top, rgba(56, 189, 248, 0.08), transparent 55%),
                                radial-gradient(circle at bottom, rgba(168, 85, 247, 0.16), transparent 55%),
                                rgba(3, 7, 18, 0.96);
                    padding: 2rem 1.5rem 2.5rem;
                    color: #e5e7eb;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                }

                .footer-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                @media (min-width: 768px) {
                    .footer-inner {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                }

                .brand {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .brand-title {
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    background: linear-gradient(135deg, #a855f7, #38bdf8);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }

                .brand-subtitle {
                    font-size: 0.9rem;
                    color: #9ca3af;
                }

                .meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                    font-size: 0.8rem;
                    color: #9ca3af;
                }

                .pill {
                    border-radius: 999px;
                    border: 1px solid rgba(148, 163, 184, 0.45);
                    padding: 0.25rem 0.75rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    background: rgba(15, 23, 42, 0.9);
                }

                .bullet {
                    width: 6px;
                    height: 6px;
                    border-radius: 999px;
                    background: radial-gradient(circle, #a855f7, transparent);
                }

                .links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    font-size: 0.85rem;
                }

                a {
                    color: #a5b4fc;
                    text-decoration: none;
                    position: relative;
                    padding-bottom: 1px;
                }

                a::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 1px;
                    width: 0;
                    background: linear-gradient(90deg, #a855f7, #ec4899);
                    transition: width 0.18s ease;
                }

                a:hover::after {
                    width: 100%;
                }

                .legal {
                    font-size: 0.75rem;
                    color: #6b7280;
                    margin-top: 0.25rem;
                }
            </style>

            <footer aria-label="Site footer">
                <div class="footer-inner">
                    <div class="brand">
                        <div class="brand-title">
                            SEO vs GEO · Cosmic Knowledge Odyssey
                        </div>
                        <div class="brand-subtitle">
                            Built as an interactive demo for understanding Generative Engine Optimization (GEO) vs classic SEO.
                        </div>
                        <div class="legal">
                            © ${new Date().getFullYear()} Cosmic Knowledge · For educational use in lunch &amp; learns and workshops.
                        </div>
                    </div>

                    <div>
                        <div class="meta">
                            <span class="pill">
                                <span class="bullet"></span>
                                <span>AI search &amp; GEO</span>
                            </span>
                            <span class="pill">
                                <span class="bullet"></span>
                                <span>Inspect the head for metadata</span>
                            </span>
                        </div>

                        <div class="links" style="margin-top: 0.9rem;">
                            <a href="#learn">Back to “Learn”</a>
                            <a href="#quiz">Take the quiz</a>
                            <a href="#resources">Explore resources</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define("custom-footer", CustomFooter);
