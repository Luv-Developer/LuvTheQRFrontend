import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import  {useNavigate} from "react-router-dom"
import "./stylesheets/Home.css"

const Home = () => {

    const navigate = useNavigate()

   // Connection of Google Sigin in
  const signedin = async (name, email, picture) => {
    try {
      let props = { name, email, picture };
      let response = await axios.post("https://luvtheqr.onrender.com/signin", props, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = response.data
      if(data.success == true){
        window.location.href = "https://luvtheqr.onrender.com/profile"
      }
      else{
        navigate("/")
      }
    } 
    catch (err) {
      console.log(err);
    }
  };

    const generateQRPattern = () => {
        const qrPattern = document.getElementById('qrPattern');
        if (!qrPattern) return;
        qrPattern.innerHTML = '';

        for (let i = 0; i < 441; i++) { // 21x21 grid
            const cell = document.createElement('div');
            cell.classList.add('qr-cell');

            // Randomly fill cells to simulate QR pattern
            if (Math.random() > 0.5) {
                cell.style.backgroundColor = '#1f2937';
            } else {
                cell.style.backgroundColor = 'transparent';
            }

            // Add animation delay
            cell.style.animationDelay = `${(i % 21) * 0.02}s`;

            qrPattern.appendChild(cell);
        }
    };

    const generateHistory = () => {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;
        const historyItems = [
            { url: 'https://example.com/product', time: '2 hours ago' },
            { url: 'https://myportfolio.site', time: '1 day ago' },
            { url: 'https://event-registration.com', time: '3 days ago' }
        ];

        historyList.innerHTML = '';

        historyItems.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.style.animationDelay = `${index * 0.1}s`;

            historyItem.innerHTML = `
                <div class="history-info">
                    <div class="history-icon">
                        <i class="fas fa-link"></i>
                    </div>
                    <div>
                        <div class="history-url">${item.url.substring(0, 30)}...</div>
                        <div class="history-time">${item.time}</div>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteHistoryItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            historyList.appendChild(historyItem);
        });
    };

    useEffect(() => {
        generateQRPattern();
        generateHistory();
    }, []);

    return (
        <>
            <header id="header">
                <div className="container">
                    <div className="nav-container">
                        <a href="#" className="logo">
                            <i className="fas fa-qrcode"></i>
                            LuvTheQR
                        </a>

                        <nav className="nav-links">
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="http://localhost:8000/profile">Profile</a>
                        </nav>

                        <button className="mobile-menu-btn">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </header>

            <section className="hero">
                <div className="hero-bg">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Create Beautiful <span className="gradient-text">QR Codes</span> Instantly</h1>
                            <p>Transform your links into stylish, customizable QR codes. Track, manage, and share with our intuitive platform.</p>

                            <div className="cta-buttons">
                                <button className="btn btn-primary" id="getStartedBtn" onClick={() => showNotification('Getting started with LuvTheQR! Redirecting...')}>
                                    <i className="fas fa-rocket"></i> Get Started Free
                                    <GoogleLogin
                                            onSuccess={(credentialResponse) => {
                                              let credentialResponsedecoded = jwtDecode(
                                                credentialResponse.credential,
                                              );
                                              signedin(
                                                credentialResponsedecoded.name,
                                                credentialResponsedecoded.email,
                                                credentialResponsedecoded.picture,
                                              );
                                            }}
                                            onError={() => {
                                              console.log("Login Failed");
                                            }}
                                          />
                                </button>

            <div className="create-qr-section">
                <h2>Ready to Create Something Amazing?</h2>
                <p>Generate a new QR code in seconds. Customize it with colors, logos, and tracking features.</p>
                <a href = "http://localhost:8000/createqr">
                <button className="btn-create-qr" id="createQrBtn">
                    <i class="fas fa-plus-circle"></i>
                    Create Your QR Code
                </button>
                </a>
            </div>
                    </div>
                            <br></br>

                            <div className="hero-stats">
                                <div className="stat">
                                    <div className="stat-number">10K+</div>
                                    <div className="stat-label">QR Codes Generated</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-number">5K+</div>
                                    <div className="stat-label">Active Users</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-number">99.9%</div>
                                    <div className="stat-label">Uptime</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="qr-preview">
                                <div className="qr-header">
                                    <h3>Your QR Code</h3>
                                    <i className="fas fa-sync-alt" id="refreshQR" onClick={() => { generateQRPattern(); showNotification('QR code refreshed!'); }}></i>
                                </div>

                                <div className="qr-code-container">
                                    <div className="qr-code">
                                        <div className="qr-pattern" id="qrPattern"></div>
                                    </div>
                                </div>

                                <div className="qr-actions">
                                    <button className="action-btn" id="downloadBtn" onClick={() => showNotification('Downloading QR code...')}>
                                        <i className="fas fa-download"></i> Download
                                    </button>
                                    <button className="action-btn" id="shareBtn" onClick={() => showNotification('Sharing QR code...')}>
                                        <i className="fas fa-share-alt"></i> Share
                                    </button>
                                    <button className="action-btn" id="saveBtn" onClick={() => { showNotification('QR code saved to history!'); setTimeout(() => { generateHistory(); }, 100); }}>
                                        <i className="fas fa-save"></i> Save to History
                                    </button>
                                </div>

                                <div className="qr-history">
                                    <h4>Recent QR Codes</h4>
                                    <div className="history-list" id="historyList"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features" id="features">
                <div className="container">
                    <h2 className="section-title">Powerful Features</h2>
                    <p className="section-subtitle">Everything you need to create and manage QR codes efficiently</p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-link"></i>
                            </div>
                            <h3>Quick Generation</h3>
                            <p>Generate QR codes instantly from any URL or text input with just one click.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-history"></i>
                            </div>
                            <h3>History Tracking</h3>
                            <p>View all your generated QR codes in one organized history panel.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-trash-alt"></i>
                            </div>
                            <h3>Easy Management</h3>
                            <p>Delete unwanted QR codes with a single click to keep your history clean.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fab fa-google"></i>
                            </div>
                            <h3>Google Sign-In</h3>
                            <p>Securely access your account with Google authentication.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <h3>Mobile Responsive</h3>
                            <p>Works perfectly on all devices - desktop, tablet, and mobile.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-palette"></i>
                            </div>
                            <h3>Customizable Design</h3>
                            <p>Personalize your QR codes with colors, logos, and styles.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-works" id="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Create your QR code in just three simple steps</p>

                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Paste Your Link</h3>
                            <p>Copy and paste any URL you want to convert into a QR code.</p>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Customize & Generate</h3>
                            <p>Choose colors, add a logo, and customize the design of your QR code.</p>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Download & Share</h3>
                            <p>Download your QR code in multiple formats or share it directly.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Create Your First QR Code?</h2>
                        <p>Join thousands of users who trust LuvTheQR for their QR code needs. No credit card required.</p>

                        <div className="cta-buttons">
                            <button className="btn btn-primary" id="ctaGetStartedBtn" onClick={() => showNotification('Getting started with LuvTheQR! Redirecting...')}>
                                <i className="fas fa-rocket"></i> Get Started Free
                                                                    <GoogleLogin
                                            onSuccess={(credentialResponse) => {
                                              let credentialResponsedecoded = jwtDecode(
                                                credentialResponse.credential,
                                              );
                                              signedin(
                                                credentialResponsedecoded.name,
                                                credentialResponsedecoded.email,
                                                credentialResponsedecoded.picture,
                                              );
                                            }}
                                            onError={() => {
                                              console.log("Login Failed");
                                            }}
                                          />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-about">
                            <div className="footer-logo">
                                <i className="fas fa-qrcode"></i>
                                LuvTheQR
                            </div>
                            <p>Making QR codes beautiful, functional, and accessible for everyone.</p>
                        </div>

                        <div className="footer-links">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Connect</h4>
                            <ul>
                                <li><a href="#twitter">Twitter</a></li>
                                <li><a href="#facebook">Facebook</a></li>
                                <li><a href="#instagram">Instagram</a></li>
                                <li><a href="#linkedin">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2026 LuvTheQR. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Home;