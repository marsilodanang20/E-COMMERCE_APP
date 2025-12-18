import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: (enable: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 1. Initial State from System Preference to avoid flash
    const [isDark, setIsDark] = useState(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [storage, setStorage] = useState<Storage | null>(null);

    // 2. Initialize Storage and Load Preference
    useEffect(() => {
        const initStorage = async () => {
            const newStorage = new Storage({
                name: '__autoclinic_theme',
                storeName: 'settings'
            });
            await newStorage.create();
            setStorage(newStorage);

            const storedTheme = await newStorage.get('dark_mode');
            if (storedTheme !== null) {
                setIsDark(storedTheme);
            }
        };
        initStorage();
    }, []);

    // 3. Effect to Apply Theme to Body
    useEffect(() => {
        document.body.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggleTheme = (enable: boolean) => {
        setIsDark(enable);
        if (storage) {
            storage.set('dark_mode', enable);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
