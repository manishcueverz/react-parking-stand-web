import { useState, useEffect } from 'react';
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 550);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return isMobile;
};