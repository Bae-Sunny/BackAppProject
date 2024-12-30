import React from 'react';
import { IoTrophy } from 'react-icons/io5';
import { FaMedal } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const ProfilePage = () => {
    return (
        <div className="space-y-4 p-4">
            {/* 프로필 정보 */}
            <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <FaUser className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="font-bold text-xl mb-1">BaeSunny</h2>
                <p className="text-gray-600">자산관리 레벨 5</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <div>
                        <p className="text-sm text-gray-600">총 자산</p>
                        <p className="font-bold">₩12,500,000</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">달성 업적</p>
                        <p className="font-bold">8개</p>
                    </div>
                </div>
            </div>

            {/* 저축 목표 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">나의 저축 목표</h3>
                <div className="space-y-3">
                    {/* 여행 자금 */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <p className="font-medium">여행 자금</p>
                        </div>
                        <div className="relative">
                            {/* 퍼센트 텍스트: 바 위에 위치 */}
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600 z-10">
                                80%
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-6">
                                <div className="bg-green-500 h-6 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <p className="text-right text-sm text-gray-600 mt-1">₩2,400,000 / ₩3,000,000</p>
                    </div>

                    {/* 결혼 자금 */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <p className="font-medium">결혼 자금</p>
                        </div>
                        <div className="relative">
                            {/* 퍼센트 텍스트: 바 위에 위치 */}
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600 z-10">
                                30%
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-6">
                                <div className="bg-blue-500 h-6 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <p className="text-right text-sm text-gray-600 mt-1">₩15,000,000 / ₩50,000,000</p>
                    </div>
                </div>
            </div>



            {/* 최근 업적 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">최근 달성 업적</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <IoTrophy className="w-6 h-6 text-yellow-500" />
                        <div>
                            <p className="font-medium">알뜰살뜰</p>
                            <p className="text-sm text-gray-600">한 달 지출 목표 달성</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaMedal className="w-6 h-6 text-blue-500" />
                        <div>
                            <p className="font-medium">저축 고수</p>
                            <p className="text-sm text-gray-600">3개월 연속 저축 달성</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
