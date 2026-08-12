// src/pages/AdminMenu.tsx
import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButton, IonIcon, IonText, IonCard, IonCardContent 
} from '@ionic/react';
import { settingsOutline, logOutOutline, footballOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const AdminMenu: React.FC = () => {
  const history = useHistory();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Panel de Control</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <IonIcon icon={settingsOutline} style={{ fontSize: '60px', color: '#428cff' }} />
          <IonText color="dark" style={{ display: 'block', fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>
            Bienvenido, Administrador
          </IonText>
        </div>

        <IonCard style={{ borderRadius: '15px', marginBottom: '20px' }}>
          <IonCardContent>
            <IonButton 
              expand="block" 
              size="large"
              onClick={() => history.push('/administrador/partidos')}
              style={{ '--border-radius': '10px' }}
            >
              <IonIcon slot="start" icon={footballOutline} />
              Administrar Partidos
            </IonButton>
            <IonText color="medium" style={{ fontSize: '12px', display: 'block', textAlign: 'center', marginTop: '10px' }}>
              Crea partidos, ingresa resultados y calcula los puntos del torneo.
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonButton 
          expand="block" 
          fill="clear" 
          color="danger" 
          onClick={cerrarSesion}
          style={{ marginTop: '20px' }}
        >
          <IonIcon slot="start" icon={logOutOutline} />
          Cerrar Sesión
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AdminMenu;