import React, { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './components/HomePage';
import AnalysisPage from './components/AnalysisPage';
import ListPage from './components/ListPage';
import ProfilePage from './components/ProfilePage';
import TransactionPage from './components/TransactionPage';
import { Pages } from './types/types';


const App = () => {
    const [currentPage, setCurrentPage] = useState<Pages>('home');

    const pages = {
        home: <HomePage />,
        analysis: <AnalysisPage />,
        list: <ListPage />,
        profile: <ProfilePage />,
        transaction: <TransactionPage />,

    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 overflow-y-auto">{pages[currentPage]}</main>
            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default App;
