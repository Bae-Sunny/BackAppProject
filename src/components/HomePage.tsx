import React from 'react';
import { Settings, DollarSign } from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="space-y-4 p-4">
            {/* 상단 나의 드림카 목표 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">나의 드림카</h2>
                    <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">현재 금액</p>
                        <p className="text-2xl font-bold text-blue-600">₩500,000</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">목표 금액</p>
                        <p className="text-2xl font-bold text-green-600">₩3,000,000</p>
                    </div>
                </div>
                <div className="mt-4">
                    {/* 목표 이미지 */}
                    <img src="/rb_2149975033.png" alt="나의 드림카" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-600 flex justify-center">예상 달성 날짜</p>
                    <p className="text-lg font-semibold text-blue-600 flex justify-center">2025년 12월 31일</p>
                </div>
                <div className="mt-4">
                    {/* 목표 달성 바 게이지 */}
                    <div className="relative">
                        {/* 퍼센트 텍스트: 바 위에 위치 */}
                        <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">
                            {Math.round((500000 / 3000000) * 100)}%
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                            {/* 바 게이지의 너비는 현재 금액과 목표 금액의 비율로 설정 */}
                            <div className="bg-green-500 h-6 rounded-full" style={{ width: `${(500000 / 3000000) * 100}%` }}></div>
                        </div>
                    </div>
                    {/* 현재 금액 / 목표 금액 표시 아래 */}
                    <p className="text-right text-sm text-gray-600 mt-1">
                        ₩500,000 / ₩3,000,000
                    </p>
                </div>

            </div>

            {/* 저축 내역 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">저축 내역</h3>
                <div className="space-y-4">
                    {/* 입금 내역 1 */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium">월급 입금</p>
                                <p className="text-sm text-gray-500">2024년 12월 25일</p>
                            </div>
                        </div>
                        <p className="font-bold text-green-600">+₩500,000</p>
                    </div>

                    {/* 입금 내역 2 */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium">친구로부터 입금</p>
                                <p className="text-sm text-gray-500">2024년 12월 22일</p>
                            </div>
                        </div>
                        <p className="font-bold text-green-600">+₩200,000</p>
                    </div>

                    {/* 입금 내역 3 */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium">저축용 계좌 이체</p>
                                <p className="text-sm text-gray-500">2024년 12월 18일</p>
                            </div>
                        </div>
                        <p className="font-bold text-green-600">+₩300,000</p>
                    </div>
                </div>
            </div>

            {/* 친구 목표 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">친구 목표</h3>
                <div className="space-y-4">
                    {/* 친구 1 */}
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-3">
                            <FaUser className="w-12 h-12 text-gray-600" />
                            <div>
                                <p className="font-medium">친구 1</p>
                                <p className="text-sm text-gray-600">목표: 구찌백</p>
                            </div>
                        </div>
                        {/* 친구 1 목표 진행 상태 */}
                        <div className="flex flex-col items-end">
                            <div className="flex justify-between mb-1 w-40">
                                <p className="font-medium">가방 구매</p>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-1">
                                {/* 퍼센트 텍스트 */}
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600">
                                    60%
                                </p>
                                <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(1200000 / 2000000) * 100}%` }}></div>
                            </div>
                            <p className="text-right text-sm text-gray-600">₩1,200,000 / ₩2,000,000</p>
                        </div>
                    </div>

                    {/* 친구 2 */}
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-3">
                            <FaUser className="w-12 h-12 text-gray-600" />
                            <div>
                                <p className="font-medium">친구 2</p>
                                <p className="text-sm text-gray-600">목표: 보증금</p>
                            </div>
                        </div>
                        {/* 친구 2 목표 진행 상태 */}
                        <div className="flex flex-col items-end">
                            <div className="flex justify-between mb-1 w-40">
                                <p className="font-medium">전세 보증금</p>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-1">
                                {/* 퍼센트 텍스트 */}
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600">
                                    40%
                                </p>
                                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(2000000 / 5000000) * 100}%` }}></div>
                            </div>
                            <p className="text-right text-sm text-gray-600">₩2,000,000 / ₩5,000,000</p>
                        </div>
                    </div>

                    {/* 친구 3 */}
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-3">
                            <FaUser className="w-12 h-12 text-gray-600" />
                            <div>
                                <p className="font-medium">친구 3</p>
                                <p className="text-sm text-gray-600">목표: 미국 여행</p>
                            </div>
                        </div>
                        {/* 친구 3 목표 진행 상태 */}
                        <div className="flex flex-col items-end">
                            <div className="flex justify-between mb-1 w-40">
                                <p className="font-medium">해외 여행</p>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-1">
                                {/* 퍼센트 텍스트 */}
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600">
                                    25%
                                </p>
                                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: `${(500000 / 2000000) * 100}%` }}></div>
                            </div>
                            <p className="text-right text-sm text-gray-600">₩500,000 / ₩2,000,000</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
