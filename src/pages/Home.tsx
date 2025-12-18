import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid, IonRow, IonCol, IonRefresher, IonRefresherContent, RefresherEventDetail, useIonRouter } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { PRODUCTS, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useIonRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommendedProducts = PRODUCTS.filter(p => p.isRecommended);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const banners = [
    '../banner/banner1.png',
    '../banner/banner2.png'

  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('app_title')}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder={t('search_placeholder')}
            onClick={() => router.push('/products', 'forward')}
            onIonFocus={() => router.push('/products', 'forward')}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <div className="home-banner" style={{ marginTop: '15px' }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            style={{ width: '92%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            {banners.map((b, i) => (
              <SwiperSlide key={i}>
                <img src={b} alt={`Banner ${i}`} style={{ width: '100%', display: 'block' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="section-title" style={{ padding: '24px 16px 16px' }}>
          <h4>{t('recommended')}</h4>
        </div>

        <IonGrid fixed>
          <IonRow>
            {recommendedProducts.map(product => (
              <IonCol size="6" sizeMd="4" sizeLg="3" key={product.id}>
                <ProductCard product={product} onViewDetail={handleOpenDetail} />
              </IonCol>
            ))}
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

export default Home;
