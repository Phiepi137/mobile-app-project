// src/pages/Login.tsx
import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonText,
  useIonToast,
  IonInputPasswordToggle
} from '@ionic/react';
import { personOutline, lockClosedOutline, trophyOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './Login.css';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [presentToast] = useIonToast();
  const history = useHistory();

  const handleLogin = async () => {
    if (!usuario.trim() || !contrasena.trim()) {
      presentToast({
        message: 'Por favor, ingresa usuario y contraseña.',
        duration: 3000,
        color: 'warning',
        position: 'bottom'
      });
      return;
    }

    try {
      // 1. Apuntamos a la colección "usuarios" en Firestore
      const usuariosRef = collection(db, 'usuarios');
      
      // 2. Creamos una consulta (query) buscando coincidencia de credenciales
      const q = query(
        usuariosRef, 
        where('username', '==', usuario.trim()),
        where('password', '==', contrasena.trim())
      );

      // 3. Ejecutamos la consulta
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si hay resultados, obtenemos el primer documento (usuario)
        const userDoc = querySnapshot.docs[0];
        const usuarioAutenticado = userDoc.data();

        setUsuario('');
        setContrasena('');

        if (usuarioAutenticado.tipo === 'Participante') {
          localStorage.setItem('usuarioLogueado', usuarioAutenticado.username);
          history.push('/participante');
        } else if (usuarioAutenticado.tipo === 'Administrador') {
          history.push('/administrador');
        }
      } else {
        presentToast({
          message: 'El usuario o la contraseña son incorrectos.',
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        });
      }
    } catch (error) {
      console.error('Error al consultar Firestore:', error);
      presentToast({
        message: 'Problemas de conexión con la base de datos.',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
    }
  };

  return (
    <IonPage className="login-page">
      <IonContent className="login-content" scrollY={false}>
        <div className="login-container">
          
          <div className="logo-container">
            <IonIcon icon={trophyOutline} className="logo-icon" />
            <IonText className="logo-title">
              PRONÓSTICOS<br />MUNDIAL 2026
            </IonText>
          </div>

          <div className="form-container">
            <IonText className="input-label">Usuario</IonText>
            <IonInput 
              className="custom-input"
              type="text" 
              placeholder="Ingresa tu usuario"
              value={usuario}
              onIonInput={(e) => setUsuario(e.detail.value!)}
            >
              <IonIcon slot="start" icon={personOutline} aria-hidden="true" />
            </IonInput>

            <IonText className="input-label">Contraseña</IonText>
            <IonInput 
              className="custom-input"
              type="password" 
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onIonInput={(e) => setContrasena(e.detail.value!)}
            >
              <IonIcon slot="start" icon={lockClosedOutline} aria-hidden="true" />
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton 
              className="login-button" 
              expand="block" 
              onClick={handleLogin}
            >
              INICIAR SESIÓN
            </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;