import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { addOutline, removeOutline } from 'ionicons/icons';

interface QuantityControlProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--ion-color-light)',
            borderRadius: '20px',
            padding: '2px'
        }}>
            <IonButton
                size="small"
                fill="clear"
                onClick={(e) => { e.stopPropagation(); onDecrease(); }}
                color="medium"
            >
                <IonIcon icon={removeOutline} slot="icon-only" size="small" />
            </IonButton>

            <span style={{
                minWidth: '24px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem'
            }}>
                {quantity}
            </span>

            <IonButton
                size="small"
                fill="clear"
                onClick={(e) => { e.stopPropagation(); onIncrease(); }}
                color="primary"
            >
                <IonIcon icon={addOutline} slot="icon-only" size="small" />
            </IonButton>
        </div>
    );
};

export default QuantityControl;
