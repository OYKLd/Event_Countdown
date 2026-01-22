// Configuration de l'événement
const eventConfig = {
    title: "Nouvel An 2025",
    date: "2025-01-01T00:00:00", // Format: YYYY-MM-DDTHH:MM:SS
    location: "Partout dans le monde"
};

// Mise à jour du titre et des détails de l'événement
document.querySelector('.event-title').textContent = eventConfig.title;
document.getElementById('event-location').textContent = eventConfig.location;

// Formatage des nombres à deux chiffres
function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

// Mise à jour du compte à rebours
function updateCountdown() {
    const now = new Date().getTime();
    const eventDate = new Date(eventConfig.date).getTime();
    const totalTime = eventDate - now;

    // Calcul des jours, heures, minutes et secondes
    const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

    // Mise à jour de l'interface
    document.getElementById('days').textContent = formatNumber(days);
    document.getElementById('hours').textContent = formatNumber(hours);
    document.getElementById('minutes').textContent = formatNumber(minutes);
    document.getElementById('seconds').textContent = formatNumber(seconds);

    // Mise à jour de la barre de progression
    const totalDays = Math.ceil((eventDate - new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24);
    const daysPassed = totalDays - days;
    const progress = ((totalDays - days) / totalDays) * 100;
    document.getElementById('progress-bar').style.width = `${Math.min(100, Math.max(0, progress))}%`;

    // Animation des blocs de temps
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.style.transform = 'translateY(0)';
        setTimeout(() => {
            block.style.transform = '';
        }, 10);
    });
}

// Formatage de la date en français
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Mise à jour de la date de l'événement formatée
document.getElementById('event-date').textContent = formatDate(eventConfig.date);

// Mise à jour immédiate du compte à rebours
updateCountdown();

// Mise à jour toutes les secondes
setInterval(updateCountdown, 1000);

// Effet de survol sur les blocs de temps
document.querySelectorAll('.time-block').forEach(block => {
    block.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    block.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animation au chargement de la page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach((block, index) => {
        setTimeout(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Gestion du redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Styles initiaux pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'all 0.5s ease-out';
    });
});