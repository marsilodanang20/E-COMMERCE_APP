import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption, IonIcon, IonListHeader, IonNote } from '@ionic/react';
import { moonOutline, languageOutline, callOutline, mailOutline, locationOutline, informationCircleOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme } = useTheme();

    const handleThemeChange = (e: any) => {
        toggleTheme(e.detail.checked);
    };

    const changeLanguage = (e: any) => {
        i18n.changeLanguage(e.detail.value);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t('settings')}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList inset={true}>
                    <IonListHeader>
                        <IonLabel>Toggle</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonIcon slot="start" icon={moonOutline} />
                        <IonLabel>{t('theme')} ({isDark ? 'Dark' : 'Light'})</IonLabel>
                        <IonToggle slot="end" checked={isDark} onIonChange={handleThemeChange} />
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={languageOutline} />
                        <IonLabel>{t('language')}</IonLabel>
                        <IonSelect slot="end" value={i18n.language} interface="popover" onIonChange={changeLanguage}>
                            <IonSelectOption value="id">Indonesia</IonSelectOption>
                            <IonSelectOption value="en">English</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonList inset={true}>
                    <IonListHeader>
                        <IonLabel>{t('contact_us')}</IonLabel>
                    </IonListHeader>
                    <IonItem button href="https://wa.me/6285925285114" target="_blank">
                        <IonIcon slot="start" icon={callOutline} />
                        <IonLabel>Whatsapp</IonLabel>
                    </IonItem>
                    <IonItem button href="mailto:autoklinik309@gmail.com">
                        <IonIcon slot="start" icon={mailOutline} />
                        <IonLabel>Email</IonLabel>
                    </IonItem>
                    <IonItem button href="https://maps.app.goo.gl/BrfwEFQAtSpd9rjB9" target="_blank">
                        <IonIcon slot="start" icon={locationOutline} />
                        <IonLabel className="ion-text-wrap">Jl. Gebang - Ciledug No.1, Babakan, Kec. Babakan, Kabupaten Cirebon</IonLabel>
                    </IonItem>
                </IonList>

                <IonList inset={true}>
                    <IonListHeader>
                        <IonLabel>{t('about_app')}</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonIcon slot="start" icon={informationCircleOutline} />
                        <IonLabel>Auto Clinic</IonLabel>
                        <IonNote slot="end">v1.1.0 (Refactored)</IonNote>
                    </IonItem>
                    <div className="ion-padding ion-text-center">
                        <p className="text-caption">Built with Ionic React Capactior</p>
                    </div>
                </IonList>
            </IonContent>
        </IonPage>
    );
};
export default Settings;
