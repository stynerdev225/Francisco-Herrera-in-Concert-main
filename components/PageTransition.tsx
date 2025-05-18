"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        // Skip animation on first render
        setIsFirstRender(false);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={isFirstRender ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                }}
                className="flex-1 flex flex-col w-full relative"
                style={{ minHeight: 'calc(100vh - 200px)' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
} 