'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Hero() {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed] = useState(50);

    const dynamicTexts = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express'];
    const currentText = dynamicTexts[loopNum % dynamicTexts.length];

    useEffect(() => {
        const handleTyping = () => {
            if (!isDeleting && displayText.length < currentText.length) {
                setDisplayText(currentText.substring(0, displayText.length + 1));
            } else if (isDeleting && displayText.length > 0) {
                setDisplayText(currentText.substring(0, displayText.length - 1));
            } else if (!isDeleting && displayText.length === currentText.length) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayText.length === 0) {
                setIsDeleting(false);
                setLoopNum((prev) => prev + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting]);

    return (
        <div className='relative w-full min-h-screen overflow-hidden z-0'>
            <img
                src='/hero.gif'
                alt='hero'
                className='absolute inset-0 object-cover w-full h-full'
            />
            <div className='relative flex flex-col items-center justify-center h-full text-background px-3'>
                <div className='flex flex-col items-center gap-5 text-5xl sm:text-6xl md:text-7xl font-semibold mb-12'>
                    <p>Hello World!</p>
                    <div className='flex flex-col items-center gap-5 md:flex-row md:gap-0'>
                        <p>I work with</p>
                        <div className='text-yellow-400'>
                            <span>&nbsp;{displayText}</span>
                            <span className='cursor-blink'>|</span>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-10 flex flex-col items-center justify-center'>
                    <div className='relative size-20 border rounded-full flex items-center justify-center'>
                        <div className='ring-pulse absolute' />
                        <ChevronDown className='animate-bounce-big size-7 text-white' />
                    </div>

                    <p className='mt-2 text-xs text-white/70 animate-pulse'>
                        Scroll down
                    </p>
                </div>


            </div>

        </div>
    );
}
