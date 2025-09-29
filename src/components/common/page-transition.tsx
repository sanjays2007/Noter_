"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageLoader } from "./page-loader";

interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTransitioning) {
            timer = setTimeout(() => setIsTransitioning(false), 500); // Should match loader animation
        }
        return () => clearTimeout(timer);
    }, [isTransitioning]);


    useEffect(() => {
        setIsTransitioning(true);
    }, [pathname]);

    return (
        <>
            {isTransitioning && <PageLoader />}
            {children}
        </>
    );
}
