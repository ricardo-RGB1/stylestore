'use client';

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useState, useEffect } from "react";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false); 

    useEffect(() => { // Runs when the component is mounted
      setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Don't render anything if not mounted

    return ( 
        <div className="ml-auto flex items-center gap-x-4">
          <Button className="flex items-center rounded-full bg-black px-4 py-2" >
            <ShoppingBag size={20} color='white' />
            <span className="ml-2 text-sm font-medium text-white" >0</span>
          </Button>
        </div>
     );
}
 
export default NavbarActions;