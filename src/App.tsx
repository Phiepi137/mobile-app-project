import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, football, trophy } from 'ionicons/icons';

// Importación de Páginas Públicas
import Login from './pages/Login';

// Importación de Páginas del Participante
import Posiciones from './pages/Posiciones';
import Pronosticos from './pages/Pronosticos';
import MisPronosticos from './pages/MisPronosticos';

// Importación de Páginas del Administrador
import AdminMenu from './pages/AdminMenu';
import AdminPartidos from './pages/AdminPartidos';
import AdminPuntajes from './pages/AdminPuntajes';

/* Core CSS required for Ionic components to work properly */
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
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* Outlet principal de la aplicación */}
      <IonRouterOutlet>
        
        {/* Ruta Pública: Pantalla de Login */}
        <Route exact path="/login">
          <Login />
        </Route>
        
        {/* ==========================================
            RUTAS DEL PARTICIPANTE (Con Tabs)
            ========================================== */}
        <Route path="/participante">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/participante/posiciones">
                <Posiciones />
              </Route>
              <Route exact path="/participante/pronosticos">
                <Pronosticos />
              </Route>
              <Route exact path="/participante/mis-pronosticos">
                <MisPronosticos />
              </Route>
              <Route exact path="/participante">
                <Redirect to="/participante/posiciones" />
              </Route>
            </IonRouterOutlet>
            
            <IonTabBar slot="bottom">
              <IonTabButton tab="posiciones" href="/participante/posiciones">
                <IonIcon aria-hidden="true" icon={trophy} />
                <IonLabel>Posiciones</IonLabel>
              </IonTabButton>
              <IonTabButton tab="pronosticos" href="/participante/pronosticos">
                <IonIcon aria-hidden="true" icon={football} />
                <IonLabel>Pronósticos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="mis-pronosticos" href="/participante/mis-pronosticos">
                <IonIcon aria-hidden="true" icon={list} />
                <IonLabel>Mis Pronósticos</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>

        {/* ==========================================
            RUTAS DEL ADMINISTRADOR (Sin Tabs)
            ========================================== */}
        <Route exact path="/administrador">
          <AdminMenu />
        </Route>
        <Route exact path="/administrador/partidos">
          <AdminPartidos />
        </Route>
        <Route exact path="/administrador/puntajes">
          <AdminPuntajes />
        </Route>

        {/* Redirección inicial al abrir la app */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;