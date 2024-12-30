import React from 'react';
import { Home, TrendingUp, List, User, CreditCard } from 'lucide-react';
import { Pages } from '../types/types';

interface BottomNavigationProps {
    currentPage: Pages;
    setCurrentPage: (page: Pages) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <nav className="bg-white border-t">
            <div className="flex justify-around p-2">
                <button
                    onClick={() => setCurrentPage('transaction')}
                    className={`p-2 flex flex-col items-center ${currentPage === 'transaction' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs">입출금</span>
                </button>
                <button
                    onClick={() => setCurrentPage('analysis')}
                    className={`p-2 flex flex-col items-center ${currentPage === 'analysis' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <TrendingUp className="w-6 h-6" />
                    <span className="text-xs">분석</span>
                </button>
                {/* 홈 버튼을 동그라미로 만들기 */}
                <button
                    onClick={() => setCurrentPage('home')}
                    className={`p-3 flex flex-col items-center justify-center bg-blue-600 text-white rounded-full ${currentPage === 'home' ? 'text-white' : 'text-gray-600'}`}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-xs">홈</span>
                </button>
                <button
                    onClick={() => setCurrentPage('list')}
                    className={`p-2 flex flex-col items-center ${currentPage === 'list' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <List className="w-6 h-6" />
                    <span className="text-xs">목록</span>
                </button>
                <button
                    onClick={() => setCurrentPage('profile')}
                    className={`p-2 flex flex-col items-center ${currentPage === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    <User className="w-6 h-6" />
                    <span className="text-xs">미니홈피</span>
                </button>
            </div>
        </nav>
    );
};

export default BottomNavigation;
