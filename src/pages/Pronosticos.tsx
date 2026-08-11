// src/pages/Pronosticos.tsx
import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption,
  IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonText, IonBadge, IonIcon, useIonToast
} from '@ionic/react';
import { calendarOutline, timeOutline } from 'ionicons/icons';
// Importamos doc y setDoc para poder actualizar registros existentes
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Pronosticos: React.FC = () => {
  const [fase, setFase] = useState<string>('grupos');
  const [partidos, setPartidos] = useState<any[]>([]);
  const [goles, setGoles] = useState<Record<string, { eq1: string, eq2: string }>>({});
  const [presentToast] = useIonToast();

  const cargarPartidos = async () => {
    try {
      const q = query(collection(db, 'partidos'), where("fase", "==", fase));
      const querySnapshot = await getDocs(q);
      
      const partidosCargados: any[] = [];
      querySnapshot.forEach((doc) => {
        partidosCargados.push({ id: doc.id, ...doc.data() });
      });
      
      setPartidos(partidosCargados);
      // Una vez que cargamos los partidos, buscamos si el usuario ya los había pronosticado
      cargarPronosticosPrevios();
    } catch (error) {
      console.error("Error al cargar partidos:", error);
    }
  };

  // NUEVO: Función para pre-cargar los pronósticos que el usuario ya guardó
  const cargarPronosticosPrevios = async () => {
    const usuario = localStorage.getItem('usuarioLogueado');
    if (!usuario) return;

    try {
      const q = query(
        collection(db, 'pronosticos'), 
        where("usuarioId", "==", usuario),
        where("fase", "==", fase)
      );
      const querySnapshot = await getDocs(q);
      
      const golesRecuperados: Record<string, { eq1: string, eq2: string }> = {};
      querySnapshot.forEach((documento) => {
        const data = documento.data();
        golesRecuperados[data.partidoId] = {
          eq1: data.golesEquipo1.toString(),
          eq2: data.golesEquipo2.toString()
        };
      });
      
      setGoles(golesRecuperados);
    } catch (error) {
      console.error("Error al cargar pronósticos previos:", error);
    }
  };

  useEffect(() => {
    cargarPartidos();
  }, [fase]);

  const manejarCambioGoles = (partidoId: string, equipo: 'eq1' | 'eq2', valor: string) => {
    setGoles(prev => ({
      ...prev,
      [partidoId]: {
        ...prev[partidoId],
        [equipo]: valor
      }
    }));
  };

  const guardarPronostico = async (partidoId: string) => {
    const pronosticoActual = goles[partidoId];
    const usuario = localStorage.getItem('usuarioLogueado');

    if (!usuario) {
      presentToast({ message: 'Error: No hay sesión activa.', duration: 3000, color: 'danger' });
      return;
    }

    if (!pronosticoActual || pronosticoActual.eq1 === undefined || pronosticoActual.eq2 === undefined || pronosticoActual.eq1 === '' || pronosticoActual.eq2 === '') {
      presentToast({ message: 'Ingresa ambos goles antes de guardar.', duration: 3000, color: 'warning' });
      return;
    }

    try {
      // NUEVO: Creamos un ID único combinando el usuario y el partido
      const pronosticoIdUnico = `${usuario}_${partidoId}`;
      const pronosticoRef = doc(db, 'pronosticos', pronosticoIdUnico);

      // Usamos setDoc con { merge: true } para crear o actualizar sin duplicar
      await setDoc(pronosticoRef, {
        usuarioId: usuario,
        partidoId: partidoId,
        golesEquipo1: parseInt(pronosticoActual.eq1),
        golesEquipo2: parseInt(pronosticoActual.eq2),
        fase: fase,
        puntosObtenidos: null
      }, { merge: true });

      presentToast({ message: 'Pronóstico guardado/actualizado con éxito!', duration: 3000, color: 'success' });
    } catch (error) {
      console.error("Error al guardar:", error);
      presentToast({ message: 'Hubo un error al guardar.', duration: 3000, color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Pronósticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding">
        
        <IonText color="medium">Fase del torneo</IonText>
        <IonSelect 
          value={fase} 
          onIonChange={e => setFase(e.detail.value)}
          interface="action-sheet"
          style={{ background: '#f4f5f8', padding: '10px', borderRadius: '8px', marginBottom: '20px', marginTop: '5px' }}
        >
          <IonSelectOption value="grupos">Fase de grupos</IonSelectOption>
          <IonSelectOption value="dieciseisavos">Dieciseisavos de final</IonSelectOption>
          <IonSelectOption value="octavos">Octavos de final</IonSelectOption>
          <IonSelectOption value="cuartos">Cuartos de final</IonSelectOption>
          <IonSelectOption value="semifinales">Semifinales</IonSelectOption>
          <IonSelectOption value="tercer">Partido por el tercer lugar</IonSelectOption>
          <IonSelectOption value="final">Final</IonSelectOption>
        </IonSelect>

        {partidos.length === 0 && (
          <IonText color="medium" style={{ textAlign: 'center', display: 'block', marginTop: '30px' }}>
            No hay partidos registrados en esta fase aún.
          </IonText>
        )}

        {partidos.map((partido) => (
          <IonCard key={partido.id} style={{ margin: '0 0 20px 0', borderRadius: '15px' }}>
            <IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                <span><IonIcon icon={calendarOutline} /> {partido.fecha}</span>
                <span><IonIcon icon={timeOutline} /> {partido.hora}</span>
                <IonBadge color={partido.estado === 'ABIERTO' ? 'success' : 'warning'}>
                  {partido.estado}
                </IonBadge>
              </div>

              <IonGrid>
                <IonRow className="ion-align-items-center ion-text-center">
                  <IonCol size="4">
                    <IonText style={{ fontWeight: 'bold' }}>{partido.equipo1}</IonText>
                  </IonCol>
                  
                  <IonCol size="4">
                    <IonText color="medium" style={{ fontSize: '12px' }}>Tu pronóstico</IonText>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '5px' }}>
                      <IonInput 
                        type="number" 
                        min="0"
                        readonly={partido.estado !== 'ABIERTO'}
                        value={goles[partido.id]?.eq1 || ''}
                        onIonChange={e => manejarCambioGoles(partido.id, 'eq1', e.detail.value!)}
                        style={{ background: '#f4f5f8', borderRadius: '5px', textAlign: 'center', width: '40px' }}
                      />
                      <IonText>-</IonText>
                      <IonInput 
                        type="number" 
                        min="0"
                        readonly={partido.estado !== 'ABIERTO'}
                        value={goles[partido.id]?.eq2 || ''}
                        onIonChange={e => manejarCambioGoles(partido.id, 'eq2', e.detail.value!)}
                        style={{ background: '#f4f5f8', borderRadius: '5px', textAlign: 'center', width: '40px' }}
                      />
                    </div>
                  </IonCol>

                  <IonCol size="4">
                    <IonText style={{ fontWeight: 'bold' }}>{partido.equipo2}</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>

              {partido.estado === 'ABIERTO' && (
                <IonButton expand="block" color="success" onClick={() => guardarPronostico(partido.id)} style={{ marginTop: '15px' }}>
                  Guardar pronóstico
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default Pronosticos;