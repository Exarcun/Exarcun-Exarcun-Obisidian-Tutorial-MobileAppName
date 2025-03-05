import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurazione Firebase dal file JSON scaricato
const firebaseConfig = {
...
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Esporta i servizi che useremo
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;