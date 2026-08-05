// src/pages/Pronosticos.tsx
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
  IonInput,
  IonButton,
  IonText,
  IonBadge,
  IonIcon
} from '@ionic/react';
import { calendarOutline, timeOutline, locationOutline } from 'ionicons/icons';

const Pronosticos: React.FC = () => {
  // Estado inicial visual para el selector
  const [fase, setFase] = useState<string>('grupos');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Pronósticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      {/* ScrollView requerido por el documento */}
      <IonContent fullscreen className="ion-padding">
        
        {/* Spinner para seleccionar la fase */}
        <IonText color="medium">Fase del torneo</IonText>
        <IonSelect 
          value={fase} 
          placeholder="Seleccione la fase" 
          onIonChange={e => setFase(e.detail.value)}
          interface="action-sheet"
          style={{ background: '#f4f5f8', padding: '10px', borderRadius: '8px', marginBottom: '20px', marginTop: '5px' }}
        >
          <IonSelectOption value="grupos">Fase de grupos</IonSelectOption>
          <IonSelectOption value="dieciseisavos">Dieciseisavos</IonSelectOption>
          <IonSelectOption value="octavos">Octavos</IonSelectOption>
          <IonSelectOption value="cuartos">Cuartos de final</IonSelectOption>
          <IonSelectOption value="semifinales">Semifinales</IonSelectOption>
          <IonSelectOption value="tercer">Tercer lugar</IonSelectOption>
          <IonSelectOption value="final">Final</IonSelectOption>
        </IonSelect>

        <IonText color="medium" style={{ fontSize: '14px', display: 'block', marginBottom: '15px' }}>
          ⓘ Selecciona los marcadores de los partidos y guarda tu pronóstico
        </IonText>

        {/* Tarjeta de Partido (Estado: ABIERTO) */}
        <IonCard style={{ margin: '0 0 20px 0', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <IonCardContent>
            {/* Cabecera del partido */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              <span><IonIcon icon={calendarOutline} /> 15 Jun 2026</span>
              <span><IonIcon icon={timeOutline} /> 16:00</span>
              <span><IonIcon icon={locationOutline} /> Estadio Azteca</span>
              <IonBadge color="success">ABIERTO</IonBadge>
            </div>

            {/* Equipos y pronóstico */}
            <IonGrid>
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="4">
                  <div style={{ fontSize: '40px' }}>🇪🇸</div>
                  <IonText style={{ fontWeight: 'bold' }}>España</IonText>
                </IonCol>
                
                <IonCol size="4">
                  <IonText color="medium" style={{ fontSize: '12px' }}>Tu pronóstico</IonText>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
                    <IonInput 
                      type="number" 
                      min="0"
                      style={{ background: '#f4f5f8', borderRadius: '5px', textAlign: 'center', width: '40px', height: '40px' }}
                    />
                    <IonText>-</IonText>
                    <IonInput 
                      type="number" 
                      min="0"
                      style={{ background: '#f4f5f8', borderRadius: '5px', textAlign: 'center', width: '40px', height: '40px' }}
                    />
                  </div>
                </IonCol>

                <IonCol size="4">
                  <div style={{ fontSize: '40px' }}>🇦🇷</div>
                  <IonText style={{ fontWeight: 'bold' }}>Argentina</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Botón de Guardar */}
            <IonButton expand="block" color="success" style={{ marginTop: '15px', '--border-radius': '10px' }}>
              Guardar pronóstico
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Tarjeta de Partido (Estado: CERRADO/FINALIZADO) */}
        <IonCard style={{ margin: '0 0 20px 0', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', opacity: '0.8' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              <span><IonIcon icon={calendarOutline} /> 16 Jun 2026</span>
              <span><IonIcon icon={timeOutline} /> 19:00</span>
              <span><IonIcon icon={locationOutline} /> MetLife Stadium</span>
              <IonBadge color="warning">CERRADO</IonBadge>
            </div>

            <IonGrid>
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="4">
                  <div style={{ fontSize: '40px' }}>🇧🇷</div>
                  <IonText style={{ fontWeight: 'bold' }}>Brasil</IonText>
                </IonCol>
                
                <IonCol size="4">
                  <IonText color="medium" style={{ fontSize: '12px' }}>Tu pronóstico</IonText>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
                    <IonInput 
                      type="number" 
                      value="1"
                      readonly
                      style={{ background: '#e0e0e0', borderRadius: '5px', textAlign: 'center', width: '40px', height: '40px' }}
                    />
                    <IonText>-</IonText>
                    <IonInput 
                      type="number" 
                      value="2"
                      readonly
                      style={{ background: '#e0e0e0', borderRadius: '5px', textAlign: 'center', width: '40px', height: '40px' }}
                    />
                  </div>
                </IonCol>

                <IonCol size="4">
                  <div style={{ fontSize: '40px' }}>🇫🇷</div>
                  <IonText style={{ fontWeight: 'bold' }}>Francia</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            <div style={{ background: '#fff9c4', padding: '10px', borderRadius: '5px', textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#f57f17' }}>
              ⚠️ Los pronósticos están cerrados para este partido.
            </div>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Pronosticos;