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
