const publicVapidKey = 'BGPsTclBFb8PNIGbcJHGCzTg8WBlKM_9ZbsEmGdPAnzDZ8h-8lRleO9svq3n7jZr7PacqG-Ws3OFnkcXtyNlhaM';

// Check for service worker
if('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

// Register Service Workers, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log('Registering Service Worker');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service Worker Registered...');

  // Register Push
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push Registered...');

  // Send Push Notification
  console.log('Sending Push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push Sent...');
}

// convert the URL safe base64 string to a Uint8Array
// This code is copied from the web-push documentation
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
