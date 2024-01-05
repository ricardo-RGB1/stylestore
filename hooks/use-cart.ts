import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';


import { Product } from '@/types';

interface CartStore {
     items: Product[];
     addToCart: (data: Product) => void;
     removeFromCart: (id: string) => void;
     removeAllFromCart: () => void;
}

/**
 * Custom hook for managing the cart state.
 *
 * @returns {CartStore} The cart store object with methods to add, remove, and clear items from the cart.
 */
const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [], 
        addToCart: (data: Product) => {
            const currentItems = get().items; 
            const existingItem = currentItems.find((item) => item.id === data.id); // 

            if(existingItem) {
                return toast("Item already in cart.");
            }

            set({ items: [...currentItems, data] });
            toast.success("Item added to cart.");
        },
        removeFromCart: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)]});
            toast.success("Item removed from cart.");
        },
        removeAllFromCart: () => set({ items: [] }),
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage) 
    })
)

export default useCart;


// Break down of the custom hook useCart:

// 1. create: This function is imported from Zustand, a lightweight state management library in React. It's used to create a store.

// 2. persist: This is a middleware from Zustand that allows the state to be saved and loaded from a storage. In this case, it's using localStorage.

// 3. CartStore: TypeScript interface that defines the shape of the state in the store. Includes an items array and the methods addToCart, removeFromCart, and removeAllFromCart.

// 4. set and get: These are functions provided by Zustand. set is used to update the state, and get is used to access the current state.

// 5. items: This is an array in the state that holds the items in the cart.

// 6. addToCart: This function takes a Product object as an argument. It first checks if the product already exists in the cart. If it does, it shows a toast message "Item already in cart." and does not add the item. If the item does not exist in the cart, it adds the item to the cart and shows a toast message "Item added to cart.".

// 7. removeFromCart: This function takes a product id as an argument and removes the corresponding item from the cart. It then shows a toast message "Item removed from cart.".

// 8. removeAllFromCart: This function removes all items from the cart.

// 9. name: 'cart-storage': This is the key under which the state is saved in localStorage.

// 10. storage: createJSONStorage(() => localStorage): This is the storage mechanism used by the persist middleware. createJSONStorage is a function that creates a storage that can handle JSON data. It's using localStorage as the underlying storage.

// This hook provides a simple and persistent way to manage a shopping cart's state in a React application.