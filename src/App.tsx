// src/App.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Estilos de Ionic (no borrar) */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Pantallas Importadas */
import Login from './pages/Login';
import ParticipanteTabs from './pages/ParticipanteTabs';
import AdminMenu from './pages/AdminMenu';
import AdminPartidos from './pages/AdminPartidos';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        
        {/* Ruta inicial -> Redirige al Login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        
        {/* Pantalla de Login */}
        <Route exact path="/login" component={Login} />

        {/* 
          Ruta del Participante (Carga el contenedor de Pestañas). 
          Nota: No usamos 'exact' aquí para que las rutas hijas (/pronosticos, etc) funcionen.
        */}
        <Route path="/participante" component={ParticipanteTabs} />

        {/* Rutas del Administrador (Navegación en Pila / Stack) */}
        <Route exact path="/administrador" component={AdminMenu} />
        <Route exact path="/administrador/partidos" component={AdminPartidos} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;