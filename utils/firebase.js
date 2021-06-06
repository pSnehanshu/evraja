import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp({
      apiKey: 'AIzaSyDB21TcQz_dYxZYhK0pR5soQ_PWvEPgE5g',
      authDomain: 'evraja-b075a.firebaseapp.com',
      projectId: 'evraja-b075a',
      storageBucket: 'evraja-b075a.appspot.com',
      messagingSenderId: '723949995801',
      appId: '1:723949995801:web:78e0705e66b7f74fa02788',
      measurementId: 'G-PWX9YPH7SQ',
    });

export default app;

const db = firebase.firestore();

export { db };
