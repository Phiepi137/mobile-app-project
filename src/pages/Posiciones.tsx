// src/pages/Posiciones.tsx
import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonButton,
  IonAvatar
} from '@ionic/react';
import { trophyOutline, arrowBackOutline, personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

// Datos de prueba (mock) para simular el archivo participantes.txt y usuarios.txt
const mockParticipantes = [
  { id: 1, nombre: 'Maria Gonzales', puntos: 125 },
  { id: 2, nombre: 'Juan Pérez', puntos: 110 },
  { id: 3, nombre: 'Carlos Ramirez', puntos: 100 },
  { id: 4, nombre: 'Ana Torres', puntos: 85 },
  { id: 5, nombre: 'Luis Fernandez', puntos: 70 },
  { id: 6, nombre: 'Sofia Martinez', puntos: 65 },
  { id: 7, nombre: 'Diego López', puntos: 50 },
  { id: 8, nombre: 'Andres Silva', puntos: 40 },
  { id: 9, nombre: 'Pablo Ruiz', puntos: 25 },
  { id: 10, nombre: 'Valeria Romero', puntos: 30 },
  { id: 11, nombre: 'Alberto Silva', puntos: 40 } // Agregado para probar el desempate alfabético
];

const Posiciones: React.FC = () => {
  const history = useHistory();

  // Lógica de ordenamiento: equivalente a la interfaz Comparable en Java
  // 1. Mayor a menor puntaje. 2. Orden alfabético si hay empate.
  const participantesOrdenados = [...mockParticipantes].sort((a, b) => {
    if (b.puntos !== a.puntos) {
      return b.puntos - a.puntos;
    }
    return a.nombre.localeCompare(b.nombre);
  });

  return (
    <IonPage>
      {/* Contenedor principal con scroll habilitado (ScrollView) */}
      <IonContent fullscreen style={{ '--background': '#f4f5f8' }}>
        
        {/* Encabezado personalizado superior (Perfil del usuario) */}
        <div style={{ 
          background: '#0b1c4a', 
          padding: '40px 20px 20px 20px', 
          borderBottomLeftRadius: '30px', 
          borderBottomRightRadius: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <IonIcon icon={personCircleOutline} style={{ fontSize: '50px' }} />
            <div>
              <IonText style={{ fontSize: '12px', opacity: 0.8, display: 'block' }}>Bienvenido,</IonText>
              <IonText style={{ fontSize: '18px', fontWeight: 'bold', display: 'block' }}>Juan Pérez</IonText>
              <IonText style={{ fontSize: '12px', color: '#81c784' }}>Participante</IonText>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IonIcon icon={trophyOutline} style={{ fontSize: '30px' }} />
            <IonText style={{ fontSize: '10px', display: 'block', fontWeight: 'bold' }}>MUNDIAL<br/>2026</IonText>
          </div>
        </div>

        {/* Contenedor de la Tabla */}
        <div style={{ padding: '0 20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <IonIcon icon={trophyOutline} style={{ fontSize: '24px', color: '#0b1c4a' }} />
            <div>
              <IonText style={{ fontSize: '18px', fontWeight: 'bold', color: '#0b1c4a', display: 'block' }}>Tabla de posiciones</IonText>
              <IonText color="medium" style={{ fontSize: '12px' }}>De los participantes del Mundial 2026</IonText>
            </div>
          </div>

          {/* Tabla construida con IonGrid */}
          <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            
            {/* Cabecera de la tabla */}
            <IonGrid className="ion-no-padding">
              <IonRow style={{ background: '#0b1c4a', color: 'white', padding: '10px 0', fontWeight: 'bold', fontSize: '14px' }}>
                <IonCol size="2" className="ion-text-center">Pos.</IonCol>
                <IonCol size="7">Participante</IonCol>
                <IonCol size="3" className="ion-text-center">Puntos</IonCol>
              </IonRow>

              {/* Filas de la tabla renderizadas dinámicamente */}
              {participantesOrdenados.map((participante, index) => (
                <IonRow 
                  key={participante.id} 
                  style={{ 
                    borderBottom: '1px solid #eee', 
                    padding: '12px 0', 
                    fontSize: '14px',
                    alignItems: 'center'
                  }}
                >
                  <IonCol size="2" className="ion-text-center">
                    <IonText color="medium">{index + 1}</IonText>
                  </IonCol>
                  <IonCol size="7">
                    <IonText color="dark">{participante.nombre}</IonText>
                  </IonCol>
                  <IonCol size="3" className="ion-text-center">
                    <IonText style={{ fontWeight: 'bold', color: '#0b1c4a' }}>{participante.puntos}</IonText>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </div>

          {/* Botón Volver (Solicitado en el diseño del PDF) */}
          <IonButton 
            expand="block" 
            fill="outline" 
            color="dark" 
            style={{ marginTop: '20px', marginBottom: '30px', '--border-radius': '10px' }}
            onClick={() => history.push('/participante/pronosticos')}
          >
            <IonIcon slot="start" icon={arrowBackOutline} />
            Volver
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Posiciones;