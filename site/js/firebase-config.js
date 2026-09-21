/**
 * FIREBASE CONFIGURATION & SERVICE MODULE
 * Projeto: victor-financeiro
 * Serviços: Firebase Authentication (Google OAuth) + Cloud Firestore
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBBpr97VupueQP3LiF842upWdfZ-An4qfY",
  authDomain: "victor-financeiro.firebaseapp.com",
  projectId: "victor-financeiro",
  storageBucket: "victor-financeiro.firebasestorage.app",
  messagingSenderId: "324594879679",
  appId: "1:324594879679:web:75b3429e1f409f62a18a0a"
};

// Inicialização Firebase
let firebaseApp = null;
let authInstance = null;
let firestoreDb = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      firebaseApp = firebase.app();
    }
    authInstance = firebase.auth();
    firestoreDb = firebase.firestore();

    // Habilitar persistência offline no Firestore (IndexedDB)
    firestoreDb.enablePersistence({ synchronizeTabs: true }).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Persistência Firestore: Múltiplas abas abertas simultaneamente.');
      } else if (err.code === 'unimplemented') {
        console.warn('Persistência Firestore não suportada pelo navegador.');
      }
    });
  }
} catch (e) {
  console.warn('Firebase init warning:', e);
}

const AuthService = {
  // Provedor Google
  async loginWithGoogle() {
    if (!authInstance) throw new Error('Firebase Auth não carregado');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });
    return authInstance.signInWithPopup(provider);
  },

  async logout() {
    if (!authInstance) return;
    await authInstance.signOut();
    window.location.href = 'login.html';
  },

  onAuthStateChanged(callback) {
    if (!authInstance) {
      callback(null);
      return () => {};
    }
    return authInstance.onAuthStateChanged(callback);
  },

  getCurrentUser() {
    return authInstance ? authInstance.currentUser : null;
  }
};

const CloudStorage = {
  // Obter documento do usuário no Firestore
  async loadUserData(userId) {
    if (!firestoreDb || !userId) return null;
    try {
      const docRef = firestoreDb.collection('users').doc(userId);
      const snap = await docRef.get();
      if (snap.exists) {
        return snap.data();
      }
      return null;
    } catch (err) {
      console.warn('Erro ao carregar dados do Firestore:', err);
      return null;
    }
  },

  lastError: null,

  // Salvar dados do usuário no Firestore (com higienização para evitar erros com undefined)
  async saveUserData(userId, data) {
    if (!firestoreDb || !userId) {
      this.lastError = new Error('Firestore ou Usuário não autenticado');
      return false;
    }
    try {
      // Remove qualquer campo undefined (Firestore rejeita e cancela se houver undefined)
      const cleanData = JSON.parse(JSON.stringify(data));
      const docRef = firestoreDb.collection('users').doc(userId);
      await docRef.set({
        ...cleanData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      this.lastError = null;
      return true;
    } catch (err) {
      this.lastError = err;
      console.error('Erro detalhado ao salvar no Firestore:', err);
      return false;
    }
  }
};
