import React, { useState, useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { PRODUCTS, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Products: React.FC = () => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(PRODUCTS.map(p => p.category)));
        return ['all', ...cats];
    }, []);

    const handleOpenDetail = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        if (category !== 'all') {
            result = result.filter(p => p.category === category);
        }

        if (searchText) {
            const lower = searchText.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(lower));
        }

        if (sortBy === 'low_high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'high_low') {
            result.sort((a, b) => b.price - a.price);
        } else {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [category, searchText, sortBy]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t('products')}</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar
                        value={searchText}
                        onIonInput={e => setSearchText(e.detail.value!)}
                        placeholder={t('search_placeholder')}
                    />
                </IonToolbar>
                <IonToolbar>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px 10px' }}>
                        <IonSelect interface="popover" value={category} onIonChange={e => setCategory(e.detail.value)} style={{ flex: 1, maxWidth: '48%', background: 'var(--ion-color-light)', borderRadius: '8px' }}>
                            {categories.map(c => (
                                <IonSelectOption key={c} value={c}>{c === 'all' ? 'All Categories' : c}</IonSelectOption>
                            ))}
                        </IonSelect>

                        <IonSelect interface="popover" value={sortBy} onIonChange={e => setSortBy(e.detail.value)} style={{ flex: 1, maxWidth: '48%', background: 'var(--ion-color-light)', borderRadius: '8px' }}>
                            <IonSelectOption value="name">Name (A-Z)</IonSelectOption>
                            <IonSelectOption value="low_high">Price (Low-High)</IonSelectOption>
                            <IonSelectOption value="high_low">Price (High-Low)</IonSelectOption>
                        </IonSelect>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <IonCol size="6" sizeMd="4" sizeLg="3" key={product.id}>
                                    <ProductCard product={product} onViewDetail={handleOpenDetail} />
                                </IonCol>
                            ))
                        ) : (
                            <IonCol size="12">
                                <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--ion-color-medium)' }}>
                                    <p>No products found.</p>
                                </div>
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>

                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </IonContent>
        </IonPage>
    );
};
export default Products;
