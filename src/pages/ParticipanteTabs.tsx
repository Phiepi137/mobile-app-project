// src/pages/ParticipanteTabs.tsx
import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { footballOutline, listOutline, trophyOutline, logOutOutline } from 'ionicons/icons';

// Importamos las 3 pantallas del participante
import Pronosticos from './Pronosticos';
import MisPronosticos from './MisPronosticos';
import Posiciones from './Posiciones';

const ParticipanteTabs: React.FC = () => {
  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = '/login';
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Rutas internas de las pestañas */}
        <Route exact path="/participante/pronosticos" component={Pronosticos} />
        <Route exact path="/participante/mis-pronosticos" component={MisPronosticos} />
        <Route exact path="/participante/posiciones" component={Posiciones} />
        
        {/* Redirección por defecto si entran a /participante */}
        <Route exact path="/participante">
          <Redirect to="/participante/pronosticos" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" color="light">
        <IonTabButton tab="pronosticos" href="/participante/pronosticos">
          <IonIcon icon={footballOutline} />
          <IonLabel>Pronosticar</IonLabel>
        </IonTabButton>

        <IonTabButton tab="mis-pronosticos" href="/participante/mis-pronosticos">
          <IonIcon icon={listOutline} />
          <IonLabel>Mis Datos</IonLabel>
        </IonTabButton>

        <IonTabButton tab="posiciones" href="/participante/posiciones">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Ranking</IonLabel>
        </IonTabButton>
        
        {/* Botón extra para salir */}
        <IonTabButton tab="salir" onClick={cerrarSesion}>
          <IonIcon icon={logOutOutline} color="danger" />
          <IonLabel color="danger">Salir</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default ParticipanteTabs;