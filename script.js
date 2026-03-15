// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(20, 20, 20, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe feature cards, package cards, and review cards
document.querySelectorAll('.feature-card, .package-card, .review-card').forEach(card => {
    observer.observe(card);
});

// Modal functionality
function orderPackage(packageName, price) {
    const nameElement = document.getElementById('orderPackageName');
    const priceElement = document.getElementById('orderPrice');
    const modal = document.getElementById('orderModal');
    
    if (nameElement && priceElement) {
        nameElement.textContent = `แพ็กเกจ ${packageName}`;
        priceElement.textContent = `ราคา: ฿${price}`;
    }
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Show beautiful notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.success}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// GOOGLE APPS SCRIPT CONFIGURATION
// ==========================================
// ใส่ Google Apps Script Web App URL ของคุณที่นี่
// หรือตั้งค่าได้จากหน้า Admin > ตั้งค่า
const APPS_SCRIPT_URL = localStorage.getItem('netflixAppsScriptUrl') || 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec';

// ใช้ localStorage หรือ Google Apps Script
// false = ใช้ localStorage (ใช้งานได้เลย, ข้อมูลอยู่ในเครื่อง)
// true = ใช้ Google Apps Script (ข้อมูลบน Cloud, แชร์ระหว่างผู้ใช้)
const USE_APPS_SCRIPT = true;

// ==========================================
// PACKAGE CONFIGURATION - แก้ไขที่นี่ที่เดียว
// ==========================================
const packagesConfig = [
    {
        id: '1-day',
        name: '1 วัน',
        price: 19,
        badge: 'ทดลองใช้',
        featured: false,
        bestseller: true,
        description: 'เหมาะสำหรับทดลองใช้งาน หรือดูหนังเรื่องโปรดแบบเร่งด่วน',
        highlight: 'ประหยัดที่สุดสำหรับใช้งานสั้นๆ',
        features: [
            'ดูได้ 1 อุปกรณ์',
            'คุณภาพ 4K Ultra HD',
            'ไม่มีโฆษณาขัดจังหวะ',
            'ดูได้ตลอด 24 ชั่วโมง',
            'ประกันตลอดอายุแพ็กเกจ',
            'รองรับทุกอุปกรณ์'
        ]
    },
    {
        id: '3-day',
        name: '3 วัน',
        price: 39,
        badge: 'ยอดนิยม',
        featured: false,
        bestseller: true,
        description: 'เหมาะสำหรับดูซีรีส์สั้นๆ หรือหนังหลายเรื่อง',
        highlight: 'ยอดนิยมสำหรับวันหยุดยาว',
        features: [
            'ดูได้ 1 อุปกรณ์',
            'คุณภาพ 4K Ultra HD',
            'ไม่มีโฆษณาขัดจังหวะ',
            'ดูได้ตลอด 24 ชั่วโมง',
            'ประกันตลอดอายุแพ็กเกจ',
            'รองรับทุกอุปกรณ์'
        ]
    },
    {
        id: '7-day',
        name: '1 สัปดาห์',
        price: 59,
        badge: 'คุ้มค่า',
        featured: false,
        bestseller: true,
        description: 'เหมาะสำหรับดูซีรีส์เรื่องโปรดแบบไม่รีบ',
        highlight: 'คุ้มค่าสำหรับใช้งาน 1 สัปดาห์',
        features: [
            'ดูได้ 1 อุปกรณ์',
            'คุณภาพ 4K Ultra HD',
            'ไม่มีโฆษณาขัดจังหวะ',
            'ดูได้ตลอด 24 ชั่วโมง',
            'ประกันตลอดอายุแพ็กเกจ',
            'รองรับทุกอุปกรณ์'
        ]
    },
    {
        id: '15-day',
        name: '1 เดือน',
        price: 109,
        badge: 'ประหยัดสุด',
        featured: false,
        bestseller: true,
        description: 'เหมาะสำหรับใช้งานระยะยาว คุ้มค่าที่สุดในระยะยาว',
        highlight: 'ประหยัดสุด! ยอดนิยมของลูกค้า',
        features: [
            'ดูได้ 1 อุปกรณ์',
            'คุณภาพ 4K Ultra HD',
            'ไม่มีโฆษณาขัดจังหวะ',
            'ดูได้ตลอด 24 ชั่วโมง',
            'ประกันตลอดอายุแพ็กเกจ',
            'รองรับทุกอุปกรณ์'
        ]
    },
    {
        id: '30-day',
        name: '1 เดือน',
        price: 159,
        badge: 'สุดคุ้ม',
        featured: false,
        bestseller: true,
        description: 'เหมาะสำหรับใช้งานระยะยาว ประหยัดที่สุด',
        highlight: 'สุดคุ้ม! ประหยัดกว่ารายเดือน 13%',
        features: [
            'ดูได้ 1 อุปกรณ์',
            'คุณภาพ 4K Ultra HD',
            'ไม่มีโฆษณาขัดจังหวะ',
            'ดูได้ตลอด 24 ชั่วโมง',
            'ประกันตลอดอายุแพ็กเกจ',
            'รองรับทุกอุปกรณ์'
        ]
    }
];

