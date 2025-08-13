"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface RouteTransitionProps {
  children: React.ReactNode;
}

const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); 
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default RouteTransition;