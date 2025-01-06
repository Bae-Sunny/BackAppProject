import React from 'react';
import { Settings, PlusCircle, MinusCircle, CreditCard, DollarSign, TrendingUp, Calendar, Search } from 'lucide-react';

const TransactionPage = () => {
    const transactions = [
        {
            id: 1,
            title: '스타벅스',
            category: '식비',
            amount: -5500,
            time: '오후 3:24',
            icon: CreditCard,
            iconBg: 'purple'
        },
        {
            id: 2,
            title: '월급',
            category: '급여',
            amount: 2800000,
            time: '12월 25일',
            icon: DollarSign,
            iconBg: 'green'
        },
        {
            id: 3,
            title: '교통비',
            category: '교통',
            amount: -1500,
            time: '오전 9:15',
            icon: CreditCard,
            iconBg: 'blue'
        }
    ];

    const stats = [
        { title: '이번 달 지출', amount: 350000, trend: '+12%' },
        { title: '이번 달 수입', amount: 2800000, trend: '+5%' }
    ];

    return (
        <div className="page-container">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 flex items-center justify-between border-b">
                        <h2 className="text-xl font-bold">거래 내역</h2>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Settings className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 예산 현황 카드 */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">12월 예산 현황</h3>
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-blue-100">총 예산</p>
                                    <p className="text-3xl font-bold">₩1,200,000</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-100">남은 금액</p>
                                    <p className="text-3xl font-bold">₩850,000</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-blue-400 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full" style={{ width: '70%' }} />
                                </div>
                                <p className="text-sm text-blue-100 mt-2">70% 남음</p>
                            </div>
                        </div>

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
                                            <TrendingUp className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        전월 대비 {stat.trend}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* 입출금 버튼 */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 bg-green-100 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-200 transition-colors">
                                <PlusCircle className="w-6 h-6 text-green-600" />
                                <span className="font-medium">입금하기</span>
                            </button>
                            <button className="p-4 bg-red-100 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-200 transition-colors">
                                <MinusCircle className="w-6 h-6 text-red-600" />
                                <span className="font-medium">출금하기</span>
                            </button>
                        </div>

                        {/* 거래내역 검색 */}
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            <input
                                type="text"
                                placeholder="거래내역 검색"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* 거래내역 목록 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">최근 거래내역</h3>
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    전체보기
                                </button>
                            </div>
                            <div className="space-y-3">
                                {transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className={`bg-${transaction.iconBg}-100 p-2 rounded-full`}>
                                                    <transaction.icon className={`w-5 h-5 text-${transaction.iconBg}-600`} />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{transaction.title}</p>
                                                    <p className="text-sm text-gray-500">{transaction.time}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}원
                                                </p>
                                                <p className="text-sm text-gray-500">{transaction.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;