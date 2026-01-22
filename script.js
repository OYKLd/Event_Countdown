let targetDate = new Date('2027-01-01T00:00:00').getTime();
        let eventName = 'Nouvel An 2027';
        let timerInterval;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                document.getElementById('countdownDisplay').style.display = 'none';
                document.getElementById('expiredMessage').style.display = 'block';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }

        function updateEvent() {
            const nameInput = document.getElementById('nameInput');
            const dateInput = document.getElementById('dateInput');

            if (nameInput.value.trim()) {
                eventName = nameInput.value.trim();
                document.getElementById('eventName').textContent = eventName;
            }

            if (dateInput.value) {
                targetDate = new Date(dateInput.value).getTime();
                const dateObj = new Date(dateInput.value);
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                document.getElementById('eventDate').textContent = dateObj.toLocaleDateString('fr-FR', options);
                
                document.getElementById('countdownDisplay').style.display = 'grid';
                document.getElementById('expiredMessage').style.display = 'none';
                
                clearInterval(timerInterval);
                updateCountdown();
                timerInterval = setInterval(updateCountdown, 1000);
            }

            nameInput.value = '';
            dateInput.value = '';
        }

        timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown();