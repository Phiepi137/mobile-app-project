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
import './Login.css';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [presentToast] = useIonToast();
  const history = useHistory();

  const handleLogin = async () => {
    // Validar que los campos no estén vacíos antes de leer el archivo
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
      // 1. Leer el archivo usuarios.txt desde la carpeta public
      const response = await fetch('/usuarios.txt');
      const text = await response.text();

      // 2. Parsear el archivo línea por línea
      const lineas = text.split('\n');
      let usuarioAutenticado = null;

      for (const linea of lineas) {
        // Ignorar líneas vacías
        if (!linea.trim()) continue;

        // Extraer los datos según la estructura definida
        const [id, username, password, nombreCompleto, tipo] = linea.split(',');

        // 3. Verificar si hay coincidencia
        if (username.trim() === usuario.trim() && password.trim() === contrasena.trim()) {
          usuarioAutenticado = {
            id: id.trim(),
            username: username.trim(),
            nombreCompleto: nombreCompleto.trim(),
            tipo: tipo.trim()
          };
          break; // Detener el bucle si encontramos al usuario
        }
      }

      // 4. Manejar el resultado de la autenticación
      if (usuarioAutenticado) {
        // Limpiar los campos por seguridad
        setUsuario('');
        setContrasena('');

        // Redirigir dependiendo del tipo de usuario
        if (usuarioAutenticado.tipo === 'Participante') {
          history.push('/participante');
        } else if (usuarioAutenticado.tipo === 'Administrador') {
          // Nota: Aún no creamos esta ruta en App.tsx, lo haremos pronto
          history.push('/administrador');
        }
      } else {
        // Requerimiento: Mensaje mediante Toast indicando error de credenciales
        presentToast({
          message: 'El usuario o la contraseña son incorrectos.',
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        });
      }
    } catch (error) {
      console.error('Error al leer el archivo de usuarios:', error);
      presentToast({
        message: 'Problemas técnicos. Estamos resolviendo.',
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