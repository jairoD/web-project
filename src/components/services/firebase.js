import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore'
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
});
const auth = firebase.auth();
const db = firebase.firestore();



export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}
export const sigin = (email, password) => {
  return auth.createUserWithEmailAndPassword(email,password);
}
export const signout = () => {
  return auth.signOut();
}
export const passwordRecovery = (email) => {
  return auth.sendPasswordResetEmail(email);
}

export const addUser = (email, name, uid)=>{
  return db.collection('usuarios').doc(uid).set({
    correo: email,
    nombre: name
  });
}
export const addUser2 = ()=>{
  return db.collection('usuarios').add({
    correo: 'example@example.com',
    nombre: 'ejemplo'
  });
}
export const getUser = (uid) =>{
  return db.collection('usuarios').doc(uid);
}

export const updateUser = (uid) => {
  return db.collection('usuarios').doc(uid);
}
export const allUser = () =>{
  return db.collection('usuarios');
}
