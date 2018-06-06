console.log('Service Worker Loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Received...');
  self.registration.showNotification(data.title, {
    body: 'Notified by Max',
    icon: 'https://www.designevo.com/res/templates/thumb_small/3d-green-letter-o.png'
  });
});
