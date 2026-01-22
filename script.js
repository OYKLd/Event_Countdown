// Configuration par défaut de l'événement
let eventConfig = {
    title: "Nouvel An 2027",
    date: "2027-01-01T00:00:00", // Format: YYYY-MM-DDTHH:MM:SS
    location: "Abidjan",
    description: "Célébration du Nouvel An 2027"
};

// Fonction pour sauvegarder dans le localStorage
function saveEventToLocalStorage() {
    localStorage.setItem('eventConfig', JSON.stringify(eventConfig));
}

// Fonction pour charger depuis le localStorage
function loadEventFromLocalStorage() {
    const savedConfig = localStorage.getItem('eventConfig');
    if (savedConfig) {
        eventConfig = JSON.parse(savedConfig);
        updateEventDisplay();
    }
}

// Fonction pour mettre à jour l'affichage avec les nouvelles valeurs
function updateEventDisplay() {
    document.querySelector('.event-title').textContent = eventConfig.title;
    document.getElementById('event-location').textContent = eventConfig.location;
    document.getElementById('event-date').textContent = formatDate(eventConfig.date);
    if (eventConfig.description) {
        // Si vous avez un élément pour la description, mettez-le à jour ici
    }
}

// Formatage des nombres à deux chiffres
function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

// Mise à jour du compte à rebours
function updateCountdown() {
    try {
        const now = new Date().getTime();
        const eventDate = new Date(eventConfig.date).getTime();
        
        // Vérifier si la date de l'événement est valide
        if (isNaN(eventDate)) {
            console.error('Date d\'événement invalide');
            return;
        }
        
        const totalTime = eventDate - now;

        // Si l'événement est passé
        if (totalTime < 0) {
            document.querySelector('.countdown').innerHTML = '<div class="event-ended">L\'événement a commencé !</div>';
            document.getElementById('progress-bar').style.width = '100%';
            return;
        }

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

        // Calcul de la progression (sur une année complète)
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear(), 0, 1); // Début de l'année
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1); // Fin de l'année suivante
        
        const totalYearTime = endDate - startDate;
        const elapsedTime = now - startDate;
        const progress = (elapsedTime / totalYearTime) * 100;
        
        document.getElementById('progress-bar').style.width = `${Math.min(100, Math.max(0, progress))}%`;

        // Animation des blocs de temps
        const timeBlocks = document.querySelectorAll('.time-block');
        timeBlocks.forEach(block => {
            block.style.transform = 'translateY(0)';
            setTimeout(() => {
                block.style.transform = '';
            }, 10);
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du compte à rebours:', error);
    }
}

// Mise à jour de la date de l'événement formatée
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

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    // Charger les données sauvegardées
    loadEventFromLocalStorage();
    updateEventDisplay();
    
    // Mise à jour immédiate du compte à rebours
    updateCountdown();
    
    // Mise à jour toutes les secondes
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Nettoyage de l'intervalle si nécessaire
    window.addEventListener('beforeunload', () => {
        clearInterval(countdownInterval);
    });

    // Gestion du panneau d'édition
    const editToggle = document.getElementById('editToggle');
    const editPanel = document.querySelector('.edit-form');
    const eventTitleInput = document.getElementById('eventTitle');
    const eventDateInput = document.getElementById('eventDate');
    const eventLocationInput = document.getElementById('eventLocation');
    const eventDescriptionInput = document.getElementById('eventDescription');
    const saveButton = document.getElementById('saveEvent');
    const cancelButton = document.getElementById('cancelEdit');

    // Afficher/masquer le panneau d'édition
    if (editToggle && editPanel) {
        editToggle.addEventListener('click', () => {
            editPanel.classList.toggle('visible');
            fillForm();
        });
    }

    // Remplir le formulaire avec les valeurs actuelles
    function fillForm() {
        if (eventTitleInput && eventDateInput && eventLocationInput && eventDescriptionInput) {
            eventTitleInput.value = eventConfig.title;
            // Formater la date pour l'input datetime-local
            const date = new Date(eventConfig.date);
            const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
            eventDateInput.value = formattedDate;
            eventLocationInput.value = eventConfig.location;
            eventDescriptionInput.value = eventConfig.description || '';
        }
    }

    // Annuler les modifications
    if (cancelButton && editPanel) {
        cancelButton.addEventListener('click', () => {
            editPanel.classList.remove('visible');
        });
    }

    // Sauvegarder les modifications
    if (saveButton && editPanel) {
        saveButton.addEventListener('click', () => {
            eventConfig.title = eventTitleInput.value;
            eventConfig.date = eventDateInput.value;
            eventConfig.location = eventLocationInput.value;
            eventConfig.description = eventDescriptionInput.value;
            
            saveEventToLocalStorage();
            updateEventDisplay();
            editPanel.classList.remove('visible');
            
            // Redémarrer le compte à rebours
            updateCountdown();
        });
    }

    // Fermer le panneau si on clique en dehors
    document.addEventListener('click', (e) => {
        if (editPanel && !editPanel.contains(e.target) && e.target !== editToggle) {
            editPanel.classList.remove('visible');
        }
    });

    // Styles initiaux pour l'animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'all 0.5s ease-out';
    });

    // Animation au chargement de la page
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
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
});

// Effet de survol sur les blocs de temps
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.time-block').forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});