// Package details (for modal - auto-generated from config)
const packageDetails = {};
packagesConfig.forEach(pkg => {
    packageDetails[pkg.name] = {
        name: `แพ็กเกจ ${pkg.name}`,
        description: pkg.description,
        features: pkg.features,
        highlight: pkg.highlight
    };
});

// Render packages to HTML
function renderPackages() {
    const container = document.querySelector('.packages-grid');
    console.log('Render packages - container found:', !!container);
    
    if (!container) {
        console.error('packages-grid container not found!');
        return;
    }
    
    const html = packagesConfig.map(pkg => `
        <div class="package-card ${pkg.featured ? 'featured' : ''}" data-package="${pkg.id}">
            <div class="package-badge ${pkg.bestseller ? 'bestseller' : ''}">${pkg.badge}</div>
            <div class="package-header">
                <h3>${pkg.name}</h3>
                <div class="package-price">
                    <span class="currency">฿</span>
                    <span class="amount">${pkg.price}</span>
                </div>
            </div>
            <ul class="package-features">
                ${pkg.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
            <button class="btn btn-package" onclick="showPackageDetails('${pkg.name}', ${pkg.price})">ดูรายละเอียด</button>
        </div>
    `).join('');
    
    console.log('Generated HTML length:', html.length);
    container.innerHTML = html;
    console.log('Container innerHTML length after set:', container.innerHTML.length);
    console.log('Packages rendered:', packagesConfig.length);
}

// Show package details modal
function showPackageDetails(packageName, price) {
    const details = packageDetails[packageName];
    if (!details) {
        orderPackage(packageName, price);
        return;
    }
    
    const modal = document.getElementById('packageDetailModal');
    if (!modal) return;
    
    // Update modal content
    document.getElementById('detailPackageName').textContent = details.name;
    document.getElementById('detailPackagePrice').textContent = `฿${price}`;
    document.getElementById('detailPackageDesc').textContent = details.description;
    document.getElementById('detailPackageHighlight').textContent = details.highlight;
    
    const featuresList = document.getElementById('detailPackageFeatures');
    featuresList.innerHTML = details.features.map(f => `
        <li><i class="fas fa-check-circle"></i> ${f}</li>
    `).join('');
    
    // Update order button
    const orderBtn = document.getElementById('detailOrderBtn');
    if (orderBtn) {
        orderBtn.onclick = function() {
            closeModal('packageDetailModal');
            setTimeout(() => orderPackage(packageName, price), 300);
        };
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId = 'orderModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
const orderModalElem = document.getElementById('orderModal');
if (orderModalElem) {
    orderModalElem.addEventListener('click', (e) => {
        if (e.target === orderModalElem) {
            closeModal('orderModal');
        }
    });
}

// Close package detail modal when clicking outside
const packageDetailModalElem = document.getElementById('packageDetailModal');
if (packageDetailModalElem) {
    packageDetailModalElem.addEventListener('click', (e) => {
        if (e.target === packageDetailModalElem) {
            closeModal('packageDetailModal');
        }
    });
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    const orderModal = document.getElementById('orderModal');
    const detailModal = document.getElementById('packageDetailModal');
    if (e.key === 'Escape') {
        if (orderModal && orderModal.classList.contains('active')) {
            closeModal('orderModal');
        }
        if (detailModal && detailModal.classList.contains('active')) {
            closeModal('packageDetailModal');
        }
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (target >= 1000) {
                element.textContent = Math.floor(start).toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(start);
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target >= 1000) {
                element.textContent = target.toLocaleString() + '+';
            } else {
                element.textContent = target;
            }
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('10,000')) {
                    animateCounter(stat, 10000);
                }
                // Rating is now updated dynamically from reviews
                // Don't override it with static value
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    });
});

