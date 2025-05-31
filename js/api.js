import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, getIdToken } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_a9ukPY7JSuLC1aoRAiQZ2o69mm7Vf4o",
  authDomain: "mente-afiada-155.firebaseapp.com",
  projectId: "mente-afiada-155",
  storageBucket: "mente-afiada-155.firebasestorage.app",
  messagingSenderId: "648889120207",
  appId: "1:648889120207:web:217078a58e23a9b3610eba",
  measurementId: "G-DDXNNB2XWH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessageElement = document.getElementById('error-message');
  const googleLoginBtn = document.getElementById('google-login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userInfoDiv = document.getElementById('user-info');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        handleLoginSuccess(user);
      } catch (error) {
        console.error('Erro ao fazer login com e-mail/senha:', error);
        errorMessageElement.textContent = error.message || 'Erro ao tentar fazer login.';
      }
    });
  }

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
      try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const user = result.user;
        handleLoginSuccess(user);
      } catch (error) {
        console.error('Erro ao fazer login com Google:', error);
        errorMessageElement.textContent = error.message || 'Erro ao tentar fazer login com o Google.';
      }
    });
  }

  function handleLoginSuccess(user) {
    if (user) {
      getIdToken(user).then((token) => {
        localStorage.setItem('authToken', token);
        window.location.href = '/pagina-protegida';
        console.log('Login realizado com sucesso!', user);
      });
    } else {
      if (errorMessageElement) {
        errorMessageElement.textContent = 'Erro desconhecido no login.';
      }
    }
  }

  if (auth && onAuthStateChanged && userInfoDiv) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((token) => {
          localStorage.setItem('authToken', token);
          userInfoDiv.textContent = `Logado como: ${user.email || user.displayName}`;
          console.log('Usuário logado:', user);
        });
      } else {
        window.location.href = '/login.html';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await signOut(auth);
        localStorage.removeItem('authToken');
        window.location.href = '/login.html';
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    });
  }
});