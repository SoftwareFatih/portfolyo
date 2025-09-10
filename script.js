// ===== GENEL DEĞİŞKENLER =====
let isScrolling = false;
let lastScrollTop = 0;

// ===== DOM YÜKLENDİĞİNDE ÇALIŞACAK FONKSİYONLAR =====
document.addEventListener('DOMContentLoaded', function() {
    // AOS animasyon kütüphanesini başlat
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Smooth scroll için navbar linklerini ayarla
    setupSmoothScroll();
    
    // Navbar scroll efektini ayarla
    setupNavbarScroll();
    
    // Skill bar animasyonlarını ayarla
    setupSkillBars();
    
    // Typing efekti için hero title'ı ayarla
    setupTypingEffect();
    
    // Floating elementlerin animasyonunu ayarla
    setupFloatingElements();
    
    // Parallax efektini ayarla
    setupParallaxEffect();
    
    // Form gönderimini ayarla
    setupContactForm();
    
    // Scroll to top butonu ekle
    addScrollToTopButton();
    
    // Particle efekti ekle
    createParticleEffect();
});

// ===== SMOOTH SCROLL AYARLARI =====
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Navbar yüksekliği için
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFEKTİ =====
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Navbar arka plan rengini değiştir
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Aktif menü öğesini belirle
                updateActiveNavItem();
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

// ===== AKTİF MENÜ ÖĞESİNİ GÜNCELLE =====
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SKILL BAR ANİMASYONLARI =====
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 500);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== TYPING EFEKTİ =====
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const textToType = "Merhaba, Ben Fatih Gödel";
    
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < textToType.length) {
            heroTitle.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Typing tamamlandıktan sonra orijinal HTML'i geri yükle
            setTimeout(() => {
                heroTitle.innerHTML = originalText;
            }, 1000);
        }
    }
    
    // Sayfa yüklendikten 1 saniye sonra typing efektini başlat
    setTimeout(typeWriter, 1000);
}

// ===== FLOATING ELEMENTS ANİMASYONU =====
function setupFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Rastgele pozisyon ve süre ayarla
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        icon.style.animationDelay = randomDelay + 's';
        icon.style.animationDuration = randomDuration + 's';
        
        // Hover efekti ekle
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2) rotate(360deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
}

// ===== PARALLAX EFEKTİ =====
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== İLETİŞİM FORMU =====
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Basit validasyon
            if (!name || !email || !message) {
                showNotification('Lütfen tüm gerekli alanları doldurun!', 'error');
                return;
            }
            
            // Email validasyonu
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Lütfen geçerli bir email adresi girin!', 'error');
                return;
            }
            
            // Başarı mesajı göster
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
            
            // Formu temizle
            this.reset();
        });
    }
}

// ===== BİLDİRİM SİSTEMİ =====
function showNotification(message, type = 'info') {
    // Mevcut bildirimi kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Stil ekle
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animasyonla göster
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Kapatma butonu
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Otomatik kapatma
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== SCROLL TO TOP BUTONU =====
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Click event listener
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover efekti
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ===== PARTICLE EFEKTİ =====
function createParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Başlat
    resizeCanvas();
    initParticles();
    animate();
    
    // Resize event
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// ===== CURSOR EFEKTİ =====
function setupCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hover efektleri
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--primary-color)';
        });
    });
}

// ===== SAYFA YÜKLENDİĞİNDE EK EFEKTLER =====
window.addEventListener('load', function() {
    // Cursor efektini başlat
    setupCursorEffect();
    
    // Sayfa yükleme animasyonu
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Hero section'a özel efektler
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        heroTitle.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
});

// ===== PERFORMANS İYİLEŞTİRMELERİ =====
// Throttle fonksiyonu
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Scroll event'lerini throttle ile optimize et
window.addEventListener('scroll', throttle(function() {
    // Scroll işlemleri burada
}, 16)); // 60fps için 16ms

// ===== HATA YÖNETİMİ =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Hatası:', e.error);
});

// ===== RESPONSIVE AYARLAR =====
function handleResize() {
    // Mobile cihazlarda bazı efektleri devre dışı bırak
    if (window.innerWidth < 768) {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = 'none';
        });
    } else {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = 'flex';
        });
    }
}

window.addEventListener('resize', throttle(handleResize, 250));
