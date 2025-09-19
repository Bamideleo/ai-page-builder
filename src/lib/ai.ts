// AI Generation Service
export class AIService {
  private static instance: AIService;
  private apiKey: string;

  private constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateProject(prompt: string, onStream?: (chunk: string) => void): Promise<{
    html: string;
    css: string;
    js: string;
    framework: string;
    components: any[];
  }> {
    // Simulate AI generation with streaming
    const templates = {
      ecommerce: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Store</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">ModernStore</div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="nav-cart">🛒 <span id="cart-count">0</span></div>
        </div>
    </nav>
    
    <section class="hero">
        <div class="hero-content">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest trends with fast delivery and great prices</p>
            <button class="cta-button">Shop Now</button>
        </div>
    </section>
    
    <section class="products" id="products">
        <div class="container">
            <h2>Featured Products</h2>
            <div class="product-grid" id="product-grid">
                <!-- Products will be loaded here -->
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ModernStore. All rights reserved.</p>
        </div>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-menu a:hover {
    opacity: 0.8;
}

.nav-cart {
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
}

.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.cta-button {
    background: white;
    color: #667eea;
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.products {
    padding: 4rem 0;
    background: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.products h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.product-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}

.product-info {
    padding: 1.5rem;
}

.product-title {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 1rem;
}

.add-to-cart {
    width: 100%;
    background: #667eea;
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.add-to-cart:hover {
    background: #5a6fd8;
}

.footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero-content h1 {
        font-size: 2rem;
    }
    
    .product-grid {
        grid-template-columns: 1fr;
    }
}`,
        js: `// E-commerce functionality
let cart = [];
let cartCount = 0;

// Sample products
const products = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, emoji: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, emoji: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 49.99, emoji: '💻' },
    { id: 4, name: 'Phone Case', price: 24.99, emoji: '📱' },
    { id: 5, name: 'Bluetooth Speaker', price: 79.99, emoji: '🔊' },
    { id: 6, name: 'Desk Lamp', price: 39.99, emoji: '💡' }
];

// Initialize the store
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
});

function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = \`
        <div class="product-image">\${product.emoji}</div>
        <div class="product-info">
            <h3 class="product-title">\${product.name}</h3>
            <p class="product-price">$\${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(\${product.id})">
                Add to Cart
            </button>
        </div>
    \`;
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        cartCount++;
        updateCartCount();
        showNotification(\`\${product.name} added to cart!\`);
    }
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cartCount;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = \`
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    \`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = \`
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
\`;
document.head.appendChild(style);`,
        framework: 'vanilla',
        components: [
          { type: 'navbar', content: { title: 'ModernStore', links: ['Home', 'Products', 'About', 'Contact'] } },
          { type: 'hero', content: { title: 'Discover Amazing Products', subtitle: 'Shop the latest trends with fast delivery and great prices' } },
          { type: 'grid', content: { items: [
            { id: 1, name: 'Wireless Headphones', price: 99.99, emoji: '🎧' },
            { id: 2, name: 'Smart Watch', price: 199.99, emoji: '⌚' },
            { id: 3, name: 'Laptop Stand', price: 49.99, emoji: '💻' }
          ] } },
          { type: 'footer', content: { text: '© 2025 ModernStore. All rights reserved.' } }
        ]
      },
      portfolio: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>John Doe - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">JD</div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    
    <section class="hero" id="home">
        <div class="hero-content">
            <h1>John Doe</h1>
            <p>Full Stack Developer & UI/UX Designer</p>
            <div class="hero-buttons">
                <button class="btn-primary">View My Work</button>
                <button class="btn-secondary">Download CV</button>
            </div>
        </div>
    </section>
    
    <section class="about" id="about">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>I'm a passionate full-stack developer with 5+ years of experience creating digital solutions that make a difference. I specialize in React, Node.js, and modern web technologies.</p>
                    <div class="skills">
                        <div class="skill">React</div>
                        <div class="skill">Node.js</div>
                        <div class="skill">TypeScript</div>
                        <div class="skill">Python</div>
                        <div class="skill">AWS</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="portfolio" id="portfolio">
        <div class="container">
            <h2>My Work</h2>
            <div class="portfolio-grid" id="portfolio-grid">
                <!-- Portfolio items will be loaded here -->
            </div>
        </div>
    </section>
    
    <section class="contact" id="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <form class="contact-form">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
    
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #667eea;
}

.hero {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.hero-content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease;
}

.hero-content p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease 0.2s both;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    animation: fadeInUp 1s ease 0.4s both;
}

.btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-primary {
    background: white;
    color: #667eea;
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.btn-primary:hover, .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.about, .portfolio, .contact {
    padding: 5rem 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.about-text p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.8;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.skill {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.portfolio-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.portfolio-item:hover {
    transform: translateY(-10px);
}

.portfolio-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}

.portfolio-info {
    padding: 1.5rem;
}

.portfolio-title {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.portfolio-description {
    color: #666;
    margin-bottom: 1rem;
}

.portfolio-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background: #f0f0f0;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    color: #666;
}

.contact {
    background: #f8f9fa;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: #667eea;
}

.contact-form button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.contact-form button:hover {
    transform: translateY(-2px);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero-content h1 {
        font-size: 2.5rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .portfolio-grid {
        grid-template-columns: 1fr;
    }
}`,
        js: `// Portfolio functionality
const portfolioItems = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        emoji: '🛒',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'Collaborative project management tool with real-time updates',
        emoji: '📋',
        technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL']
    },
    {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Beautiful weather app with location-based forecasts',
        emoji: '🌤️',
        technologies: ['React', 'TypeScript', 'Weather API', 'Chart.js']
    },
    {
        id: 4,
        title: 'Social Media App',
        description: 'Instagram-like social platform with photo sharing',
        emoji: '📸',
        technologies: ['React Native', 'Firebase', 'Redux', 'AWS S3']
    }
];

// Initialize portfolio
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolio();
    setupSmoothScrolling();
    setupContactForm();
});

function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    portfolioItems.forEach(item => {
        const portfolioCard = createPortfolioCard(item);
        portfolioGrid.appendChild(portfolioCard);
    });
}

function createPortfolioCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-item';
    card.innerHTML = \`
        <div class="portfolio-image">\${item.emoji}</div>
        <div class="portfolio-info">
            <h3 class="portfolio-title">\${item.title}</h3>
            <p class="portfolio-description">\${item.description}</p>
            <div class="portfolio-tech">
                \${item.technologies.map(tech => \`<span class="tech-tag">\${tech}</span>\`).join('')}
            </div>
        </div>
    \`;
    return card;
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupContactForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Simulate form submission
        showNotification('Message sent successfully! I\\'ll get back to you soon.');
        form.reset();
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = \`
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    \`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = \`
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
\`;
document.head.appendChild(style);`,
        framework: 'vanilla',
        components: [
          { type: 'navbar', content: { title: 'JD', links: ['Home', 'About', 'Portfolio', 'Contact'] } },
          { type: 'hero', content: { title: 'John Doe', subtitle: 'Full Stack Developer & UI/UX Designer' } },
          { type: 'text', content: { title: 'About Me', description: 'Passionate developer with 5+ years experience' } },
          { type: 'grid', content: { items: [
            { id: 1, title: 'E-Commerce Platform', description: 'Full-stack solution', emoji: '🛒' },
            { id: 2, title: 'Task Management App', description: 'Collaborative tool', emoji: '📋' }
          ] } },
          { type: 'form', content: { fields: ['name', 'email', 'message'] } }
        ]
      }
    };

    // Determine which template to use based on prompt
    let selectedTemplate = templates.ecommerce; // default
    
    if (prompt.toLowerCase().includes('portfolio') || prompt.toLowerCase().includes('personal')) {
      selectedTemplate = templates.portfolio;
    } else if (prompt.toLowerCase().includes('ecommerce') || prompt.toLowerCase().includes('store') || prompt.toLowerCase().includes('shop')) {
      selectedTemplate = templates.ecommerce;
    }

    // Simulate streaming response
    const steps = [
      'Analyzing your prompt...',
      'Generating HTML structure...',
      'Creating responsive CSS...',
      'Adding JavaScript functionality...',
      'Optimizing for performance...',
      'Finalizing components...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (onStream) {
        onStream(steps[i]);
      }
    }

    return selectedTemplate;
  }

  async explainCode(code: string): Promise<string> {
    // Simulate AI code explanation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `This code creates a modern, responsive website with the following features:

🏗️ **Structure**: Clean HTML5 semantic structure with navigation, hero section, content areas, and footer.

🎨 **Styling**: Modern CSS with:
- Gradient backgrounds and glass-morphism effects
- Responsive grid layouts that adapt to all screen sizes
- Smooth animations and hover effects
- Mobile-first design approach

⚡ **Functionality**: Interactive JavaScript including:
- Smooth scrolling navigation
- Dynamic content loading
- Form handling with validation
- Shopping cart functionality (for e-commerce)
- Responsive mobile menu

🚀 **Performance**: Optimized for fast loading with efficient CSS and minimal JavaScript footprint.

The code follows modern web standards and best practices for accessibility, SEO, and user experience.`;
  }

  async generateFromVoice(transcript: string): Promise<string> {
    // Process voice input and convert to structured prompt
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const voicePrompts = {
      'make navbar red': 'Update the navigation bar background color to red',
      'add contact form': 'Add a contact form with name, email, and message fields',
      'change hero text': 'Modify the hero section headline and description',
      'add pricing table': 'Insert a pricing table with multiple plan options'
    };

    return voicePrompts[transcript.toLowerCase()] || `Convert voice command: "${transcript}" into website modification`;
  }
}

export const aiService = AIService.getInstance();