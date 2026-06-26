function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll,.animate-from-bottom,.animate-from-top');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// UPDATED: Send form data to WhatsApp
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();

    const phone = "2347055022172"; // 07055022172 in international format

    const whatsappMessage = `Hello Nathan Graphics 👋%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Project Details:* ${message}`;

    const whatsappURL = `https://wa.me/${phone}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    this.reset();
});

function showInboxModal() {
    document.getElementById('inbox-modal').style.display = 'flex';
}

function showFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'flex';
}

function closeModals() {
    document.getElementById('inbox-modal').style.display = 'none';
    document.getElementById('feedback-modal').style.display = 'none';
}

function viewReplies() {
    const email = document.getElementById('inbox-email').value.trim();
    if (email) {
        const replies = JSON.parse(localStorage.getItem('userInboxes'))?.[email] || [];
        if (replies.length > 0) {
            let msg = "Your Replies:\n\n";
            replies.forEach(r => msg += `${r.time}: ${r.text}\n`);
            alert(msg);
        } else {
            alert(`✅ Checking replies for ${email}...\n\nNo new replies at the moment.`);
        }
    } else {
        alert("Please enter your email address.");
    }
}

function submitFeedback() {
    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const message = document.getElementById('feedback-message').value.trim();

    if (name && email && message) {
        let inquiries = JSON.parse(localStorage.getItem('allInquiries')) || [];
        inquiries.unshift({
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('allInquiries', JSON.stringify(inquiries));

        let inboxes = JSON.parse(localStorage.getItem('userInboxes')) || {};
        if (!inboxes[email]) inboxes[email] = [];
        inboxes[email].push({
            text: message,
            isAdmin: false,
            time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        });
        localStorage.setItem('userInboxes', JSON.stringify(inboxes));

        alert(`✅ Thank you, ${name}! Your feedback has been submitted.`);
        closeModals();

        document.getElementById('feedback-name').value = '';
        document.getElementById('feedback-email').value = '';
        document.getElementById('feedback-message').value = '';
    } else {
        alert("Please fill in all fields.");
    }
}

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModals();
});

window.addEventListener('load', initScrollAnimations);