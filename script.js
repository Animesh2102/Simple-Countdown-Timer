document.addEventListener('DOMContentLoaded', function () {
    const startTimerButton = document.getElementById('start-timer');
    const countdownDateInput = document.getElementById('countdown-date');
    const countdownList = document.getElementById('countdown-list');
  
    // Load saved countdowns from localStorage
    let savedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
  
    // Render saved countdowns
    savedCountdowns.forEach(countdown => {
      createCountdownElement(countdown);
    });
  
    // Event listener for creating a new countdown
    startTimerButton.addEventListener('click', function () {
      const countdownDate = countdownDateInput.value;
      if (!countdownDate) return;
  
      const newCountdown = {
        id: Date.now(),
        date: countdownDate
      };
  
      savedCountdowns.push(newCountdown);
      localStorage.setItem('countdowns', JSON.stringify(savedCountdowns));
  
      createCountdownElement(newCountdown);
      countdownDateInput.value = ''; // Clear input after creating a new countdown
    });
  
    // Function to create and render a countdown element
    function createCountdownElement(countdown) {
      const countdownItem = document.createElement('div');
      countdownItem.classList.add('countdown-item');
  
      const label = document.createElement('label');
      label.textContent = `Countdown ${savedCountdowns.indexOf(countdown) + 1}:`;
  
      const timerDisplay = document.createElement('div');
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function () {
        savedCountdowns = savedCountdowns.filter(item => item.id !== countdown.id);
        localStorage.setItem('countdowns', JSON.stringify(savedCountdowns));
        countdownList.removeChild(countdownItem);
      });
  
      countdownItem.appendChild(label);
      countdownItem.appendChild(timerDisplay);
      countdownItem.appendChild(removeButton);
      countdownList.appendChild(countdownItem);
  
      // Start countdown for this element
      startCountdown(timerDisplay, countdown);
    }
  
    // Function to start countdown for a countdown element
    function startCountdown(display, countdown) {
      const targetDate = new Date(countdown.date).getTime();
  
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
  
        if (distance < 0) {
          clearInterval(interval);
          display.textContent = 'EXPIRED';
          return;
        }
  
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        display.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }, 1000);
    }
  });
  