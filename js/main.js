// Khởi tạo AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease',
    delay: 100
});

// Xử lý thanh điều hướng
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Xử lý smooth scroll cho liên kết
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Thiết lập animation cho progress bar
const skillSection = document.getElementById('skills');

const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = width;
        }, 100);
    });
};

// Xử lý form liên hệ
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Đây là nơi bạn sẽ thêm code để xử lý form (gửi email hoặc lưu vào DB)
        alert('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.');
        contactForm.reset();
    });
}

// Intersections Observer để kiểm tra khi nào phần kỹ năng hiển thị trong viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    observer.observe(skillSection);
}

// Typing effect cho hero section
const typingElement = document.querySelector('.hero-section h1');
if (typingElement) {
    // Lưu lại phần span để sử dụng lại sau
    const spanElement = typingElement.querySelector('span');
    const spanClass = spanElement.className;
    const spanText = spanElement.textContent;
    
    // Lấy text phần đầu (trước span)
    const firstPart = typingElement.childNodes[0].textContent;
    
    typingElement.innerHTML = '';
    
    let i = 0;
    const fullText = firstPart;
    
    function typeWriter() {
        if (i < fullText.length) {
            typingElement.innerHTML += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Sau khi gõ xong phần đầu, thêm span vào
            const span = document.createElement('span');
            span.className = spanClass;
            span.textContent = spanText;
            typingElement.appendChild(span);
        }
    }
    
    // Bắt đầu hiệu ứng typing sau khi trang đã tải
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}