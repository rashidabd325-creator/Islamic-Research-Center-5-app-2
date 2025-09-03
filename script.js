// ✅ Notification Permission
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('✅ Notification permission granted');
      } else {
        console.warn('❌ Notification permission denied');
      }
    });
  }
}

// ✅ Notification Trigger
function sendIslamicReminder(title, message) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: message,
      icon: 'assets/img/logo.png'
    });
  }
}

// ✅ Jummah Reminder Checker
function checkJummahReminder() {
  const today = new Date();
  const day = today.getDay(); // 5 = Friday
  const hour = today.getHours();

  if (day === 5 && hour === 10) {
    sendIslamicReminder('🕌 জুমার প্রস্তুতি', 'আজ জুমা! গোসল, সুগন্ধি, এবং সময়মতো নামাজের প্রস্তুতি নিন।');
  }
}

// ✅ Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('✅ Service Worker Registered'))
    .catch(err => console.error('❌ Service Worker Error:', err));
}

// ✅ Call Notification Functions
requestNotificationPermission();
checkJummahReminder();
// ✅ Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// ✅ Hijri Date Loader
function loadHijriDate() {
  const today = new Date();
  const hijri = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);
  document.getElementById('hijri-date').textContent = `আজকের হিজরি তারিখ: ${hijri}`;
}

// ✅ Islamic Calendar Integration
function loadIslamicCalendar() {
  const today = new Date();
  const hijriDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);

  const weekday = today.getDay(); // 5 = Friday
  const nextJummah = new Date(today);
  nextJummah.setDate(today.getDate() + ((5 - weekday + 7) % 7));
  const jummahDate = nextJummah.toLocaleDateString('bn-BD', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const calendarDiv = document.getElementById('islamic-calendar');
  if (calendarDiv) {
    calendarDiv.innerHTML = `
      <p>হিজরি মাস: ${hijriDate}</p>
      <p>আসন্ন জুমা: ${jummahDate}</p>
      <p>রোজা/ঈদ: <em>এই ফিচার শীঘ্রই আসছে ইনশাআল্লাহ</em></p>
    `;
  }
}

// ✅ Load Prayer Times
function loadPrayerTimes() {
  fetch('assets/data/prayer-times.json')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('prayer-times');
      const today = new Date().toLocaleDateString('bn-BD', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      data.times.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.date}</td>
          <td>${item.Fajr}</td>
          <td>${item.Dhuhr}</td>
          <td>${item.Asr}</td>
          <td>${item.Maghrib}</td>
          <td>${item.Isha}</td>
        `;
        if (item.date.includes(today)) {
          tr.style.background = '#f0f9ff';
          tr.style.fontWeight = 'bold';
        }
        tbody.appendChild(tr);
      });
    });
}

// ✅ Load Duas from JSON
function loadDuas() {
  fetch('assets/data/duas.json')
    .then(res => res.json())
    .then(duas => {
      const container = document.getElementById('dua-list');
      container.innerHTML = '';

      duas.forEach(dua => {
        const card = document.createElement('div');
        card.className = 'dua-card';
        card.innerHTML = `
          <h3>${dua.title}</h3>
          <p class="arabic" dir="rtl" lang="ar">${dua.arabic}</p>
          <p><strong>উচ্চারণ:</strong> ${dua.pronunciation}</p>
          <p><strong>অর্থ:</strong> ${dua.meaning}</p>
          <button class="play-audio" data-text="${dua.pronunciation}">🔊 শুনুন</button>
        `;
        container.appendChild(card);
      });
    });
}

// ✅ Dua Search Filter
function setupDuaSearch() {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const duaCards = document.querySelectorAll('.dua-card');
    duaCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
}

// ✅ Voice Support for Duas
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('play-audio')) {
    const text = e.target.getAttribute('data-text');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    speechSynthesis.speak(utterance);
  }
});

// ✅ Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// ✅ Initialize All
loadHijriDate();
loadIslamicCalendar();
loadPrayerTimes();
loadDuas();
setupDuaSearch();

