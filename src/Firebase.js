// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAnHvdwA9857ZW3kFGIbAcb-6C86kp3GzQ",
//   authDomain: "rework-ae412.firebaseapp.com",
//   databaseURL: "https://rework-873d1-default-rtdb.firebaseio.com",
//   projectId: "rework-ae412",
//   storageBucket: "rework-ae412.appspot.com",
//   messagingSenderId: "736073859566",
//   appId: "1:736073859566:web:c0b93c35a254f3840b0eff",
//   measurementId: "G-H5PW0CL7ZS"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAHNflzjEOLvSx-TvDIwodT6OMTRyUIyvU",
  authDomain: "rework-873d1.firebaseapp.com",
  databaseURL: "https://rework-873d1-default-rtdb.firebaseio.com",
  projectId: "rework-873d1",
  storageBucket: "rework-873d1.appspot.com",
  messagingSenderId: "561939544943",
  appId: "1:561939544943:web:d7f3fa07d709024e23469a",
  measurementId: "G-C8LTNQ1P4S"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
const messaging = getMessaging(firebaseApp);



// const storeToken = async (token) => {
//   try {
//     const result = await fetch(`${baseUrl}/users/storeClientNotificationReg_Id/${localStorage.getItem('userId')}`, {
//       method: 'put',
//       body: JSON.stringify({ clientNotificationReg_Id: token }),
//       headers: {
//         'Content-Type': "application/json"
//       }
//     });

//     const jsonData = await result.json();
//     if (! result.ok) {
//       throw new Error(jsonData.message);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getTokenData = (setTokenFound) => {
//   return getToken(messaging, {
//     vapidKey:
//       "BBwBirMwInMo_iRKaBoO76rUlebB6OCaUhpjfNZGvb0HcDRERtLzqwW4cUjdqobcnTiv9G_Unp1ptf3YavZfpUk",
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log("current token for client: ", currentToken);
//         localStorage.setItem("notificationRegisterationId", currentToken);
//         storeToken(currentToken);
//         setTokenFound(true);
//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//       } else {
//           console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         setTokenFound(false);
//         // shows on the UI that permission is required
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//       // catch error while creating client token
//     });
// };
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
