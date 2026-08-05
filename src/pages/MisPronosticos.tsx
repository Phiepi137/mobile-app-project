// src/pages/MisPronosticos.tsx
import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonBadge,
  IonButton,
  IonIcon
} from '@ionic/react';
import { calendarOutline, timeOutline, informationCircleOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const MisPronosticos: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Mis pronósticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      {/* ScrollView requerido para visualizar todos los registros */}
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', gap: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <IonIcon icon={informationCircleOutline} color="medium" style={{ fontSize: '20px' }} />
          <IonText color="medium" style={{ fontSize: '12px' }}>
            Esta pantalla muestra los pronósticos que has registrado.
          </IonText>
        </div>

        {/* Ejemplo 1: Partido FINALIZADO con puntos calculados */}
        <IonCard style={{ margin: '0 0 20px 0', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <IonText color="primary" style={{ fontWeight: 'bold', fontSize: '14px' }}>Fase de grupos</IonText>
              <IonBadge color="medium">FINALIZADO</IonBadge>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              <span><IonIcon icon={calendarOutline} /> 15 Jun 2026</span>
              <span><IonIcon icon={timeOutline} /> 16:00</span>
            </div>

            <IonGrid className="ion-no-padding">
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="3">
                  <div style={{ fontSize: '30px' }}>🇪🇸</div>
                  <IonText style={{ fontWeight: 'bold', fontSize: '12px' }}>España</IonText>
                </IonCol>
                
                <IonCol size="6">
                  <div style={{ background: '#f4f5f8', padding: '10px', borderRadius: '10px' }}>
                    <IonText color="medium" style={{ fontSize: '10px', display: 'block', marginBottom: '5px' }}>Tu pronóstico</IonText>
                    <IonText style={{ fontSize: '20px', fontWeight: 'bold' }}>2 - 1</IonText>
                  </div>
                </IonCol>

                <IonCol size="3">
                  <div style={{ fontSize: '30px' }}>🇦🇷</div>
                  <IonText style={{ fontWeight: 'bold', fontSize: '12px' }}>Argentina</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <IonText color="medium" style={{ fontSize: '12px', display: 'block' }}>Resultado oficial</IonText>
                <IonText style={{ fontWeight: 'bold', fontSize: '16px' }}>3 - 1</IonText>
              </div>
              <div style={{ textAlign: 'right' }}>
                <IonText color="medium" style={{ fontSize: '12px', display: 'block' }}>Puntos obtenidos</IonText>
                <IonText color="success" style={{ fontWeight: 'bold', fontSize: '18px' }}>1 pt</IonText>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Ejemplo 2: Partido PENDIENTE (Aún no finalizado) */}
        <IonCard style={{ margin: '0 0 20px 0', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <IonText color="primary" style={{ fontWeight: 'bold', fontSize: '14px' }}>Fase de grupos</IonText>
              <IonBadge color="success">ABIERTO</IonBadge>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              <span><IonIcon icon={calendarOutline} /> 16 Jun 2026</span>
              <span><IonIcon icon={timeOutline} /> 19:00</span>
            </div>

            <IonGrid className="ion-no-padding">
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="3">
                  <div style={{ fontSize: '30px' }}>🇧🇷</div>
                  <IonText style={{ fontWeight: 'bold', fontSize: '12px' }}>Brasil</IonText>
                </IonCol>
                
                <IonCol size="6">
                  <div style={{ background: '#f4f5f8', padding: '10px', borderRadius: '10px' }}>
                    <IonText color="medium" style={{ fontSize: '10px', display: 'block', marginBottom: '5px' }}>Tu pronóstico</IonText>
                    <IonText style={{ fontSize: '20px', fontWeight: 'bold' }}>1 - 2</IonText>
                  </div>
                </IonCol>

                <IonCol size="3">
                  <div style={{ fontSize: '30px' }}>🇫🇷</div>
                  <IonText style={{ fontWeight: 'bold', fontSize: '12px' }}>Francia</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Mensaje de resultado pendiente requerido */}
            <div style={{ marginTop: '15px', background: '#fff9c4', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
              <IonText style={{ fontSize: '12px', color: '#f57f17' }}>
                ⏳ Los resultados oficiales y puntajes se encuentran pendientes.
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Botón Volver solicitado en las instrucciones */}
        <IonButton 
          expand="block" 
          fill="outline" 
          color="dark" 
          style={{ marginTop: '20px', marginBottom: '30px', '--border-radius': '10px' }}
          onClick={() => history.push('/participante/posiciones')}
        >
          <IonIcon slot="start" icon={arrowBackOutline} />
          Volver
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default MisPronosticos;