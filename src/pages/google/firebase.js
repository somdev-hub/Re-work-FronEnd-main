import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHNflzjEOLvSx-TvDIwodT6OMTRyUIyvU",
  authDomain: "rework-873d1.firebaseapp.com",
  projectId: "rework-873d1",
  storageBucket: "rework-873d1.appspot.com",
  messagingSenderId: "561939544943",
  appId: "1:561939544943:web:d7f3fa07d709024e23469a",
  measurementId: "G-C8LTNQ1P4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "rework");
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {

//   signInWithPopup(auth, provider).then((result) => {
//     const firstName = result.user.displayName;
//     const email = result.user.email;
//     // const profilePic = result.user.photoURL;
//     console.log(result);
//     localStorage.setItem("userID", result.user.uid);
//     localStorage.setItem("userId", result.user.uid);
//     localStorage.setItem("role", "recruiter");
//     localStorage.setItem("Token", result.user.accessToken);
//     localStorage.setItem("userName", firstName);
//     localStorage.setItem("userEmailId", email);
//     localStorage.setItem("isLoggedIn", true);
//     localStorage.setItem("expirationTime", result.user.stsTokenManager.expirationTime);

//     // fetch(googleSignUp, {
//     //   method: "PUT",
//     //   headers: { "content-type": "application/json" },
//     //   body: JSON.stringify({ firstName, email }),
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => {
//     // localStorage.setItem("userID", data[0]._id);
//     // localStorage.setItem("userId", data[0]._id);
//     // localStorage.setItem("Token", data[1]);
//     // localStorage.setItem("Name", firstName);
//     // localStorage.setItem("Email", email);
//     // localStorage.setItem("IsLoggedIn", true);
//     // console.log(data);
//     //   });

//     // window.location.reload();

//     // localStorage.setItem("token", "gjghjjkghkj5645yb6y6y565u647u67u567iu7u57758678ikmuti8mhjjhjjh")
//     // localStorage.setItem("profilePic", profilePic)
//   });
//   //     .catch((error) => console.log(error.message));
// };

// logout
// export const logoutGoogle = () => {
//   signOut(auth)
//     .then(() => {
//       localStorage.setItem("IsLoggedIn", false);
//       localStorage.removeItem("Name");
//       localStorage.removeItem("Email");
//       localStorage.removeItem("Token");
//       localStorage.removeItem("userID");
//       // console.log("logout");
//       window.location.reload();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
