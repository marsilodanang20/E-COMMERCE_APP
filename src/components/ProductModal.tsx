import React, { useRef } from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonImg, IonFooter, useIonToast } from '@ionic/react';
import { closeOutline, cartOutline, heart, heartOutline, star } from 'ionicons/icons';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const { t } = useTranslation();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUser();
    const modal = useRef<HTMLIonModalElement>(null);
    const [presentToast] = useIonToast();

    if (!product) return null;

    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        presentToast({
            message: `${product.name} added to cart!`,
            duration: 1500,
            position: 'bottom',
            color: 'success',
            icon: cartOutline
        });
        // Optional: Close modal after adding? 
        // Usually keep open in case they want to add more or read more. 
        // User requested "Add to Cart ONLY adds to cart", so we keep it open.
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} ref={modal} breakpoints={[0, 0.75, 1]} initialBreakpoint={0.75}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{product.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <IonImg src={product.image} alt={product.name} style={{ height: '250px', objectFit: 'contain', borderRadius: '12px', background: 'var(--ion-color-light)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{
                            background: 'var(--ion-color-secondary)',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}>
                            {product.category}
                        </span>
                    </div>

                    <IonButton fill="clear" onClick={toggleWishlist} color={isWishlisted ? 'danger' : 'medium'}>
                        <IonIcon slot="icon-only" icon={isWishlisted ? heart : heartOutline} />
                    </IonButton>
                </div>

                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', margin: '10px 0 5px' }}>{product.name}</h2>

                <h3 style={{
                    color: 'var(--ion-color-primary)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    marginBottom: '20px'
                }}>
                    Rp {product.price.toLocaleString('id-ID')}
                </h3>

                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'var(--ion-text-color)',
                    marginBottom: '20px'
                }}>
                    {product.description}
                </p>

                <div style={{
                    background: 'var(--ion-color-light)',
                    padding: '15px',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                }}>
                    <p style={{ margin: 0 }}><strong>Stock:</strong> {product.stock} units available</p>
                    {product.isRecommended && (
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', color: 'var(--ion-color-warning-shade)' }}>
                            <IonIcon icon={star} style={{ marginRight: '5px' }} />
                            <span>Recommended Product</span>
                        </div>
                    )}
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="ion-padding">
                        <IonButton expand="block" shape="round" size="large" onClick={handleAddToCart}>
                            {t('add_to_cart')}
                            <IonIcon slot="end" icon={cartOutline} />
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    );
};

export default ProductModal;
