// src/pages/AdminPartidos.tsx
import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
  IonBadge,
  IonIcon,
  IonInput
} from '@ionic/react';
import { calendarOutline, timeOutline, locationOutline, arrowBackOutline, lockClosedOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const AdminPartidos: React.FC = () => {
  const [fase, setFase] = useState<string>('grupos');
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Administrar partidos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        <IonText color="medium">Fase del torneo</IonText>
        <IonSelect 
          value={fase} 
          onIonChange={e => setFase(e.detail.value)}
          interface="action-sheet"
          style={{ background: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px', marginTop: '5px' }}
        >
          <IonSelectOption value="grupos">Fase de grupos</IonSelectOption>
          <IonSelectOption value="dieciseisavos">Dieciseisavos de final</IonSelectOption>
          <IonSelectOption value="octavos">Octavos de final</IonSelectOption>
          <IonSelectOption value="cuartos">Cuartos de final</IonSelectOption>
          <IonSelectOption value="semifinales">Semifinales</IonSelectOption>
          <IonSelectOption value="tercer">Partido por el tercer lugar</IonSelectOption>
          <IonSelectOption value="final">Final</IonSelectOption>
        </IonSelect>

        <IonText style={{ fontWeight: 'bold', fontSize: '16px', display: 'block', marginBottom: '15px' }}>
          Partidos de la fase seleccionada
        </IonText>

        {/* Ejemplo 1: Partido ABIERTO */}
        <IonCard style={{ margin: '0 0 20px 0', borderRadius: '15px' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <IonBadge color="success">ABIERTO</IonBadge>
              <IonText color="medium" style={{ fontSize: '12px' }}>Id: 101</IonText>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              <span><IonIcon icon={calendarOutline} /> 15 Jun 2026</span>
              <span><IonIcon icon={timeOutline} /> 16:00</span>
              <span><IonIcon icon={locationOutline} /> Estadio Azteca</span>
            </div>

            <IonGrid>
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="4">
                  <div style={{ fontSize: '30px' }}>🇪🇸</div>
                  <IonText style={{ fontWeight: 'bold' }}>España</IonText>
                </IonCol>
                <IonCol size="4">
                  <IonText style={{ fontSize: '18px', fontWeight: 'bold' }}>VS</IonText>
                </IonCol>
                <IonCol size="4">
                  <div style={{ fontSize: '30px' }}>🇦🇷</div>
                  <IonText style={{ fontWeight: 'bold' }}>Argentina</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Requerimiento: Botón para cambiar a CERRADO */}
            <IonButton expand="block" color="success" style={{ marginTop: '15px' }}>
              <IonIcon slot="start" icon={lockClosedOutline} />
              Cerrar pronósticos
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Ejemplo 2: Partido CERRADO */}
        <IonCard style={{ margin: '0 0 20px 0', borderRadius: '15px' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <IonBadge color="warning">CERRADO</IonBadge>
              <IonText color="medium" style={{ fontSize: '12px' }}>Id: 102</IonText>
            </div>

            <IonGrid>
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="4">
                  <div style={{ fontSize: '30px' }}>🇧🇷</div>
                  <IonText style={{ fontWeight: 'bold' }}>Brasil</IonText>
                </IonCol>
                <IonCol size="4">
                  <IonText style={{ fontSize: '18px', fontWeight: 'bold' }}>VS</IonText>
                </IonCol>
                <IonCol size="4">
                  <div style={{ fontSize: '30px' }}>🇫🇷</div>
                  <IonText style={{ fontWeight: 'bold' }}>Francia</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Requerimiento: Campos para registrar el resultado final */}
            <div style={{ background: '#f4f5f8', padding: '15px', borderRadius: '10px', marginTop: '15px' }}>
              <IonText color="medium" style={{ fontSize: '12px', textAlign: 'center', display: 'block', marginBottom: '10px' }}>
                Resultado oficial
              </IonText>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <IonInput type="number" placeholder="0" style={{ background: 'white', width: '50px', textAlign: 'center' }} />
                <IonText style={{ alignSelf: 'center' }}>-</IonText>
                <IonInput type="number" placeholder="0" style={{ background: 'white', width: '50px', textAlign: 'center' }} />
              </div>
              <IonButton expand="block" color="primary" style={{ marginTop: '15px' }}>
                Guardar resultado
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonButton 
          expand="block" 
          fill="outline" 
          color="dark" 
          onClick={() => history.push('/administrador')}
          style={{ marginTop: '20px', marginBottom: '30px' }}
        >
          <IonIcon slot="start" icon={arrowBackOutline} />
          Volver al menú principal
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AdminPartidos;