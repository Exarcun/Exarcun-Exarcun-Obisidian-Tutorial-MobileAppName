import { 
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword,
     signOut, 
     updateProfile,
     onAuthStateChanged
   } from 'firebase/auth';
   import { auth } from '../config/firebase';
   
   // Registrazione nuovo utente
   export const registerUser = async (email, password, displayName) => {
     try {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       
       // Aggiunge il nome utente al profilo
       await updateProfile(userCredential.user, { displayName });
       
       return userCredential.user;
     } catch (error) {
       console.error('Errore durante la registrazione:', error);
       throw error;
     }
   };
   
   // Login utente
   export const loginUser = async (email, password) => {
     try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       return userCredential.user;
     } catch (error) {
       console.error('Errore durante il login:', error);
       throw error;
     }
   };
   
   // Logout utente
   export const logoutUser = async () => {
     try {
       await signOut(auth);
     } catch (error) {
       console.error('Errore durante il logout:', error);
       throw error;
     }
   };
   
   // Ottieni l'utente corrente (restituisce null se non loggato)
   export const getCurrentUser = () => {
     return auth.currentUser;
   };
   
   // Ascolta i cambiamenti dello stato dell'autenticazione
   export const onAuthStateChange = (callback) => {
     return onAuthStateChanged(auth, callback);
   };