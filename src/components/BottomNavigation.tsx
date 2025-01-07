import React, { useState, useEffect } from 'react';
import { Home, List, User, CreditCard, ArrowRightLeft, Activity, Gift } from 'lucide-react';
import { Pages } from '../types/types';

interface BottomNavigationProps {
    currentPage: Pages;
    setCurrentPage: (page: Pages) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPage, setCurrentPage }) => {
    const [isVisible, setIsVisible] = useState(true);

    const navItems = [
        { id: 'transaction', label: '입출금', icon: ArrowRightLeft },
        { id: 'analysis', label: '지출', icon: CreditCard },
        { id: 'home', label: '홈', icon: Home },
        // { id: 'list', label: '목록', icon: List },
        { id: 'gift', label: '금융', icon: Gift },
        { id: 'profile', label: '마이', icon: User }
    ];

    useEffect(() => {
        const pageContainer = document.querySelector('.page-container');
        let prevScroll = pageContainer?.scrollTop || 0;
        let scrollTimer: NodeJS.Timeout;

        const handleScroll = () => {
            const currentScroll = pageContainer?.scrollTop || 0;
            const scrollingUp = prevScroll > currentScroll;

            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                setIsVisible(scrollingUp || currentScroll < 10);
            }, 100);

            prevScroll = currentScroll;
        };

        pageContainer?.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            pageContainer?.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer);
        };
    }, []);

    return (
        <nav
            role="navigation"
            aria-label="메인 네비게이션"
            className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg h-16 transition-transform duration-300 
                ${isVisible ? 'translate-y-0' : 'translate-y-full'}
                dark:bg-gray-800 dark:border-gray-700`}
        >
            <div className="max-w-4xl mx-auto h-full">
                <div className="flex justify-around items-center h-full px-2">
                    {navItems.map((item) => (
                        item.id === 'home' ? (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id as Pages)}
                                aria-label={item.label}
                                aria-current={currentPage === item.id ? 'page' : undefined}
                                className="relative -mt-4 p-4 rounded-full bg-blue-600 shadow-lg min-w-[60px] min-h-[60px]
                                    hover:bg-blue-700 active:bg-blue-800 transition-colors
                                    dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                <div className="flex flex-col items-center">
                                    <item.icon className="w-6 h-6 text-white" />
                                    <span className="text-xs font-medium text-white mt-1">{item.label}</span>
                                </div>
                            </button>
                        ) : (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id as Pages)}
                                aria-label={item.label}
                                aria-current={currentPage === item.id ? 'page' : undefined}
                                className={`
                                    p-3 rounded-lg flex flex-col items-center min-w-[56px] min-h-[56px]
                                    transition-colors hover:bg-gray-100 active:bg-gray-200
                                    dark:hover:bg-gray-700 dark:active:bg-gray-600
                                    ${currentPage === item.id ?
                                        'text-blue-600 dark:text-blue-400' :
                                        'text-gray-600 dark:text-gray-400'}
                                `}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs mt-1">{item.label}</span>
                                {currentPage === item.id && (
                                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
                                )}
                            </button>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default BottomNavigation;