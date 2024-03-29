import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firestore';
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

/*db.settings({
  timestampsInSnapshots:true
});*/

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
export const getAllGames = ()=>{
  return db.collection('juegos');
}
export const userChanges = () =>{
  return auth;
}
export const postTorneo = (torneo)=>{
  return db.collection('torneos').add(torneo);
}

export const showTorneoImages =()=>{
  return db.collection('torneos');
}

export const torneos = (uid)=>{
  return db.collection('torneos').where("organizador", "==", uid);
}

export const delTorneos = (uid)=>{
  return db.collection('torneos').doc(uid).delete();
}

export const delEquipo = (uid) =>{
  return db.collection('Equipos').doc(uid).delete();
}

export const updateTorneo = (uid) =>{
  return db.collection('torneos').doc(uid);
}

export const matchUser = (correo) =>{
  return db.collection('usuarios').where("correo",">=",correo);
}

export const postEquipo = (equipo) =>{
  return db.collection('Equipos').add(equipo);
}

export const getEquipos = (uid) =>{
  return db.collection("Equipos").where("lider", "==", uid);
}


