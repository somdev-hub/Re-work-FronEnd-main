// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBpVHvK_p36oolMBKSunOJJc76s5_C-2Oc",
    authDomain: "rework-project-6fc16.firebaseapp.com",
    projectId: "rework-project-6fc16",
    storageBucket: "rework-project-6fc16.appspot.com",
    messagingSenderId: "473598047356",
    appId: "1:473598047356:web:ad0aea85655cf423cf45f9"
  };

firebase.initializeApp(firebaseConfig);


// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.backgroundNotification.body,
  };
 
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});




