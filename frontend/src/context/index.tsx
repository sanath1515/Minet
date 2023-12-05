import React, { useContext, useEffect, useMemo, useState } from 'react';

export const AppContext = React.createContext<any>({});

interface ContextProviderProps {
    children: React.ReactNode;
}

interface ContextValueProps {
    userId: number;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
    email:string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const useAppContext = () => {
    return useContext<ContextValueProps>(AppContext)
}

const ContextProvider = ({ ...props }: ContextProviderProps) => {
    const [userId, setUserId] = useState<number>(() => {
        const loggedInUserId = localStorage.getItem('userId');
        try {
            return loggedInUserId !== null ? JSON.parse(loggedInUserId) : 0;
        } catch (error) {
            console.error('Error parsing loggedInUserId:', error);
            return 0; 
        }
    });

    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('userId', JSON.stringify(userId));
    }, [userId]);

    const contextValue= useMemo(
        () => ({ userId, setUserId, email, setEmail }),
        [userId, setUserId, email, setEmail]
    );


    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
