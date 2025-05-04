/********************************************************
 * Switch 2 Countdown — main logic
 ********************************************************/

// Start the countdown using the date from the HTML data attribute
CountDownToMario('06/05/2025 12:01 AM', 'countdown');

/**
 *  Builds a self-updating countdown.
 *  @param {string|Date} endTime – Launch deadline.
 *  @param {string}       divId  – id of the DOM node for text.
 */
function CountDownToMario(endTime, divId) {
  // Get the countdown div and read the release date from data-release
  const div = document.getElementById(divId);
  const end = new Date(div.dataset.release || endTime);

  // Time constants
  const _second = 1000;
  const _minute = _second * 60;
  const _hour   = _minute * 60;
  const _day    = _hour * 24;

  // Helper for two-digit padding
  const pad = n => String(n).padStart(2, '0');

  let timer;

  function showRemaining() {
    const now = new Date();
    const distance = end - now;

    if (distance <= 0) {
      clearInterval(timer);
      div.textContent = "Switch 2 is out! 🎉";
      document.body.classList.add('launched');
      // Optional: Play sound if you add <audio id="coinSound" src="assets/coin.wav"></audio> to your HTML
      const coin = document.getElementById('coinSound');
      if (coin) coin.play();
      return;
    }

    const days = pad(Math.floor(distance / _day));
    const hours = pad(Math.floor((distance % _day) / _hour));
    const minutes = pad(Math.floor((distance % _hour) / _minute));
    const seconds = pad(Math.floor((distance % _minute) / _second));

    div.textContent = `${days} days ${hours} hrs ${minutes} mins ${seconds} secs`;
  }

  showRemaining(); // Show immediately
  timer = setInterval(showRemaining, 1000); // Update every second
}