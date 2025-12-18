import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, cubeOutline, cartOutline, notificationsOutline, settingsOutline } from 'ionicons/icons';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

import { CartProvider, useCart } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import './theme/typography.css'; /* Custom Typography */

/* Internationalization */
import { useTranslation } from 'react-i18next';

setupIonicReact({
  mode: 'ios' // Force iOS design
});

const TabBar: React.FC = () => {
  const { t } = useTranslation();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>{t('home')}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="products" href="/products">
        <IonIcon icon={cubeOutline} />
        <IonLabel>{t('products')}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="cart" href="/cart">
        <IonIcon icon={cartOutline} />
        <IonLabel>{t('cart')}</IonLabel>
        {totalItems > 0 && <IonBadge color="danger">{totalItems}</IonBadge>}
      </IonTabButton>
      <IonTabButton tab="notifications" href="/notifications">
        <IonIcon icon={notificationsOutline} />
        <IonLabel>{t('notifications')}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/settings">
        <IonIcon icon={settingsOutline} />
        <IonLabel>{t('settings')}</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home"><Home /></Route>
                <Route exact path="/products"><Products /></Route>
                <Route path="/product/:id"><ProductDetail /></Route>
                <Route exact path="/cart"><Cart /></Route>
                <Route exact path="/checkout"><Checkout /></Route>
                <Route exact path="/notifications"><Notifications /></Route>
                <Route exact path="/settings"><Settings /></Route>
                <Route exact path="/"><Redirect to="/home" /></Route>
              </IonRouterOutlet>
              <TabBar />
            </IonTabs>
          </IonReactRouter>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;
