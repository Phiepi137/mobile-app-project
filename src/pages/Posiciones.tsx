// src/pages/Posiciones.tsx
import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonBadge, IonAvatar, IonText, IonIcon 
} from '@ionic/react';
import { trophyOutline } from 'ionicons/icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Interfaz para estructurar los datos del ranking
interface Posicion {
  id: string;
  nombre: string;
  puntos: number;
}

const Posiciones: React.FC = () => {
  const [posiciones, setPosiciones] = useState<Posicion[]>([]);

  const cargarPosiciones = async () => {
    try {
      // 1. Obtener todos los usuarios que son de tipo 'Participante'
      const qUsuarios = query(collection(db, 'usuarios'), where('tipo', '==', 'Participante'));
      const usuariosSnap = await getDocs(qUsuarios);

      // Crear un diccionario de usuarios inicializado con 0 puntos
      const mapaUsuarios: Record<string, Posicion> = {};
      usuariosSnap.forEach(doc => {
        const data = doc.data();
        mapaUsuarios[data.username] = {
          id: data.username,
          nombre: data.nombreCompleto || data.username,
          puntos: 0
        };
      });

      // 2. Obtener todos los pronósticos de la base de datos
      const pronosticosSnap = await getDocs(collection(db, 'pronosticos'));
      
      // 3. Sumar los puntos obtenidos al usuario correspondiente
      pronosticosSnap.forEach(doc => {
        const data = doc.data();
        // Solo sumar si el partido ya finalizó y tiene puntos calculados
        if (data.puntosObtenidos !== null && data.puntosObtenidos !== undefined) {
          if (mapaUsuarios[data.usuarioId]) {
            mapaUsuarios[data.usuarioId].puntos += data.puntosObtenidos;
          }
        }
      });

      // 4. Convertir el diccionario a un arreglo y ordenarlo
      const listaPosiciones = Object.values(mapaUsuarios);
      listaPosiciones.sort((a, b) => {
        if (b.puntos !== a.puntos) {
          return b.puntos - a.puntos; // Ordenar de mayor a menor puntaje
        }
        // Desempate: Orden alfabético si tienen los mismos puntos
        return a.nombre.localeCompare(b.nombre); 
      });

      setPosiciones(listaPosiciones);
    } catch (error) {
      console.error("Error al cargar posiciones:", error);
    }
  };

  // Cargar los datos automáticamente al abrir la pantalla
  useEffect(() => {
    cargarPosiciones();
  }, []);

  // Función para asignar medallas visuales a los 3 primeros lugares
  const getMedalla = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return <IonText color="medium">{index + 1}</IonText>;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Tabla de Posiciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" style={{ '--background': '#f4f5f8' }}>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <IonIcon icon={trophyOutline} style={{ fontSize: '50px', color: '#ffc409' }} />
          <IonText color="dark" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>
            Ranking Global
          </IonText>
          <IonText color="medium" style={{ fontSize: '12px' }}>
            Los mejores pronosticadores del torneo
          </IonText>
        </div>

        {posiciones.length === 0 && (
          <IonText color="medium" style={{ textAlign: 'center', display: 'block', marginTop: '30px' }}>
            Aún no hay participantes registrados o no se han calculado puntos.
          </IonText>
        )}

        <IonList style={{ background: 'transparent' }}>
          {posiciones.map((usuario, index) => (
            <IonItem 
              key={usuario.id} 
              lines="none"
              style={{ 
                '--border-radius': '10px', 
                marginBottom: '10px', 
                '--background': 'white', 
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)' 
              }} 
            >
              <div slot="start" style={{ width: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                {getMedalla(index)}
              </div>
              
              {/* Inicial del nombre del usuario */}
              <IonAvatar slot="start" style={{ width: '40px', height: '40px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666' }}>
                {usuario.nombre.charAt(0).toUpperCase()}
              </IonAvatar>
              
              <IonLabel>
                <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>{usuario.nombre}</h2>
                <p>@{usuario.id}</p>
              </IonLabel>
              
              <IonBadge slot="end" color="success" style={{ fontSize: '16px', padding: '8px 12px', borderRadius: '8px' }}>
                {usuario.puntos} pts
              </IonBadge>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Posiciones;