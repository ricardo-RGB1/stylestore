import { create } from 'zustand';

import { Product } from '@/types';

interface PreviewModalState {
    isOpen: boolean;
    data?: Product;
    onOpen: (data: Product) => void;
    onClose: () => void;
}

