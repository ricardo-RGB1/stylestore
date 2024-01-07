'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';


const Summary = () => {

    const searchParams = useSearchParams(); // get the search params from the url
    const items = useCart((state) => state.items); // extract the items from the cart object
    const removeAll = useCart((state) => state.removeAllFromCart); 

    /**
     * React hook that handles the "success" and "cancellation" messages for placing an order.
     * If the 'success' query parameter is present in the URL, it displays a success toast message and removes all items from the cart.
     * If the 'canceled' query parameter is present in the URL, it displays an error toast message.
     * @param {URLSearchParams} searchParams - The URL search parameters object.
     * @param {Function} removeAll - The function to remove all items from the cart.
     */
    useEffect(() => {
        if(searchParams.get('success')){
            toast.success("Your order has been placed successfully!");
            removeAll(); // remove all the items from the cart
        }

        if(searchParams.get('canceled')){
            toast.error("Your order has been canceled");
        }
    }, [searchParams, removeAll]);

 
    // Reduce the items array to get the total price of all the items in the cart: 
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price); // convert the price to a number and add it to the total
    }, 0); // start with a total of 0

  
    /**
     * Handles the checkout process by sending the product IDs to the server and redirecting the user to the checkout page.
     * @returns {Promise<void>} 
     */
    const onCheckout = async (): Promise<void> => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, { // send a POST request to the server
            productIds: items.map((item) => item.id) // send the product ids to the server
        });
        window.location = response.data.url; // redirect the user to the checkout page
    }
        

    return ( 
        <div className='
            mt-16
            rounded-lg
            bg-gray-100
            px-4
            py-6
            sm:p-6
            lg:col-span-5
            lg:mt-0
            lg:p-8
        '>
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='text-base font-medium text-gray-900'>
                      Order total
                    </div>
                    <Currency value={totalPrice}/>
                </div>
            </div>
            <Button disabled={items.length === 0 } onClick={onCheckout} className='w-full mt-6'>
                Checkout
            </Button>
        </div>  
     );
}
 
export default Summary;  