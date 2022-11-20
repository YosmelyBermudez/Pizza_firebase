import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCdf_7-io7SqZt2utRmE4WAMznXjSiIMmw",
    authDomain: "artesanosproject-1caa9.firebaseapp.com",
    projectId: "artesanosproject-1caa9",
    storageBucket: "artesanosproject-1caa9.appspot.com",
    messagingSenderId: "706285869323",
    appId: "1:706285869323:web:268663579077827c392a0e"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.auth = firebase.auth()
  export default firebase