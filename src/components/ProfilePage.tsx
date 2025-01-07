import React, { useState } from 'react';
import { User, Trophy, Target, TrendingUp, Star, Shield, Clock, X, ChevronDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// 목표 및 업적 타입 정의
interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    progress: number;
    details: string;
    achievedDate: string;
    nextLevel: string;
    category: string;
}

const ProfilePage = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'progress' | 'date'>('progress');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const achievements: Achievement[] = [
        {
            id: 1,
            title: '여행 자금',
            description: '유럽 여행을 위한 저축',
            icon: Target,
            color: 'green',
            progress: 80,
            details: '유럽 여행을 위해 매월 꾸준히 저축하고 있습니다.',
            achievedDate: '2024년 1월 1일',
            nextLevel: '목표 금액의 90% 달성 시 다음 단계',
            category: '저축'
        },
        {
            id: 2,
            title: '결혼 자금',
            description: '안정적인 결혼 준비',
            icon: Trophy,
            color: 'blue',
            progress: 60,
            details: '미래를 위해 결혼 자금을 차근차근 모으고 있습니다.',
            achievedDate: '2023년 12월 15일',
            nextLevel: '목표 금액의 75% 달성 시 다음 단계',
            category: '목표'
        },
        {
            id: 3,
            title: '투자 포트폴리오',
            description: '장기 투자 전략',
            icon: Star,
            color: 'purple',
            progress: 40,
            details: '안정적이고 장기적인 투자 전략을 수립하고 있습니다.',
            achievedDate: '2023년 11월 30일',
            nextLevel: '수익률 10% 달성 시 다음 레벨',
            category: '투자'
        }
    ];

    const categories = ['all', '저축', '투자', '목표'];

    const getAchievementClasses = (color: string) => ({
        container: color === 'yellow' ? 'bg-yellow-50 hover:bg-yellow-100' :
            color === 'purple' ? 'bg-purple-50 hover:bg-purple-100' :
                color === 'green' ? 'bg-green-50 hover:bg-green-100' :
                    'bg-blue-50 hover:bg-blue-100',
        icon: color === 'yellow' ? 'bg-yellow-100' :
            color === 'purple' ? 'bg-purple-100' :
                color === 'green' ? 'bg-green-100' :
                    'bg-blue-100',
        text: color === 'yellow' ? 'text-yellow-600' :
            color === 'purple' ? 'text-purple-600' :
                color === 'green' ? 'text-green-600' :
                    'text-blue-600',
        progress: color === 'yellow' ? 'bg-yellow-600' :
            color === 'purple' ? 'bg-purple-600' :
                color === 'green' ? 'bg-green-600' :
                    'bg-blue-600'
    });

    const filteredAchievements = achievements
        .filter(achievement =>
            (categoryFilter === 'all' || achievement.category.toLowerCase() === categoryFilter) &&
            (achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                achievement.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === 'progress') return b.progress - a.progress;
            return new Date(b.achievedDate).getTime() - new Date(a.achievedDate).getTime();
        });

    const AchievementModal = () => {
        if (!selectedAchievement) return null;
        const classes = getAchievementClasses(selectedAchievement.color);

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md">
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-3">
                                <div className={`${classes.icon} p-3 rounded-full`}>
                                    <selectedAchievement.icon className={`w-6 h-6 ${classes.text}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{selectedAchievement.title}</h3>
                                    <p className="text-sm text-gray-600">{selectedAchievement.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">달성률</p>
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`${classes.progress} h-2 rounded-full transition-all duration-500 ease-in-out`}
                                            style={{ width: `${selectedAchievement.progress}%` }}
                                        />
                                    </div>
                                    <p className={`text-right mt-1 ${classes.text} font-medium`}>
                                        {selectedAchievement.progress}%
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600">상세 설명</p>
                                <p className="mt-1 text-gray-700">{selectedAchievement.details}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600">달성 일자</p>
                                <p className="mt-1 text-gray-700">{selectedAchievement.achievedDate}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600">다음 단계</p>
                                <p className="mt-1 text-gray-700">{selectedAchievement.nextLevel}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="page-container bg-gray-100 min-h-screen">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 프로필 헤더 (기존 코드 동일) */}
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
                        {/* 통계 카드 (기존 코드 동일) */}
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

                        {/* 목표 현황 섹션 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">나의 목표 달성 현황</h3>
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>

                            {/* 필터링 및 정렬 */}
                            <div className="flex space-x-4 mb-4">
                                <select
                                    className="border rounded-lg px-3 py-2"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? '전체' : category}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="border rounded-lg px-3 py-2"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'progress' | 'date')}
                                >
                                    <option value="progress">달성률순</option>
                                    <option value="date">날짜순</option>
                                </select>
                            </div>

                            {/* 목표 그리드 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredAchievements.map((achievement) => {
                                    const classes = getAchievementClasses(achievement.color);
                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`${classes.container} p-4 rounded-lg transition-colors cursor-pointer`}
                                            onClick={() => setSelectedAchievement(achievement)}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`${classes.icon} p-3 rounded-full`}>
                                                    <achievement.icon className={`w-6 h-6 ${classes.text}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-medium">{achievement.title}</h4>
                                                        <span className={`${classes.text} text-sm font-medium`}>
                                                            {achievement.progress}%
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`${classes.progress} h-2 rounded-full transition-all duration-500 ease-in-out`}
                                                            style={{ width: `${achievement.progress}%` }}
                                                        />
                                                    </div>
                                                    <div className="mt-2 flex items-center text-xs text-gray-500">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {achievement.achievedDate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AchievementModal />
        </div>
    );
};

export default ProfilePage;