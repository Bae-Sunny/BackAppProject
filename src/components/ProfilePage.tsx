import React from 'react';
import { User, Trophy, Target, TrendingUp, Award, Crown, Star, Clock } from 'lucide-react';

const ProfilePage = () => {
    const savingGoals = [
        {
            title: '여행 자금',
            current: 2400000,
            target: 3000000,
            color: 'green',
            deadline: '2024년 12월',
            icon: Target
        },
        {
            title: '결혼 자금',
            current: 15000000,
            target: 50000000,
            color: 'blue',
            deadline: '2025년 6월',
            icon: Crown
        }
    ];

    const achievements = [
        {
            title: '알뜰살뜰',
            description: '한 달 지출 목표 달성',
            date: '2024년 1월 1일',
            icon: Trophy,
            color: 'yellow'
        },
        {
            title: '저축 고수',
            description: '3개월 연속 저축 달성',
            date: '2023년 12월 25일',
            icon: Award,
            color: 'blue'
        },
        {
            title: '투자의 시작',
            description: '첫 투자 상품 가입',
            date: '2023년 12월 20일',
            icon: Star,
            color: 'purple'
        }
    ];

    const calculateProgress = (current: number, target: number) => {
        return Math.round((current / target) * 100);
    };

    return (
        <div className="page-container">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 프로필 헤더 */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-white rounded-full p-2 mb-4">
                                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-12 h-12 text-blue-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">BaeSunny</h2>
                            <p className="text-blue-100">자산관리 레벨 5</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 통계 카드 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: '총 자산', amount: '₩12,500,000', icon: TrendingUp },
                                { title: '달성 목표', amount: '8개', icon: Trophy },
                                { title: '저축 달성률', amount: '75%', icon: Target }
                            ].map((stat, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-600">{stat.title}</p>
                                            <p className="text-xl font-bold text-blue-600">{stat.amount}</p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <stat.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 저축 목표 */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">나의 저축 목표</h3>
                            <div className="space-y-4">
                                {savingGoals.map((goal, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className={`bg-${goal.color}-100 p-3 rounded-full`}>
                                                <goal.icon className={`w-6 h-6 text-${goal.color}-600`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div>
                                                        <h4 className="font-medium">{goal.title}</h4>
                                                        <p className="text-sm text-gray-600">목표일: {goal.deadline}</p>
                                                    </div>
                                                    <span className={`text-${goal.color}-600 font-medium`}>
                                                        {calculateProgress(goal.current, goal.target)}%
                                                    </span>
                                                </div>
                                                <div className="relative">
                                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                                        <div
                                                            className={`bg-${goal.color}-500 h-4 rounded-full transition-all duration-500`}
                                                            style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="text-right text-sm text-gray-600 mt-2">
                                                    ₩{goal.current.toLocaleString()} / ₩{goal.target.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 최근 달성 목표 */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">최근 달성 목표</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className={`bg-${achievement.color}-50 p-4 rounded-lg hover:bg-${achievement.color}-100 transition-colors`}>
                                        <div className="flex flex-col items-center text-center">
                                            <div className={`bg-${achievement.color}-100 p-3 rounded-full mb-3`}>
                                                <achievement.icon className={`w-6 h-6 text-${achievement.color}-600`} />
                                            </div>
                                            <h4 className="font-medium mb-1">{achievement.title}</h4>
                                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {achievement.date}
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

export default ProfilePage;