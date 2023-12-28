'use client';

import { useState, useEffect } from "react";

/**
 * A formatter object that formats numbers as currency in USD.
 */
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })  

interface CurrencyProps {
    value?: string | number; 
}

const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    // This is a hack to prevent hydration mismatch errors from Next.js when using the formatter object.  
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return ( 
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
     );
}
 
export default Currency;