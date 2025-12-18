import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonTextarea, IonButton, IonAlert, useIonToast, IonFooter, IonButtons, IonBackButton } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useUser, Transaction } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { t } = useTranslation();
    const { cart, total, clearCart } = useCart();
    const { addTransaction } = useUser();
    const history = useHistory();
    const [presentToast] = useIonToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleCheckout = () => {
        if (!name || !email || !address) {
            presentToast({
                message: 'Please fill name, email and address.',
                duration: 2000,
                color: 'warning'
            });
            return;
        }
        setShowAlert(true);
    };

    const confirmOrder = () => {
        const transaction: Transaction = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: [...cart],
            total: total,
            status: 'success',
            customer: { name, email, address, message }
        };

        addTransaction(transaction);

        // Construct WhatsApp Message
        const itemsText = cart.map(item => `- ${item.name} (${item.quantity}x) = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`).join('%0A');
        const waMessage = `*Halo Auto Clinic, Saya mau pesan:*%0A%0A` +
            `*Nama:* ${name}%0A` +
            `*Alamat:* ${address}%0A` +
            `*Email:* ${email}%0A` +
            `*Pesan:* ${message}%0A%0A` +
            `*Detail Pesanan:*%0A${itemsText}%0A%0A` +
            `*Total: Rp ${total.toLocaleString('id-ID')}*`;

        const url = `https://wa.me/6281224306203?text=${waMessage}`;

        // Redirect
        window.open(url, '_blank');

        // Cleanup
        clearCart();
        history.replace('/home');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/cart" />
                    </IonButtons>
                    <IonTitle>{t('checkout')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="ion-padding-start ion-padding-top">
                    <h3 style={{ marginLeft: '16px' }}>Customer Details</h3>
                </div>
                <IonList inset={true}>
                    <IonItem>
                        <IonInput label={t('name')} labelPlacement="stacked" value={name} onIonInput={e => setName(e.detail.value!)} placeholder="Your full name"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput label={t('email')} type="email" labelPlacement="stacked" value={email} onIonInput={e => setEmail(e.detail.value!)} placeholder="your@email.com"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonTextarea label={t('address')} labelPlacement="stacked" value={address} onIonInput={e => setAddress(e.detail.value!)} rows={3} placeholder="Full delivery address"></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonTextarea label={t('message')} labelPlacement="stacked" value={message} onIonInput={e => setMessage(e.detail.value!)} placeholder="Optional message"></IonTextarea>
                    </IonItem>
                </IonList>

                <div className="ion-padding">
                    <h4>Order Summary</h4>
                    <div style={{ background: 'var(--ion-color-step-50)', padding: '15px', borderRadius: '12px' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                        <div style={{ width: '100%', height: '1px', background: 'var(--ion-color-step-200)', margin: '10px 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            <span>Total</span>
                            <span>Rp {total.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="ion-padding">
                        <IonButton expand="block" shape="round" onClick={handleCheckout}>
                            {t('yes_order')}
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={t('confirm_checkout')}
                message="Are you sure you want to proceed to WhatsApp?"
                buttons={[
                    {
                        text: t('cancel'),
                        role: 'cancel',
                        handler: () => { }
                    },
                    {
                        text: t('yes_order'),
                        role: 'confirm',
                        handler: confirmOrder
                    }
                ]}
            />
        </IonPage>
    );
};
export default Checkout;
