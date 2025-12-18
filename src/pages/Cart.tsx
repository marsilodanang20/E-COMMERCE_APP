import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonFooter } from '@ionic/react';
import { trashOutline, basketOutline } from 'ionicons/icons';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import QuantityControl from '../components/QuantityControl';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t('cart')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {cart.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        marginTop: '30vh',
                        color: 'var(--ion-color-medium)',
                        padding: '20px'
                    }}>
                        <IonIcon icon={basketOutline} style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }} />
                        <h3 className="text-large font-bold">{t('empty_cart')}</h3>
                        <p className="text-small" style={{ marginBottom: '20px' }}>Start adding items to your cart</p>
                        <IonButton routerLink="/products" fill="solid" shape="round">Shop Now</IonButton>
                    </div>
                ) : (
                    <IonList className="ion-padding-bottom">
                        {cart.map(item => (
                            <IonItem key={item.id} lines="full" style={{ '--padding-top': '10px', '--padding-bottom': '10px' }}>
                                <IonThumbnail slot="start" style={{ width: '80px', height: '80px', borderRadius: '12px', background: '#f4f4f4' }}>
                                    <img src={item.image} alt={item.name} style={{ objectFit: 'cover', borderRadius: '12px' }} />
                                </IonThumbnail>
                                <IonLabel className="ion-text-wrap">
                                    <h3 style={{ fontWeight: '700', fontSize: '1rem' }}>{item.name}</h3>
                                    <p style={{ color: 'var(--ion-color-primary)', fontWeight: '600', marginBottom: '8px' }}>
                                        Rp {item.price.toLocaleString('id-ID')}
                                    </p>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <QuantityControl
                                            quantity={item.quantity}
                                            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                                            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                                        />
                                        <strong style={{ fontSize: '0.9rem', marginLeft: '10px' }}>
                                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                        </strong>
                                    </div>
                                </IonLabel>

                                <div slot="end" style={{ alignSelf: 'flex-start' }}>
                                    <IonButton color="medium" fill="clear" size="small" onClick={() => removeFromCart(item.id)}>
                                        <IonIcon icon={trashOutline} slot="icon-only" />
                                    </IonButton>
                                </div>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
            {cart.length > 0 && (
                <IonFooter>
                    <IonToolbar>
                        <div className="ion-padding" style={{ background: 'var(--ion-card-background)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span className="text-normal font-medium">{t('total')}</span>
                                <strong style={{ fontSize: '1.4rem', color: 'var(--ion-color-primary)' }}>
                                    Rp {total.toLocaleString('id-ID')}
                                </strong>
                            </div>
                            <IonButton expand="block" shape="round" onClick={() => history.push('/checkout')} size="large">
                                {t('checkout')}
                            </IonButton>
                        </div>
                    </IonToolbar>
                </IonFooter>
            )}
        </IonPage>
    );
};
export default Cart;
