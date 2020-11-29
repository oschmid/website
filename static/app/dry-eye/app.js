function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }
  return true;
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }

    // set the button to shown or hidden, depending on what the user answers
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
      alert('Notification permission is required');
    }
  }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission()
      .then((permission) => {
        handlePermission(permission);
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const NOTIFICATION_DURATION = 20 * 1000; // 20 seconds
const NOTIFICATION_GAP = 20 * 60 * 1000; // 20 minutes
var running = false;

async function toggleDryEyeTimer() {
  var count = 0;
  askNotificationPermission();
  
  running = !running;
  while (running) {
    await sleep(NOTIFICATION_GAP);
    if (!running) return count;
    
    var n = new Notification('Dry Eye', { body: 'Squeeze eyes shut for 20 seconds', icon: './eye-open.svg' });
    count++;
    await sleep(NOTIFICATION_DURATION);
    n.close();
  }
  return count;
}

window.addEventListener('load', () => {
  document.getElementById('enable').onclick = toggleDryEyeTimer;
});

/**
 * Service worker registration
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        /**
         * You can call register() every time a page loads without concern;
         * the browser will figure out if the service worker is already registered or not and handle it accordingly.
         */
        navigator.serviceWorker.register('dry-eye/serviceWorker.js', {scope : "dry-eye"} ).then(function(registration) {
            console.log('ServiceWorker registration succeeded, scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });

        // Global flag to detect standalone display mode
        window.IS_STANDALONE = window.matchMedia('(display-mode: standalone)').matches;
    });
}
