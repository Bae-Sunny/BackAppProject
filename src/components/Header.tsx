import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
            <h1 className="text-xl font-bold">Bank App Project</h1>
            <Bell className="w-6 h-6 text-gray-600" />
        </header>
    );
};

export default Header;
