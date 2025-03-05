import { 
     collection, 
     addDoc, 
     getDocs, 
     getDoc, 
     doc, 
     query, 
     where, 
     orderBy,
     serverTimestamp,
     updateDoc,
     deleteDoc
   } from 'firebase/firestore';
   import { db } from '../config/firebase';
   
   // Funzione per ottenere tutte le news
   export const getNews = async () => {
     try {
       const newsRef = collection(db, 'news');
       const q = query(newsRef, orderBy('createdAt', 'desc'));
       const querySnapshot = await getDocs(q);
       
       const news = [];
       querySnapshot.forEach((doc) => {
         news.push({
           id: doc.id,
           ...doc.data()
         });
       });
       
       return news;
     } catch (error) {
       console.error('Errore durante il recupero delle news:', error);
       throw error;
     }
   };
   
   // Funzione per ottenere una singola news
   export const getNewsById = async (newsId) => {
     try {
       const newsRef = doc(db, 'news', newsId);
       const newsDoc = await getDoc(newsRef);
       
       if (newsDoc.exists()) {
         return {
           id: newsDoc.id,
           ...newsDoc.data()
         };
       } else {
         throw new Error('News non trovata');
       }
     } catch (error) {
       console.error('Errore durante il recupero della news:', error);
       throw error;
     }
   };
   
   // Funzione per creare una nuova news (per amministratori)
   export const createNews = async (newsData) => {
     try {
       const newsRef = collection(db, 'news');
       const newNewsDoc = await addDoc(newsRef, {
         ...newsData,
         createdAt: serverTimestamp()
       });
       
       return newNewsDoc.id;
     } catch (error) {
       console.error('Errore durante la creazione della news:', error);
       throw error;
     }
   };
   
   // Funzione per salvare le preferenze utente
   export const saveUserPreferences = async (userId, preferences) => {
     try {
       const userPrefsRef = collection(db, 'userPreferences');
       const q = query(userPrefsRef, where('userId', '==', userId));
       const querySnapshot = await getDocs(q);
       
       if (querySnapshot.empty) {
         // Crea nuove preferenze se non esistono
         await addDoc(userPrefsRef, {
           userId,
           ...preferences,
           updatedAt: serverTimestamp()
         });
       } else {
         // Aggiorna le preferenze esistenti
         const docRef = doc(db, 'userPreferences', querySnapshot.docs[0].id);
         await updateDoc(docRef, {
           ...preferences,
           updatedAt: serverTimestamp()
         });
       }
       
       return true;
     } catch (error) {
       console.error('Errore durante il salvataggio delle preferenze:', error);
       throw error;
     }
   };
   
   // Funzione per ottenere le preferenze utente
   export const getUserPreferences = async (userId) => {
     try {
       const userPrefsRef = collection(db, 'userPreferences');
       const q = query(userPrefsRef, where('userId', '==', userId));
       const querySnapshot = await getDocs(q);
       
       if (querySnapshot.empty) {
         // Restituisci preferenze predefinite se non esistono
         return {
           darkMode: false,
           notifications: true,
           dataUsage: false
         };
       } else {
         const userData = querySnapshot.docs[0].data();
         return {
           id: querySnapshot.docs[0].id,
           ...userData
         };
       }
     } catch (error) {
       console.error('Errore durante il recupero delle preferenze:', error);
       throw error;
     }
   };