import React, { useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonButton, IonIcon, IonFooter } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { heart, heartOutline, cartOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = useMemo(() => PRODUCTS.find(p => p.id === parseInt(id)), [id]);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUser();
    const { t } = useTranslation();

    if (!product) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start"><IonBackButton defaultHref="/products" /></IonButtons>
                        <IonTitle>Error</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">Product not found</IonContent>
            </IonPage>
        );
    }

    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/products" />
                    </IonButtons>
                    <IonTitle>{product.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={toggleWishlist} style={{ color: isWishlisted ? 'red' : 'gray' }}>
                            <IonIcon icon={isWishlisted ? heart : heartOutline} slot="icon-only" />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonImg src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '350px', objectFit: 'contain', background: '#fff' }} />
                <div className="ion-padding">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{product.name}</h2>
                    <h3 style={{ color: 'var(--ion-color-primary)', fontSize: '1.4rem', fontWeight: 'bold', margin: '10px 0' }}>
                        Rp {product.price.toLocaleString('id-ID')}
                    </h3>
                    <div style={{ background: 'var(--ion-color-step-100)', display: 'inline-block', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem', marginBottom: '15px' }}>
                        {product.category}
                    </div>

                    <p style={{ lineHeight: '1.6', fontSize: '1rem', opacity: 0.8 }}>
                        {product.description}
                    </p>

                    <div style={{ marginTop: '20px' }}>
                        <p><strong>Stock:</strong> {product.stock}</p>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="ion-padding">
                        <IonButton expand="block" shape="round" onClick={() => addToCart(product)}>
                            {t('add_to_cart')}
                            <IonIcon slot="end" icon={cartOutline} />
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};
export default ProductDetail;
