import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonNote, IonIcon } from '@ionic/react';
import { receiptOutline, timeOutline, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const Notifications: React.FC = () => {
    const { history } = useUser();
    const { t } = useTranslation();

    const getStatusParams = (status: string) => {
        switch (status) {
            case 'success': return { color: 'success', icon: checkmarkCircleOutline };
            case 'cancelled': return { color: 'danger', icon: closeCircleOutline };
            default: return { color: 'warning', icon: timeOutline };
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t('notifications')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {history.length === 0 ? (
                    <div className="ion-padding ion-text-center" style={{ marginTop: '50px', color: 'var(--ion-color-medium)' }}>
                        <p>No transaction history</p>
                    </div>
                ) : (
                    <IonList inset={true}>
                        {history.map(tx => {
                            const { color, } = getStatusParams(tx.status);
                            return (
                                <IonItem key={tx.id} detail={true} button>
                                    <div slot="start" style={{ background: '#f0f0f0', padding: '10px', borderRadius: '50%' }}>
                                        <IonIcon icon={receiptOutline} size="small" />
                                    </div>
                                    <IonLabel>
                                        <h2>Order #{tx.id.slice(-6)}</h2>
                                        <p>{new Date(tx.date).toLocaleDateString()} - {new Date(tx.date).toLocaleTimeString()}</p>
                                        <p>Total: <strong>Rp {tx.total.toLocaleString('id-ID')}</strong></p>
                                    </IonLabel>
                                    <IonNote slot="end" color={color} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {tx.status.toUpperCase()}
                                    </IonNote>
                                </IonItem>
                            );
                        })}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};
export default Notifications;
