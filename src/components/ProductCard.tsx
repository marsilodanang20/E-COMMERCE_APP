import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonImg, useIonToast } from '@ionic/react';
import { cartOutline, heart, heartOutline } from 'ionicons/icons';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface ProductCardProps {
    product: Product;
    onViewDetail: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUser();
    const { t } = useTranslation();
    const [presentToast] = useIonToast();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await Haptics.impact({ style: ImpactStyle.Light });

        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // UX: Haptic Feedback
        await Haptics.impact({ style: ImpactStyle.Medium });

        addToCart(product);

        // UX: Toast Feedback
        presentToast({
            message: `${product.name} added to cart!`,
            duration: 1500,
            position: 'bottom',
            color: 'success',
            icon: cartOutline
        });
    };

    return (
        <IonCard
            className="product-card"
            onClick={() => onViewDetail(product)}
            style={{
                margin: '5px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
                background: 'var(--ion-card-background)'
            }}
        >
            <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', background: 'var(--ion-color-light)' }}>
                <IonImg
                    src={product.image}
                    alt={product.name}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <button
                    onClick={toggleWishlist}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isWishlisted ? '#ff4d4d' : '#666',
                        zIndex: 10,
                        cursor: 'pointer'
                    }}
                >
                    <IonIcon icon={isWishlisted ? heart : heartOutline} />
                </button>
            </div>

            <IonCardHeader className="ion-no-padding ion-padding-horizontal ion-padding-top" style={{ flex: 1 }}>
                <IonCardSubtitle style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                    color: 'var(--ion-color-medium)'
                }}>
                    {product.category}
                </IonCardSubtitle>
                <IonCardTitle style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.3',
                    fontWeight: '700',
                    color: 'var(--ion-text-color)'
                }}>
                    {product.name}
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="ion-no-padding ion-padding-horizontal ion-padding-bottom">
                <div style={{ margin: '8px 0' }}>
                    <span style={{
                        fontWeight: '800',
                        color: 'var(--ion-color-primary)',
                        fontSize: '1rem'
                    }}>
                        Rp {product.price.toLocaleString('id-ID')}
                    </span>
                </div>

                <IonButton
                    expand="block"
                    fill="solid"
                    size="small"
                    className="ion-margin-top"
                    shape="round"
                    onClick={handleAddToCart}
                    style={{
                        '--box-shadow': 'none',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        height: '36px'
                    }}
                >
                    {t('add_to_cart')}
                </IonButton>
            </IonCardContent>
            <div style={{ height: '10px' }}></div>
        </IonCard>
    );
};

export default ProductCard;
