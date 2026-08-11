// src/pages/MisPronosticos.tsx
import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent,
  IonGrid, IonRow, IonCol, IonText, IonBadge, IonButton, IonIcon, useIonToast
} from '@ionic/react';
import { calendarOutline, timeOutline, informationCircleOutline, arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const MisPronosticos: React.FC = () => {
  const history = useHistory();
  const [misPronosticos, setMisPronosticos] = useState<any[]>([]);
  const [presentToast] = useIonToast();

  const cargarMisPronosticos = async () => {
    const usuario = localStorage.getItem('usuarioLogueado');
    if (!usuario) {
      presentToast({ message: 'No hay sesión activa.', duration: 3000, color: 'danger' });
      return;
    }

    try {
      // 1. Obtener los pronósticos del usuario actual
      const qPronosticos = query(collection(db, 'pronosticos'), where("usuarioId", "==", usuario));
      const pronosticosSnap = await getDocs(qPronosticos);
      
      // 2. Obtener todos los partidos para cruzar la información
      const partidosSnap = await getDocs(collection(db, 'partidos'));
      const diccionarioPartidos: Record<string, any> = {};
      
      partidosSnap.forEach((doc) => {
        diccionarioPartidos[doc.id] = { id: doc.id, ...doc.data() };
      });

      // 3. Combinar los datos para mostrarlos en la UI
      const listaCombinada: any[] = [];
      pronosticosSnap.forEach((docSnap) => {
        const pronostico = docSnap.data();
        const partidoInfo = diccionarioPartidos[pronostico.partidoId];

        if (partidoInfo) {
          listaCombinada.push({
            idPronostico: docSnap.id,
            fase: partidoInfo.fase,
            fecha: partidoInfo.fecha,
            hora: partidoInfo.hora,
            equipo1: partidoInfo.equipo1,
            equipo2: partidoInfo.equipo2,
            estado: partidoInfo.estado,
            golesMiEq1: pronostico.golesEquipo1,
            golesMiEq2: pronostico.golesEquipo2,
            golesOficialesEq1: partidoInfo.golesEquipo1, // El admin los llenará después
            golesOficialesEq2: partidoInfo.golesEquipo2,
            puntos: pronostico.puntosObtenidos
          });
        }
      });

      setMisPronosticos(listaCombinada);
    } catch (error) {
      console.error("Error al cargar mis pronósticos:", error);
      presentToast({ message: 'Error al cargar los datos.', duration: 3000, color: 'danger' });
    }
  };

  // Cargar los datos cada vez que el usuario entre a la pantalla
  useEffect(() => {
    cargarMisPronosticos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Mis pronósticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', gap: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <IonIcon icon={informationCircleOutline} color="medium" style={{ fontSize: '20px' }} />
          <IonText color="medium" style={{ fontSize: '12px' }}>
            Esta pantalla muestra los pronósticos que has registrado.
          </IonText>
        </div>

        {misPronosticos.length === 0 && (
          <IonText color="medium" style={{ textAlign: 'center', display: 'block', marginTop: '30px' }}>
            Aún no has registrado ningún pronóstico.
          </IonText>
        )}

        {misPronosticos.map((item) => (
          <IonCard key={item.idPronostico} style={{ margin: '0 0 20px 0', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <IonText color="primary" style={{ fontWeight: 'bold', fontSize: '14px', textTransform: 'capitalize' }}>
                  Fase: {item.fase}
                </IonText>
                <IonBadge color={item.estado === 'FINALIZADO' ? 'medium' : 'success'}>
                  {item.estado}
                </IonBadge>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                <span><IonIcon icon={calendarOutline} /> {item.fecha}</span>
                <span><IonIcon icon={timeOutline} /> {item.hora}</span>
              </div>

              <IonGrid className="ion-no-padding">
                <IonRow className="ion-align-items-center ion-text-center">
                  <IonCol size="3">
                    <IonText style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.equipo1}</IonText>
                  </IonCol>
                  
                  <IonCol size="6">
                    <div style={{ background: '#f4f5f8', padding: '10px', borderRadius: '10px' }}>
                      <IonText color="medium" style={{ fontSize: '10px', display: 'block', marginBottom: '5px' }}>Tu pronóstico</IonText>
                      <IonText style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {item.golesMiEq1} - {item.golesMiEq2}
                      </IonText>
                    </div>
                  </IonCol>

                  <IonCol size="3">
                    <IonText style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.equipo2}</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>

              {/* Renderizado condicional basado en el estado del partido */}
              {item.estado === 'FINALIZADO' ? (
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <IonText color="medium" style={{ fontSize: '12px', display: 'block' }}>Resultado oficial</IonText>
                    <IonText style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {item.golesOficialesEq1} - {item.golesOficialesEq2}
                    </IonText>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <IonText color="medium" style={{ fontSize: '12px', display: 'block' }}>Puntos obtenidos</IonText>
                    <IonText color="success" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                      {item.puntos !== null ? `${item.puntos} pts` : 'Pendiente'}
                    </IonText>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '15px', background: '#fff9c4', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <IonText style={{ fontSize: '12px', color: '#f57f17' }}>
                    ⏳ Los resultados oficiales y puntajes se encuentran pendientes.
                  </IonText>
                </div>
              )}
            </IonCardContent>
          </IonCard>
        ))}

        <IonButton 
          expand="block" 
          fill="outline" 
          color="dark" 
          style={{ marginTop: '20px', marginBottom: '30px', '--border-radius': '10px' }}
          onClick={() => history.push('/participante')}
        >
          <IonIcon slot="start" icon={arrowBackOutline} />
          Volver
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default MisPronosticos;