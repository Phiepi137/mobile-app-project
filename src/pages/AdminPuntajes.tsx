// src/pages/AdminPuntajes.tsx
import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  useIonToast
} from '@ionic/react';
import { arrowBackOutline, syncOutline, informationCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const AdminPuntajes: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();

  const handleActualizar = () => {
    // TODO: Implementar la lectura de pronósticos y actualización de participantes.txt
    presentToast({
      message: 'Los puntajes fueron actualizados correctamente.',
      duration: 3000,
      color: 'success',
      position: 'bottom'
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Actualizar puntajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '10px', display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <IonIcon icon={informationCircleOutline} color="primary" style={{ fontSize: '24px' }} />
          <IonText color="primary" style={{ fontSize: '14px' }}>
            Este proceso calcula los puntos de todos los participantes teniendo en cuenta los resultados oficiales de los partidos finalizados.
          </IonText>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          
          <IonText style={{ fontSize: '20px', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
            Reglas de puntuación por partido
          </IonText>
          
          <IonGrid style={{ textAlign: 'left', marginTop: '20px' }}>
            <IonRow style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
              <IonCol size="3"><IonText color="success" style={{ fontWeight: 'bold' }}>3 puntos</IonText></IonCol>
              <IonCol size="9"><IonText color="medium" style={{ fontSize: '14px' }}>Acierta el marcador exacto.</IonText></IonCol>
            </IonRow>
            <IonRow style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
              <IonCol size="3"><IonText color="success" style={{ fontWeight: 'bold' }}>2 puntos</IonText></IonCol>
              <IonCol size="9"><IonText color="medium" style={{ fontSize: '14px' }}>Acierta el ganador y la diferencia de goles.</IonText></IonCol>
            </IonRow>
            <IonRow style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
              <IonCol size="3"><IonText color="success" style={{ fontWeight: 'bold' }}>2 puntos</IonText></IonCol>
              <IonCol size="9"><IonText color="medium" style={{ fontSize: '14px' }}>Acierta un empate (sin importar el marcador exacto).</IonText></IonCol>
            </IonRow>
            <IonRow style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
              <IonCol size="3"><IonText color="success" style={{ fontWeight: 'bold' }}>1 punto</IonText></IonCol>
              <IonCol size="9"><IonText color="medium" style={{ fontSize: '14px' }}>Acierta únicamente el ganador del partido.</IonText></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="3"><IonText color="medium" style={{ fontWeight: 'bold' }}>0 puntos</IonText></IonCol>
              <IonCol size="9"><IonText color="medium" style={{ fontSize: '14px' }}>Cualquier otro caso.</IonText></IonCol>
            </IonRow>
          </IonGrid>

          <IonButton 
            expand="block" 
            color="success" 
            onClick={handleActualizar}
            style={{ marginTop: '30px' }}
          >
            <IonIcon slot="start" icon={syncOutline} />
            Actualizar puntajes
          </IonButton>

        </div>

        <IonButton 
          expand="block" 
          fill="clear" 
          color="dark" 
          onClick={() => history.push('/administrador')}
          style={{ marginTop: '20px' }}
        >
          <IonIcon slot="start" icon={arrowBackOutline} />
          Volver al menú principal
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AdminPuntajes;