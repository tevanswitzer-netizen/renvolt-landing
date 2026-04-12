import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

/**
 * Provides modal state management to the component tree.
 * Replaces the CustomEvent-based communication pattern with idiomatic React.
 */
export const ModalProvider = ({ children }) => {
    const [privacyOpen, setPrivacyOpen] = useState(false);

    const openPrivacy = useCallback(() => setPrivacyOpen(true), []);
    const closePrivacy = useCallback(() => setPrivacyOpen(false), []);

    return (
        <ModalContext.Provider value={{ privacyOpen, openPrivacy, closePrivacy }}>
            {children}
        </ModalContext.Provider>
    );
};

/**
 * Hook to access modal state.
 * @returns {{ privacyOpen: boolean, openPrivacy: () => void, closePrivacy: () => void }}
 */
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
