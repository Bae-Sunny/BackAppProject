import React, { useState, useRef, useEffect } from 'react';
import {
    Crown, Medal, PieChart, ChevronLeft, ChevronRight,
    DollarSign, TrendingUp, Plus, Edit, Trash2
} from 'lucide-react';

interface Expense {
    id?: string;
    date: Date;
    category: string;
    amount: number;
    description?: string;
}

const AnalysisPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const amountInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    const categories = ['식비', '교통비', '쇼핑', '저축'];

    // 월별 카테고리별 총 지출 계산
    const calculateCategoryExpenses = () => {
        const categoryMap = expenses.reduce((acc, expense) => {
            if (expense.date.getMonth() === currentDate.getMonth() &&
                expense.date.getFullYear() === currentDate.getFullYear()) {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryMap).map(([category, amount]) => ({
            title: category,
            amount,
            percentage: Math.min(Math.round((amount / getTotalMonthlyExpense()) * 100), 100),
            icon: getIconForCategory(category),
            color: getColorForCategory(category)
        }));
    };

    const getTotalMonthlyExpense = () => {
        return expenses
            .filter(expense =>
                expense.date.getMonth() === currentDate.getMonth() &&
                expense.date.getFullYear() === currentDate.getFullYear()
            )
            .reduce((sum, expense) => sum + expense.amount, 0);
    };

    const getIconForCategory = (category: string) => {
        const categoryIcons: Record<string, any> = {
            '식비': Crown,
            '교통비': Medal,
            '쇼핑': DollarSign,
            '저축': TrendingUp
        };
        return categoryIcons[category] || DollarSign;
    };

    const getColorForCategory = (category: string) => {
        const categoryColors: Record<string, string> = {
            '식비': 'yellow',
            '교통비': 'blue',
            '쇼핑': 'green',
            '저축': 'purple'
        };
        return categoryColors[category] || 'gray';
    };

    const handleMonthChange = (direction: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + direction);
            return newDate;
        });
    };

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const totalDays = lastDay.getDate();

        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= totalDays; i++) {
            days.push(i);
        }
        return days;
    };

    const openExpenseModal = (day: number | null) => {
        if (!day) return;

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedExpense({
            date,
            category: '식비',
            amount: 0
        });
        setIsModalOpen(true);
    };

    const handleExpenseSave = () => {
        if (!selectedExpense) return;

        const expenseToSave: Expense = {
            ...selectedExpense,
            amount: selectedExpense.amount ? Number(String(selectedExpense.amount).replace(/[^\d]/g, '')) : 0,
            id: Date.now().toString() // 새로운 고유 ID 생성
        };

        setExpenses(prevExpenses => [...prevExpenses, expenseToSave]);
        setIsModalOpen(false);
        setSelectedExpense(null);
    };

    const handleExpenseDelete = (expenseToDelete: Expense) => {
        setExpenses(expenses.filter(exp =>
            !(exp.date.getTime() === expenseToDelete.date.getTime() &&
                exp.category === expenseToDelete.category)
        ));
        setIsModalOpen(false);
    };

    const getExpensesForDay = (day: number) => {
        return expenses.filter(expense =>
            expense.date.getFullYear() === currentDate.getFullYear() &&
            expense.date.getMonth() === currentDate.getMonth() &&
            expense.date.getDate() === day
        );
    };

    const [currentAmount, setCurrentAmount] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const ExpenseModal = () => {
        if (!isModalOpen || !selectedExpense) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedExpense.date.toLocaleDateString()} 지출 {selectedExpense.id ? '수정' : '추가'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">카테고리</label>
                            <select
                                value={selectedExpense.category}
                                onChange={(e) => setSelectedExpense({
                                    ...selectedExpense,
                                    category: e.target.value
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">금액</label>
                            {/* 금액 입력 */}
                            <input
                                type="text"
                                value={currentAmount}
                                placeholder="금액을 입력하세요"
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/[^\d]/g, '');
                                    setCurrentAmount(inputValue);
                                }}
                                onBlur={() => {
                                    // 포커스를 잃을 때 expense에 추가
                                    if (selectedExpense && currentAmount) {
                                        setSelectedExpense(prev => prev ? ({
                                            ...prev,
                                            amount: Number(currentAmount)
                                        }) : null);
                                        setCurrentAmount(''); // 입력 초기화
                                    }
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />

                            {/* 설명 입력 */}
                            <textarea
                                value={currentDescription}
                                placeholder="설명을 입력하세요 (선택)"
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setCurrentDescription(inputValue);
                                }}
                                onBlur={() => {
                                    // 포커스를 잃을 때 expense에 추가
                                    if (selectedExpense && currentDescription) {
                                        setSelectedExpense(prev => prev ? ({
                                            ...prev,
                                            description: currentDescription
                                        }) : null);
                                        setCurrentDescription(''); // 입력 초기화
                                    }
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 rounded-md"
                        >
                            취소
                        </button>
                        <div className="space-x-2">
                            {selectedExpense.id && (
                                <button
                                    onClick={() => handleExpenseDelete(selectedExpense)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    삭제
                                </button>
                            )}
                            <button
                                onClick={handleExpenseSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const stats = [
        {
            title: '이번 달 총 지출',
            amount: getTotalMonthlyExpense(),
            trend: '+12%',
            icon: TrendingUp
        },
        {
            title: '지난 달 대비',
            amount: 100000,
            trend: '-5%',
            icon: PieChart
        },
    ];

    return (
        <div className="page-container">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-xl font-bold">지출 분석</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 통계 카드 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-600">{stat.title}</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                ₩{stat.amount.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <stat.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        전월 대비 {stat.trend}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* 소비 랭킹 */}
                        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                            <h3 className="font-bold text-lg">카테고리별 지출</h3>
                            <div className="space-y-4">
                                {calculateCategoryExpenses().map((category, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className={`bg-${category.color}-100 p-2 rounded-full`}>
                                                <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-2">
                                                    <p className="font-medium">{category.title}</p>
                                                    <p className="font-bold">₩{category.amount.toLocaleString()}</p>
                                                </div>
                                                <div className="relative">
                                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                                        <div
                                                            className={`bg-${category.color}-500 h-4 rounded-full transition-all duration-500 ease-in-out`}
                                                            style={{ width: `${category.percentage}%` }}
                                                        >
                                                            <span className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-bold text-white">
                                                                {category.percentage}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 캘린더 */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => handleMonthChange(-1)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <h3 className="font-bold text-lg">
                                    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                                </h3>
                                <button
                                    onClick={() => handleMonthChange(1)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                                {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                                    <div
                                        key={index}
                                        className="h-10 flex items-center justify-center bg-gray-50 font-medium text-sm text-gray-600"
                                    >
                                        {day}
                                    </div>
                                ))}
                                {renderCalendarDays().map((day, index) => {
                                    const today = new Date();
                                    const isToday =
                                        day &&
                                        currentDate.getFullYear() === today.getFullYear() &&
                                        currentDate.getMonth() === today.getMonth() &&
                                        day === today.getDate();

                                    const dayExpenses = day ? getExpensesForDay(day) : [];

                                    return (
                                        <div
                                            key={index}
                                            className={`h-24 p-2 bg-white border-t border-l relative
                                            ${day ? 'hover:bg-blue-50 cursor-pointer' : 'bg-gray-50'}
                                            ${isToday ? 'bg-blue-50' : ''}
                                        `}
                                            onClick={() => openExpenseModal(day)}
                                        >
                                            <span
                                                className={`absolute top-2 left-2 inline-block w-6 h-6 text-sm rounded-full
                                                ${isToday ? 'bg-blue-600 text-white font-bold flex itemscenter' : ''}
                                            `}>
                                                {day}
                                            </span>
                                            {dayExpenses.length > 0 && (
                                                <div className="absolute bottom-2 right-2 flex space-x-1">
                                                    {dayExpenses.map((expense, idx) => {
                                                        const Icon = getIconForCategory(expense.category);
                                                        const color = getColorForCategory(expense.category);
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className={`w-4 h-4 rounded-full bg-${color}-500 flex items-center justify-center`}
                                                                title={`${expense.category}: ₩${expense.amount.toLocaleString()}`}
                                                            >
                                                                <Icon className="w-3 h-3 text-white" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 지출 입력/수정 모달 */}
            <ExpenseModal />
        </div>
    );
};

export default AnalysisPage;