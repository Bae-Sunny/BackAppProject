import React, { useState, useEffect } from 'react';
import { CreditCard, Crown, Medal, PieChart, ChevronLeft, ChevronRight, DollarSign, TrendingUp } from 'lucide-react';

interface CategoryExpense {
    [category: string]: number;
}

interface DailyExpenses {
    [key: number]: CategoryExpense;
}

interface ExpenseCategory {
    title: string;
    amount: number;
    percentage: number;
    icon: React.ElementType;
    color: string;
}

interface Stat {
    title: string;
    amount: number;
    trend: string;
    icon: React.ElementType;
}

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (amount: number, category: string) => void;
    date: Date;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, onSave, date }) => {
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('식비');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                    {date.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })} 지출 입력
                </h3>

                <input
                    type="text"
                    inputMode="numeric"
                    value={amount ? new Intl.NumberFormat('ko-KR').format(Number(amount)) : ''}
                    onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, '');
                        setAmount(rawValue);
                    }}
                    placeholder="금액을 입력하세요"
                    className="w-full p-2 mb-4 border rounded text-right"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="식비">식비</option>
                    <option value="교통비">교통비</option>
                    <option value="쇼핑">쇼핑</option>
                </select>
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">취소</button>
                    <button onClick={() => {
                        onSave(Number(amount), category);
                        onClose();
                    }} className="px-4 py-2 bg-blue-500 text-white rounded">저장</button>
                </div>
            </div>
        </div>
    );
};

const AnalysisPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [dailyExpenses, setDailyExpenses] = useState<DailyExpenses>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [categoryTotals, setCategoryTotals] = useState<{ [key: string]: number }>({
        '식비': 0,
        '교통비': 0,
        '쇼핑': 0
    });

    const getCategoryIcon = (category: string): React.ElementType => {
        switch (category) {
            case '식비': return Crown;
            case '교통비': return Medal;
            case '쇼핑': return DollarSign;
            default: return Crown;
        }
    };

    const getCategoryColor = (category: string): string => {
        switch (category) {
            case '식비': return 'yellow';
            case '교통비': return 'blue';
            case '쇼핑': return 'green';
            default: return 'gray';
        }
    };

    const calculatePercentages = (totals: { [key: string]: number }) => {
        const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
        return Object.entries(totals).map(([category, amount]) => ({
            title: category,
            amount,
            percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
            icon: getCategoryIcon(category),
            color: getCategoryColor(category)
        }));
    };

    const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
        calculatePercentages(categoryTotals)
    );

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

        const days: (number | null)[] = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= totalDays; i++) {
            days.push(i);
        }
        return days;
    };

    const handleExpenseSave = (amount: number, category: string) => {
        if (selectedDate) {
            const day = selectedDate.getDate();
            setDailyExpenses(prev => {
                const prevDayExpenses = prev[day] || {};
                return {
                    ...prev,
                    [day]: {
                        ...prevDayExpenses,
                        [category]: (prevDayExpenses[category] || 0) + amount
                    }
                };
            });

            setCategoryTotals(prev => {
                const updatedTotals = {
                    ...prev,
                    [category]: (prev[category] || 0) + amount
                };
                setExpenseCategories(calculatePercentages(updatedTotals));
                return updatedTotals;
            });
        }
    };

    const totalExpense = Object.values(dailyExpenses).reduce((sum, dayExpenses) =>
        sum + Object.values(dayExpenses as CategoryExpense).reduce((daySum, expense) => daySum + expense, 0), 0);

    const stats: Stat[] = [
        { title: '이번 달 총 지출', amount: totalExpense, trend: '+12%', icon: TrendingUp },
        { title: '지난 달 대비', amount: 100000, trend: '-5%', icon: PieChart },
    ];

    return (
        <div className="page-container bg-gray-100 min-h-screen">
            <div className="space-y-6 p-4 max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">지출 내역</h2>
                            <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
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
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">카테고리별 지출</h3>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="p-2 border rounded-md"
                                >
                                    <option value="all">모든 카테고리</option>
                                    {expenseCategories.map((category, index) => (
                                        <option key={index} value={category.title}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-4">
                                {expenseCategories
                                    .filter(category => selectedCategory === 'all' || category.title === selectedCategory)
                                    .map((category, index) => (
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
                                        className="h-10 flex items-center justify-center bg-gray-50 font-medium text-sm
                                        text-gray-600"
                                    >
                                        {day}
                                    </div>
                                ))}
                                {renderCalendarDays().map((day, index) => {
                                    const today = new Date();
                                    const isToday = day &&
                                        currentDate.getFullYear() === today.getFullYear() &&
                                        currentDate.getMonth() === today.getMonth() &&
                                        day === today.getDate();

                                    const dailyExpense = day ? dailyExpenses[day] : null;

                                    return (
                                        <div
                                            key={index}
                                            className={`h-20 p-2 bg-white border-t border-l
                                            ${day ? 'hover:bg-blue-50 cursor-pointer' : 'bg-gray-50'}
                                            ${isToday ? 'bg-blue-50' : ''}
                                        `}
                                            onClick={() => {
                                                if (day) {
                                                    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
                                                    setIsModalOpen(true);
                                                }
                                            }}
                                        >
                                            <div className="flex flex-col h-full">
                                                <span className={`inline-block w-6 h-6 text-sm rounded-full
                                                ${isToday ? 'bg-blue-600 text-white font-bold flex items-center justify-center' : ''}
                                            `}>
                                                    {day}
                                                </span>
                                                {dailyExpense && (
                                                    <div className="mt-auto">
                                                        <span className="text-xs font-semibold">
                                                            ₩{Object.values(dailyExpense).reduce((sum, amount) => sum + amount, 0).toLocaleString()}
                                                        </span>
                                                        <div className="flex mt-1">
                                                            {Object.keys(dailyExpense).map((category, i) => {
                                                                const CategoryIcon = getCategoryIcon(category);
                                                                return (
                                                                    <CategoryIcon
                                                                        key={i}
                                                                        className={`w-4 h-4 mr-1 text-${getCategoryColor(category)}-600`}
                                                                    />
                                                                );
                                                            })}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleExpenseSave}
                date={selectedDate || new Date()}
            />
        </div>
    );
};

export default AnalysisPage;