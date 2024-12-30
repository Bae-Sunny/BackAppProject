import React from 'react';
import { ChevronRight, Trophy, Star } from 'lucide-react';

const ListPage = () => {
    return (
        <div className="space-y-4 p-4">
            {/* 상품 추천 */}
            <div className="bg-white rounded-lg p-4 shadow-sm" >
                <h3 className="font-bold mb-4">맞춤 금융상품 추천</h3>
                <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">청년희망적금</p>
                                <p className="text-sm text-gray-600">연 4.5% 금리</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">급여우대통장</p>
                                <p className="text-sm text-gray-600">수수료 면제</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div >

            {/* 업적 현황 */}
            <div className="bg-white rounded-lg p-4 shadow-sm" >
                <h3 className="font-bold mb-4">나의 업적</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg text-center">
                        <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="font-medium">절약왕</p>
                        <p className="text-sm text-gray-600">3개월 연속 목표 달성</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-medium">투자고수</p>
                        <p className="text-sm text-gray-600">수익률 10% 달성</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ListPage;
