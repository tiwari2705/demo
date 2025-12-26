// 1. Close mobile menu automatically after clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true
            });
            bsCollapse.hide();
        }
    });
});

// 2. Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

// 3. Handle Booking Form Submission -> Send to WhatsApp
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload
    
    // A. Get values from the HTML form
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const date = document.getElementById('guestDate').value;
    const guests = document.getElementById('guestCount').value;
    const type = document.getElementById('eventType').value;
    
    // B. Create the WhatsApp Message
    // \n creates a new line in the text variable
    let message = `*Hello! I want to book a table.* \n\n` +
                  `👤 *Name:* ${name}\n` +
                  `📞 *Phone:* ${phone}\n` +
                  `📅 *Date:* ${date}\n` +
                  `👥 *Guests:* ${guests}\n` +
                  `🎉 *Event Type:* ${type}`;

    // C. Encode the text so it works in a URL
    let encodedMessage = encodeURIComponent(message);

    // D. Restaurant Owner's Phone Number (Enter your number here with Country Code)
    // Example: 919876543210 (91 is India code)
    const ownerPhone = "919000000000"; 

    // E. Open WhatsApp
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // F. Close the Modal cleanly
    const modalElement = document.getElementById('bookingModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // G. Clear the form
    this.reset();
});