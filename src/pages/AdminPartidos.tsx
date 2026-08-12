// src/pages/AdminPartidos.tsx
import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption,
  IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonText, IonBadge, IonIcon, IonInput, useIonToast, IonItem, IonLabel
} from '@ionic/react';
import { calendarOutline, timeOutline, arrowBackOutline, addCircleOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AdminPartidos: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();

  // Estados CREAR partido
  const [equipo1, setEquipo1] = useState('');
  const [equipo2, setEquipo2] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [faseNueva, setFaseNueva] = useState('grupos');

  // Estados VER/ACTUALIZAR partidos
  const [faseFiltro, setFaseFiltro] = useState('grupos');
  const [partidos, setPartidos] = useState<any[]>([]);
  const [resultadosOficiales, setResultadosOficiales] = useState<Record<string, { eq1: string, eq2: string }>>({});

  const cargarPartidos = async () => {
    try {
      const q = query(collection(db, 'partidos'), where("fase", "==", faseFiltro));
      const querySnapshot = await getDocs(q);
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setPartidos(lista);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  useEffect(() => {
    cargarPartidos();
  }, [faseFiltro]);

  const crearPartido = async () => {
    if (!equipo1.trim() || !equipo2.trim() || !fecha.trim() || !hora.trim()) {
      presentToast({ message: 'Llena todos los campos para crear el partido.', duration: 3000, color: 'warning' });
      return;
    }

    try {
      await addDoc(collection(db, 'partidos'), {
        equipo1: equipo1.trim(),
        equipo2: equipo2.trim(),
        fecha: fecha.trim(),
        hora: hora.trim(),
        fase: faseNueva,
        estado: 'ABIERTO',
        golesEquipo1: null,
        golesEquipo2: null
      });

      presentToast({ message: 'Partido creado exitosamente.', duration: 3000, color: 'success' });
      setEquipo1(''); setEquipo2(''); setFecha(''); setHora('');
      if (faseNueva === faseFiltro) cargarPartidos();
    } catch (error) {
      presentToast({ message: 'Error al crear el partido.', duration: 3000, color: 'danger' });
    }
  };

  const manejarCambioResultado = (partidoId: string, equipo: 'eq1' | 'eq2', valor: string) => {
    setResultadosOficiales(prev => ({
      ...prev,
      [partidoId]: {
        ...prev[partidoId],
        [equipo]: valor
      }
    }));
  };

  // Algoritmo para Finalizar Partido y Calcular Puntos
  const finalizarPartido = async (partidoId: string) => {
    const resOficial = resultadosOficiales[partidoId];

    if (!resOficial || resOficial.eq1 === undefined || resOficial.eq2 === undefined || resOficial.eq1 === '' || resOficial.eq2 === '') {
      presentToast({ message: 'Ingresa ambos goles oficiales antes de finalizar.', duration: 3000, color: 'warning' });
      return;
    }

    const golesRealEq1 = parseInt(resOficial.eq1);
    const golesRealEq2 = parseInt(resOficial.eq2);

    try {
      // 1. Actualizar el Partido
      const partidoRef = doc(db, 'partidos', partidoId);
      await updateDoc(partidoRef, {
        estado: 'FINALIZADO',
        golesEquipo1: golesRealEq1,
        golesEquipo2: golesRealEq2
      });

      // 2. Buscar todos los pronósticos de este partido
      const qPronosticos = query(collection(db, 'pronosticos'), where("partidoId", "==", partidoId));
      const pronosticosSnap = await getDocs(qPronosticos);

      // 3. Calcular puntos y actualizar cada pronóstico
      pronosticosSnap.forEach(async (documento) => {
        const pronostico = documento.data();
        let puntos = 0;
        const predEq1 = pronostico.golesEquipo1;
        const predEq2 = pronostico.golesEquipo2;

        // Determinar quién ganó en la realidad y en el pronóstico (1 = Eq1, 2 = Eq2, 0 = Empate)
        const ganadorReal = golesRealEq1 > golesRealEq2 ? 1 : (golesRealEq2 > golesRealEq1 ? 2 : 0);
        const ganadorPred = predEq1 > predEq2 ? 1 : (predEq2 > predEq1 ? 2 : 0);

        if (predEq1 === golesRealEq1 && predEq2 === golesRealEq2) {
          puntos = 3; // Acertó marcador exacto
        } else if (ganadorReal === ganadorPred) {
          puntos = 1; // Acertó solo tendencia (ganador o empate)
        }

        const pronosticoRef = doc(db, 'pronosticos', documento.id);
        await updateDoc(pronosticoRef, { puntosObtenidos: puntos });
      });

      presentToast({ message: 'Partido finalizado y puntos calculados.', duration: 3000, color: 'success' });
      cargarPartidos(); // Recargar la lista para reflejar el cambio a FINALIZADO
    } catch (error) {
      console.error("Error al finalizar partido:", error);
      presentToast({ message: 'Error al procesar los resultados.', duration: 3000, color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Administrar partidos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        {/* === SECCIÓN 1: CREAR === */}
        <IonCard style={{ margin: '0 0 30px 0', borderRadius: '15px', border: '1px solid #428cff' }}>
          <IonCardContent>
            <IonText color="primary" style={{ fontWeight: 'bold', fontSize: '16px', display: 'block', marginBottom: '15px' }}>
              <IonIcon icon={addCircleOutline} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Crear Nuevo Partido
            </IonText>

            <IonItem lines="none" style={{ '--background': '#f4f5f8', borderRadius: '8px', marginBottom: '10px' }}>
              <IonLabel position="stacked">Fase</IonLabel>
              <IonSelect value={faseNueva} onIonChange={e => setFaseNueva(e.detail.value)} interface="popover">
                <IonSelectOption value="grupos">Fase de grupos</IonSelectOption>
                <IonSelectOption value="dieciseisavos">Dieciseisavos de final</IonSelectOption>
                <IonSelectOption value="octavos">Octavos de final</IonSelectOption>
                <IonSelectOption value="cuartos">Cuartos de final</IonSelectOption>
                <IonSelectOption value="semifinales">Semifinales</IonSelectOption>
                <IonSelectOption value="tercer">Partido por el tercer lugar</IonSelectOption>
                <IonSelectOption value="final">Final</IonSelectOption>
              </IonSelect>
            </IonItem>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <IonInput placeholder="Equipo 1" value={equipo1} onIonChange={e => setEquipo1(e.detail.value!)} style={{ background: '#f4f5f8', padding: '10px', borderRadius: '8px' }} />
              <IonText style={{ alignSelf: 'center', fontWeight: 'bold' }}>VS</IonText>
              <IonInput placeholder="Equipo 2" value={equipo2} onIonChange={e => setEquipo2(e.detail.value!)} style={{ background: '#f4f5f8', padding: '10px', borderRadius: '8px' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <IonInput type="date" value={fecha} onIonChange={e => setFecha(e.detail.value!)} style={{ background: '#f4f5f8', padding: '10px', borderRadius: '8px' }} />
              <IonInput type="time" value={hora} onIonChange={e => setHora(e.detail.value!)} style={{ background: '#f4f5f8', padding: '10px', borderRadius: '8px' }} />
            </div>

            <IonButton expand="block" onClick={crearPartido}>Guardar Partido</IonButton>
          </IonCardContent>
        </IonCard>

        {/* === SECCIÓN 2: VER / FINALIZAR === */}
        <IonText style={{ fontWeight: 'bold', fontSize: '16px', display: 'block', marginBottom: '10px' }}>
          Partidos registrados
        </IonText>
        
        <IonSelect 
          value={faseFiltro} 
          onIonChange={e => setFaseFiltro(e.detail.value)}
          interface="action-sheet"
          style={{ background: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}
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
          <IonText color="medium" style={{ textAlign: 'center', display: 'block' }}>No hay partidos en esta fase.</IonText>
        )}

        {partidos.map((partido) => (
          <IonCard key={partido.id} style={{ margin: '0 0 15px 0', borderRadius: '15px' }}>
            <IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <IonBadge color={partido.estado === 'ABIERTO' ? 'success' : 'medium'}>{partido.estado}</IonBadge>
              </div>
              
              <IonGrid className="ion-no-padding">
                <IonRow className="ion-align-items-center ion-text-center">
                  <IonCol size="4">
                    <IonText style={{ fontWeight: 'bold' }}>{partido.equipo1}</IonText>
                  </IonCol>
                  
                  <IonCol size="4">
                    {partido.estado === 'ABIERTO' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <IonInput 
                          type="number" min="0"
                          value={resultadosOficiales[partido.id]?.eq1 || ''}
                          onIonChange={e => manejarCambioResultado(partido.id, 'eq1', e.detail.value!)}
                          style={{ background: '#f4f5f8', borderRadius: '5px', textAlign: 'center', width: '40px' }}
                        />
                        <IonText>-</IonText>
                        <IonInput 
                          type="number" min="0"
                          value={resultadosOficiales[partido.id]?.eq2 || ''}
                          onIonChange={e => manejarCambioResultado(partido.id, 'eq2', e.detail.value!)}
                          style={{ background: '#f4f5f8', borderRadius: '5px', textAlign: 'center', width: '40px' }}
                        />
                      </div>
                    ) : (
                      <IonText style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {partido.golesEquipo1} - {partido.golesEquipo2}
                      </IonText>
                    )}
                  </IonCol>

                  <IonCol size="4">
                    <IonText style={{ fontWeight: 'bold' }}>{partido.equipo2}</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>

              {partido.estado === 'ABIERTO' && (
                <IonButton 
                  expand="block" 
                  color="warning" 
                  onClick={() => finalizarPartido(partido.id)} 
                  style={{ marginTop: '15px' }}
                >
                  <IonIcon slot="start" icon={checkmarkDoneOutline} />
                  Finalizar Partido
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        ))}

        <IonButton expand="block" fill="outline" color="dark" onClick={() => history.push('/administrador')} style={{ marginTop: '20px', marginBottom: '30px' }}>
          <IonIcon slot="start" icon={arrowBackOutline} />
          Volver al menú
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default AdminPartidos;