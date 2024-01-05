import { create } from 'zustand';

import { Product } from '@/types';

interface PreviewModalStore {
    isOpen: boolean;
    data?: Product;
    onOpen: (data: Product) => void;
    onClose: () => void;
}

/**
 * Custom hook for managing the preview modal state.
 *
 * @param set - A function used to update the state.
 * @returns An object containing the state and functions to open and close the modal.
 */
const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({ isOpen: true, data }), // set({ isOpen: true, data: data })
    onClose: () => set({ isOpen: false}),
}));

export default usePreviewModal;

// The usePreviewModal hook creates a Zustand store that contains several properties and functions:
// The onOpen property is a function that takes an argument data. When this function is called, it updates the state of the PreviewModalStore object using the set function. Specifically, it sets the isOpen property to true (indicating that the modal should be open), and it updates the data property with the data argument passed into the onOpen function.

// This function is typically used to open the preview modal and populate it with specific data. The data argument could be any data that you want to display or use when the modal is open.