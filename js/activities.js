document.addEventListener('DOMContentLoaded', function() {
    const donateBtn = document.getElementById('donateBtn');
    const thankMessage = document.getElementById('thankMessage');

    donateBtn.addEventListener('click', function() {
        const name = document.getElementById('donorName').value.trim();
        const email = document.getElementById('donorEmail').value.trim();
        const amount = document.getElementById('donationAmount').value.trim();

        if (!name || !email || !amount || amount <= 0) {
            alert("Please fill all fields correctly.");
            return;
        }

        // Clear fields
        document.getElementById('donorName').value = '';
        document.getElementById('donorEmail').value = '';
        document.getElementById('donationAmount').value = '';

        // Show thank you message
        thankMessage.style.display = 'block';
        thankMessage.scrollIntoView({ behavior: 'smooth' });
    });
});
