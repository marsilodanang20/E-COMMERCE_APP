import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';
import { Product } from '../data/products';
import { CartItem } from './CartContext';

export interface Transaction {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'success' | 'cancelled';
    customer: {
        name: string;
        email: string;
        address: string;
        message: string;
    };
}

interface UserContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;

    history: Transaction[];
    addTransaction: (transaction: Transaction) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [history, setHistory] = useState<Transaction[]>([]);
    const [storage, setStorage] = useState<Storage | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const initStorage = async () => {
            const newStorage = new Storage({
                name: '__autoclinic_db',
                storeName: 'user_data'
            });
            await newStorage.create();
            setStorage(newStorage);

            const storedWishlist = await newStorage.get('wishlist');
            if (storedWishlist) setWishlist(storedWishlist);

            const storedHistory = await newStorage.get('history');
            if (storedHistory) setHistory(storedHistory);

            setIsLoaded(true);
        };
        initStorage();
    }, []);

    useEffect(() => {
        if (storage && isLoaded) {
            storage.set('wishlist', wishlist);
        }
    }, [wishlist, storage, isLoaded]);

    useEffect(() => {
        if (storage && isLoaded) {
            storage.set('history', history);
        }
    }, [history, storage, isLoaded]);

    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const isInWishlist = (id: number) => {
        return wishlist.some(item => item.id === id);
    };

    const addTransaction = (transaction: Transaction) => {
        setHistory(prev => [transaction, ...prev]);
    };

    return (
        <UserContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, history, addTransaction }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