// Package card hover effect enhancement
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        document.querySelectorAll('.package-card').forEach(c => {
            if (c !== this && !c.classList.contains('featured')) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        document.querySelectorAll('.package-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==========================================
// NOTIFICATION SYSTEM - UX/UI Notifications
// ==========================================

// Show beautiful notification
function showNotification(message, type = 'success', duration = 3000) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const messages = {
        success: 'สำเร็จ!',
        error: 'เกิดข้อผิดพลาด!',
        info: 'ข้อมูล',
        warning: 'คำเตือน'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${icons[type] || icons.success}"></i>
            </div>
            <div class="notification-body">
                <div class="notification-title">${messages[type] || messages.success}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.closest('.notification-toast').remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
    
    @keyframes progressShrink {
        from {
            width: 100%;
        }
        to {
            width: 0%;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// GOOGLE APPS SCRIPT API FUNCTIONS
// ==========================================

// API call helper
async function callAppsScript(action, data = null) {
    if (!USE_APPS_SCRIPT || APPS_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec') {
        return null;
    }
    
    try {
        const options = {
            method: data ? 'POST' : 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const url = `${APPS_SCRIPT_URL}?action=${action}`;
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error('Apps Script API Error:', error);
        return null;
    }
}

// ==========================================
// REVIEW SYSTEM - ระบบรีวิวแบบ Shared
// ==========================================

// Default reviews (5 reviews)
const defaultReviews = [
    //{
    //    id: 1,
    //    name: 'คุณสมชาย',
    //    text: 'บริการดีมาก ได้รับไอดีเร็วมาก ภายใน 2 นาทีก็ได้แล้ว คุ้มค่าราคา',
    //    rating: 5,
    //    type: 'ลูกค้าประจำ',
    //    date: new Date().toISOString()
    // },
    //{
    //    id: 2,
    //    name: 'คุณวิไล',
    //    text: 'ใช้มา 3 เดือนแล้ว ไม่มีปัญหาเลย ดูได้ลื่นๆ คุณภาพ 4K ชัดมาก',
    //    rating: 5,
    //    type: 'ลูกค้าประจำ',
    //    date: new Date().toISOString()
    //},
    //{
    //    id: 3,
    //    name: 'คุณณัฐพล',
    //    text: 'ทีมงานบริการดีมาก มีปัญหาตอนแรก แต่แก้ไขให้ทันที แนะนำเลย',
    //    rating: 5,
    //    type: 'ลูกค้าใหม่',
    //    date: new Date().toISOString()
    //},
    //{
    //    id: 4,
    //    name: 'คุณจิราพร',
    //    text: 'ราคาคุ้มค่ามาก เมื่อเทียบกับการสมัครเอง แนะนำให้เพื่อนๆ ใช้บริการ',
    //    rating: 5,
    //    type: 'ลูกค้าประจำ',
    //    date: new Date().toISOString()
    //},
    //{
    //    id: 5,
    //    name: 'คุณธนาวุฒ',
    //    text: 'ดูได้ลื่นไม่มีกระตุก คุณภาพภาพชัดเสียงดี คุ้มค่าเงินมากครับ',
    //    rating: 4,
    //    type: 'ลูกค้าใหม่',
    //    date: new Date().toISOString()
    //}
];

// Storage keys
const REVIEWS_STORAGE_KEY = 'netflixReviews_shared';
const USER_ID_KEY = 'netflix_userId';
const REVIEW_RESTRICTION_KEY = 'netflix_review_restriction_enabled';
const REVIEW_RESTRICTION_DISPLAY_KEY = 'netflix_review_restriction_display';
const MAINTENANCE_MODE_KEY = 'netflix_maintenance_mode';
const ADMIN_ONLINE_KEY = 'netflix_admin_online';
const ADMIN_LAST_SEEN_KEY = 'netflix_admin_last_seen';

// Review pagination
let currentPage = 1;
const reviewsPerPage = 6;

// Get or create user ID
function getUserId() {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
}

// Check if review restriction is enabled
function isReviewRestrictionEnabled() {
    const stored = localStorage.getItem(REVIEW_RESTRICTION_KEY);
    return stored !== null ? JSON.parse(stored) : true; // Default: enabled
}

// Check if review restriction display is enabled
function isReviewRestrictionDisplayEnabled() {
    const stored = localStorage.getItem('netflix_review_restriction_display');
    return stored !== null ? JSON.parse(stored) : true; // Default: enabled
}

// Toggle review restriction
function toggleReviewRestriction(enabled) {
    localStorage.setItem(REVIEW_RESTRICTION_KEY, JSON.stringify(enabled));
    console.log('Review restriction:', enabled ? 'Enabled' : 'Disabled');
}

// Load reviews from localStorage or Apps Script
async function loadReviews() {
    if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec') {
        const result = await callAppsScript('getReviews');
        if (result && result.success) {
            return result.reviews;
        }
    }
    
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (stored) {
        const parsed = JSON.parse(stored);
        // Filter out reviews older than 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return parsed.filter(r => new Date(r.date) > thirtyDaysAgo);
    }
    return [...defaultReviews];
}

// Save reviews to localStorage or Apps Script
async function saveReviews(reviews) {
    if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec') {
        // Apps Script handles individual operations
        return;
    }
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    // Dispatch event for cross-tab synchronization
    window.dispatchEvent(new Event('storage'));
}

// Add new review
async function addReview(name, text, rating) {
    const reviewData = {
        id: Date.now().toString(),
        userId: getUserId(),
        name: name,
        text: text,
        rating: parseInt(rating),
        type: 'ลูกค้าใหม่',
        date: new Date().toISOString()
    };
    
    if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec') {
        await callAppsScript('addReview', reviewData);
    } else {
        const reviews = await loadReviews();
        reviews.unshift(reviewData);
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    }
    
    renderReviews();
    updateAverageRating(await loadReviews());
    
    // Show success message
    alert('ขอบคุณสำหรับรีวิวครับ! รีวิวของคุณจะแสดงในหน้าเว็บแล้ว');
}

// Delete review by index
async function deleteReviewByIndex(index) {
    if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec') {
        await callAppsScript('deleteReview', { index: index });
    } else {
        const reviews = await loadReviews();
        reviews.splice(index, 1);
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    }
    
    renderReviews();
    updateAverageRating(await loadReviews());
}

// Clear all reviews
async function clearAllReviews() {
    if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'https://script.google.com/macros/s/AKfycbw-46BQ8Y2bB7_x9FClDzXKPUyNpP_s0gr_68V8rEghSDnlJjThpyBlggW0zaBupqBZ/exec') {
        await callAppsScript('clearReviews');
    } else {
        localStorage.removeItem(REVIEWS_STORAGE_KEY);
    }
    
    renderReviews();
    updateAverageRating([]);
}

// Render reviews with pagination
async function renderReviews() {
    const allReviews = await loadReviews();
    const reviewsGrid = document.querySelector('.reviews-grid');

    if (!reviewsGrid) return;

    if (allReviews.length === 0) {
        reviewsGrid.innerHTML = '<p style="text-align: center; color: #757575; grid-column: 1/-1;">ยังไม่มีรีวิว เป็นคนแรกเลย!</p>';
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const paginatedReviews = allReviews.slice(startIndex, endIndex);

    // Render reviews
    reviewsGrid.innerHTML = paginatedReviews.map(review => `
        <div class="review-card">
            <div class="review-rating">
                ${'<i class="fas fa-star"></i>'.repeat(review.rating)}${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
            </div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-author">
                <div class="review-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="review-info">
                    <h4>${review.name}</h4>
                    <span>${review.type}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add pagination controls
    if (totalPages > 1) {
        let paginationHTML = `
            <div class="review-pagination" style="grid-column: 1/-1; display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-top: 2rem; flex-wrap: wrap;">
                <button class="pagination-btn" onclick="changeReviewPage(1)" ${currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-angle-double-left"></i> แรก
                </button>
                <button class="pagination-btn" onclick="changeReviewPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i> ก่อนหน้า
                </button>
        `;
        
        // Show page numbers
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        // Adjust if we're near the edges
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 4);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - 4);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn" onclick="changeReviewPage(${i})" style="${i === currentPage ? 'background: #b20710;' : ''}">
                    ${i}
                </button>
            `;
        }
        
        paginationHTML += `
                <button class="pagination-btn" onclick="changeReviewPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                    ถัดไป <i class="fas fa-chevron-right"></i>
                </button>
                <button class="pagination-btn" onclick="changeReviewPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>
                    สุดท้าย <i class="fas fa-angle-double-right"></i>
                </button>
            </div>
        `;
        
        reviewsGrid.innerHTML += paginationHTML;
    }

    // Re-observe new review cards
    document.querySelectorAll('.review-card').forEach(card => {
        observer.observe(card);
    });

    // Update average rating in hero section
    updateAverageRating(allReviews);
}

// Change review page
function changeReviewPage(newPage) {
    currentPage = newPage;
    renderReviews();
    // Scroll to reviews section
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Calculate and update average rating
function updateAverageRating(reviews) {
    if (reviews.length === 0) return;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = (totalRating / reviews.length).toFixed(1);
    
    const ratingStat = document.querySelector('.stat-item:nth-child(2) .stat-number');
    if (ratingStat) {
        ratingStat.textContent = `${average}/5`;
    }
}

// Add new review
async function addReview(name, text, rating) {
    console.log('Adding review:', { name, text, rating });
    console.log('USE_APPS_SCRIPT:', USE_APPS_SCRIPT);
    console.log('APPS_SCRIPT_URL:', APPS_SCRIPT_URL);
    
    const userId = getUserId();
    console.log('User ID:', userId);
    
    const reviewData = {
        id: Date.now().toString(),
        userId: userId,
        name: name,
        text: text,
        rating: parseInt(rating),
        type: 'ลูกค้าใหม่',
        date: new Date().toISOString()
    };
    
    try {
        // ตรวจสอบว่าผู้ใช้มีรีวิวอยู่แล้วหรือไม่ (1 คน = 1 รีวิว)
        // เฉพาะเมื่อเปิดใช้งาน restriction และ display
        if (isReviewRestrictionEnabled() && isReviewRestrictionDisplayEnabled()) {
            const existingReviews = await loadReviews();
            const userAlreadyReviewed = existingReviews.some(r => r.userId === userId);
            
            if (userAlreadyReviewed) {
                console.warn('User already reviewed!');
                showNotification('คุณได้เขียนรีวิวไปแล้วครับ (1 คน เขียนได้แค่ 1 รีวิว)', 'warning');
                throw new Error('User already reviewed');
            }
        } else {
            console.log('Review restriction or display disabled - allowing multiple reviews');
        }
        
        // พยายามใช้ Apps Script ก่อน (ถ้าเปิดใช้งาน)
        let savedToAppsScript = false;
        if (USE_APPS_SCRIPT === true && APPS_SCRIPT_URL && APPS_SCRIPT_URL !== '') {
            try {
                console.log('Attempting to use Apps Script...');
                const result = await callAppsScript('addReview', reviewData);
                console.log('Apps Script result:', result);
                
                if (result && result.success) {
                    console.log('Saved to Apps Script successfully');
                    savedToAppsScript = true;
                } else {
                    console.warn('Apps Script returned error, falling back to localStorage');
                }
            } catch (appsError) {
                console.warn('Apps Script failed, falling back to localStorage:', appsError);
            }
        }
        
        // บันทึกลง localStorage เสมอ (เป็น fallback หรือเป็น primary)
        if (!savedToAppsScript) {
            console.log('Using localStorage');
            const reviews = await loadReviews();
            reviews.unshift(reviewData);
            localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
            console.log('Review saved to localStorage');
            console.log('Total reviews:', reviews.length);
        }
        
        await renderReviews();
        updateAverageRating(await loadReviews());
        console.log('Review added and rendered');
    } catch (error) {
        if (error.message === 'User already reviewed') {
            // ไม่ต้องแสดง notification ซ้ำ
            throw error;
        }
        console.error('Error in addReview:', error);
        showNotification('เกิดข้อผิดพลาดในการเพิ่มรีวิว: ' + error.message, 'error', 5000);
        throw error;
    }
    
    // Show success notification
    showNotification('ขอบคุณสำหรับรีวิวครับ! รีวิวของคุณจะแสดงในหน้าเว็บแล้ว', 'success');
}

// Review Modal Functions
function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle review form submission
async function handleReviewSubmit(e) {
    e.preventDefault();
    console.log('Review form submitted');

    const nameInput = document.getElementById('reviewName');
    const textInput = document.getElementById('reviewText');

    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    const rating = document.querySelector('input[name="rating"]:checked')?.value || '5';

    console.log('Review data:', { name, text, rating });

    if (!name || !text || !rating) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วนครับ', 'warning');
        return;
    }

    if (text.length < 5) {
        showNotification('รีวิวควรมีความยาวอย่างน้อย 5 ตัวอักษรครับ', 'warning');
        return;
    }

    try {
        await addReview(name, text, rating);
        console.log('Review added successfully');
    } catch (error) {
        if (error.message === 'User already reviewed') {
            // Notification already shown
            return;
        }
        console.error('Error adding review:', error);
        return;
    }
    
    closeReviewModal();

    // Reset form
    nameInput.value = '';
    textInput.value = '';
    document.querySelector('input[name="rating"][value="5"]').checked = true;

    // Scroll to reviews section
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Listen for storage changes (cross-tab sync)
window.addEventListener('storage', () => {
    renderReviews();
    updateTrustedCounterDisplay();
});

// Also update on beforeunload to ensure fresh data on return
window.addEventListener('focus', () => {
    renderReviews();
    updateTrustedCounterDisplay();
});

// ==========================================
// TRUSTED CUSTOMERS COUNTER - เพิ่มอัตโนมัติ
// ==========================================

const TRUSTED_STORAGE_KEY = 'netflixTrustedCount_shared';

function getTrustedCount() {
    const data = localStorage.getItem(TRUSTED_STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }
    return {
        count: 103,
        lastUpdate: new Date().toDateString()
    };
}

function updateTrustedCount() {
    const data = getTrustedCount();
    const today = new Date().toDateString();
    
    if (data.lastUpdate !== today) {
        const daysPassed = calculateDaysPassed(data.lastUpdate);
        const totalNewCustomers = getRandomCustomers() * daysPassed;
        data.count += totalNewCustomers;
        data.lastUpdate = today;
        localStorage.setItem(TRUSTED_STORAGE_KEY, JSON.stringify(data));
    }
    
    return data.count;
}

function calculateDaysPassed(lastDate) {
    const last = new Date(lastDate);
    const now = new Date();
    const diffTime = Math.abs(now - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
}

function getRandomCustomers() {
    return Math.floor(Math.random() * 46) + 5;
}

function updateTrustedCounterDisplay() {
    const trustedStat = document.querySelector('.stat-item:first-child .stat-number');
    if (!trustedStat) return;
    
    const count = updateTrustedCount();
    trustedStat.textContent = count.toLocaleString() + '+';
}

function animateTrustedCounter() {
    const trustedStat = document.querySelector('.stat-item:first-child .stat-number');
    if (!trustedStat) return;
    
    const targetCount = updateTrustedCount();
    animateCounter(trustedStat, targetCount);
}

// Initialize review system and trusted counter
async function initReviewSystem() {
    // Render packages from config
    renderPackages();

    // Render reviews
    await renderReviews();
    animateTrustedCounter();

    const addReviewBtn = document.querySelector('.add-review-btn');
    if (addReviewBtn) {
        addReviewBtn.addEventListener('click', openReviewModal);
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }

    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) {
        reviewModal.addEventListener('click', (e) => {
            if (e.target === reviewModal) {
                closeReviewModal();
            }
        });
    }

    // Update rating display after a short delay to ensure DOM is ready
    setTimeout(async () => {
        const reviews = await loadReviews();
        updateAverageRating(reviews);
    }, 100);

    // Listen for storage changes (cross-tab sync with admin panel)
    window.addEventListener('storage', async () => {
        await renderReviews();
        updateTrustedCounterDisplay();
    });

    // Periodically refresh reviews (every 30 seconds)
    setInterval(async () => {
        await renderReviews();
        updateTrustedCounterDisplay();
    }, 30000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    initReviewSystem();
});

// Debug: Check if packages render
console.log('📦 Packages Config:', packagesConfig.length, 'packages loaded');

// Console message for developers
console.log('%c🎬 NetflixRent - เว็บเช่าไอดี Netflix', 'color: #e50914; font-size: 20px; font-weight: bold;');
console.log('%cบริการคุณภาพ ราคาคุ้มค่า', 'color: #757575; font-size: 12px;');
console.log('%c💬 ระบบรีวิว: พร้อมใช้งาน', 'color: #06c755; font-size: 12px;');
