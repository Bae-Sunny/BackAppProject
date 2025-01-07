import React, { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './components/HomePage';
import AnalysisPage from './components/AnalysisPage';
// import ListPage from './components/ListPage';
import GiftPage from './components/GiftPage';
import ProfilePage from './components/ProfilePage';
import TransactionPage from './components/TransactionPage';
import { Pages } from './types/types';


const App = () => {
    const [currentPage, setCurrentPage] = useState<Pages>('home');

    const renderPage = (page: Pages) => {
        return <div className="page-container">{pages[page]}</div>;
    };

    const pages = {
        home: <HomePage />,
        analysis: <AnalysisPage />,
        // list: <ListPage />,
        gift: <GiftPage />,
        profile: <ProfilePage />,
        transaction: <TransactionPage />,
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">{renderPage(currentPage)}</main>
            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default App;
