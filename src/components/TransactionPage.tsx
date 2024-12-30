import React from 'react';
import { Settings, PlusCircle, MinusCircle, CreditCard, DollarSign } from 'lucide-react';

const TransactionPage = () => {
    return (
        <div className="space-y-4 p-4">
            {/* 상단 예산 현황 */}
            <div className="bg-blue-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">12월 예산 현황</h2>
                    <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <div className="mt-2 flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-600">총 예산</p>
                        <p className="text-2xl font-bold text-blue-600">₩1,200,000</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">남은 금액</p>
                        <p className="text-xl font-bold text-green-600">₩850,000</p>
                    </div>
                </div>
            </div>

            {/* 입출금 버튼 */}
            <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-green-100 rounded-lg flex items-center justify-center space-x-2">
                    <PlusCircle className="w-6 h-6 text-green-600" />
                    <span className="font-medium">입금하기</span>
                </button>
                <button className="p-4 bg-red-100 rounded-lg flex items-center justify-center space-x-2">
                    <MinusCircle className="w-6 h-6 text-red-600" />
                    <span className="font-medium">출금하기</span>
                </button>
            </div>

            {/* 최근 거래내역 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">최근 거래내역</h3>
                    <button className="text-sm text-blue-600">전체보기</button>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium">스타벅스</p>
                                <p className="text-sm text-gray-500">오후 3:24</p>
                            </div>
                        </div>
                        <p className="font-bold text-red-600">-₩5,500</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium">월급</p>
                                <p className="text-sm text-gray-500">12월 25일</p>
                            </div>
                        </div>
                        <p className="font-bold text-green-600">+₩2,800,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
