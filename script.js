// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const typingText = document.getElementById('typing-text');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// ===== Utility: Throttle Function =====
// 節流函數：限制函數執行頻率，提升滾動性能
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Typing Effect =====
const typingTexts = [
    '全端開發者 💻',
    'AI 應用開發者 🤖',
    '智慧農業創新者 🌱',
    '跨域整合實踐者 🚀',
    '終身學習者 📚'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    
    // ===== Email Obfuscation =====
    // 防止爬蟲抓取 Email，用 JS 動態生成
    const emailUser = 'simon';
    const emailDomain = 'bochengsu.com';
    const email = emailUser + '@' + emailDomain;
    const mailtoLink = 'mailto:' + email;
    
    // Hero 區域的 email icon 連結
    document.querySelectorAll('.email-link').forEach(link => {
        link.href = mailtoLink;
        // 確保點擊時能正確跳轉
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = mailtoLink;
        });
    });
    
    // Contact 區域顯示 email 文字
    document.querySelectorAll('.email-link-text').forEach(link => {
        link.href = mailtoLink;
        link.textContent = email;
        // 確保點擊時能正確跳轉
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = mailtoLink;
        });
    });
});

// ===== Navbar Scroll Effect =====
let lastScrollY = 0;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (currentScrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
}

// 使用節流，每 100ms 最多執行一次
window.addEventListener('scroll', throttle(handleScroll, 100));

// ===== Mobile Navigation =====
// 取得選單內可聚焦的元素
function getFocusableElements() {
    return navMenu.querySelectorAll('a, button');
}

// 焦點陷阱：確保 Tab 只在選單內循環
function handleFocusTrap(e) {
    if (!navMenu.classList.contains('active')) return;
    
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab：往前
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab：往後
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    // ESC 關閉選單
    if (e.key === 'Escape') {
        closeMenu();
    }
}

// 關閉選單函數
function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleFocusTrap);
    navToggle.focus(); // 返回焦點到漢堡按鈕
}

// 開啟選單函數
function openMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleFocusTrap);
    // 聚焦到第一個選單項目
    const firstLink = navMenu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
}

navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// ===== Active Navigation Link =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// 使用節流，每 100ms 最多執行一次
window.addEventListener('scroll', throttle(updateActiveLink, 100));

// ===== Theme Toggle =====
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Check for saved theme preference or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    }
}

initTheme();

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ===== Back to Top =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Reveal on Scroll Animation =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// 使用節流，每 100ms 最多執行一次
window.addEventListener('scroll', throttle(revealOnScroll, 100));
window.addEventListener('load', revealOnScroll);

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== Project Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Contact Form =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>發送中...</span>';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    
    try {
        // Send to Formspree
        const response = await fetch('https://formspree.io/f/mojwjkvp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('發送失敗');
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'toast-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>訊息已送出！</h3>
            <p>感謝您的來信，我會盡快回覆您。</p>
        `;
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'toast-overlay';
        
        document.body.appendChild(overlay);
        document.body.appendChild(successMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            overlay.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
                overlay.remove();
            }, 300);
        }, 3000);
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        // Show error message
        alert('發送失敗，請稍後再試或直接寄信給我！');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// ===== Particles Background =====
function createParticles() {
    const container = document.getElementById('particles-bg');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--color-primary);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // 跳過空的 # 連結
        if (!href || href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Page Load Animation (Simplified) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Easter Egg =====
console.log('%c嗨！歡迎來到我的網站！🚀', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c如果你對我感興趣，歡迎透過表單聯絡我！', 'font-size: 14px; color: #64748b;');
console.log('%c💻 查看更多作品：GitHub & LinkedIn', 'font-size: 12px; color: #06b6d4;');
