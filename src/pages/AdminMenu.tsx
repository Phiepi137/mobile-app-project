// src/pages/AdminMenu.tsx
import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText
} from '@ionic/react';
import { footballOutline, syncOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const AdminMenu: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Al salir, la aplicación debe regresar al login (o terminar, según el requerimiento)
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menú Administrador</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        
        {/* Encabezado con el nombre del administrador solicitado */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <IonIcon icon={personCircleOutline} style={{ fontSize: '80px', color: '#0b1c4a' }} />
          <IonText style={{ display: 'block', fontSize: '22px', fontWeight: 'bold' }}>
            Carlos Administrador
          </IonText>
          <IonText color="medium">Administrador General</IonText>
        </div>

        <IonList style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <IonItem button onClick={() => history.push('/administrador/partidos')} detail>
            <IonIcon slot="start" icon={footballOutline} color="primary" />
            <IonLabel>Administrar partidos</IonLabel>
          </IonItem>
          
          <IonItem button onClick={() => history.push('/administrador/puntajes')} detail>
            <IonIcon slot="start" icon={syncOutline} color="success" />
            <IonLabel>Actualizar puntajes</IonLabel>
          </IonItem>
          
          <IonItem button onClick={handleLogout} lines="none">
            <IonIcon slot="start" icon={logOutOutline} color="danger" />
            <IonLabel color="danger">Salir</IonLabel>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default AdminMenu;