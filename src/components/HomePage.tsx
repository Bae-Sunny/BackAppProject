import React, { useState, useEffect } from 'react';
import {
    Target, TrendingUp, Gift, Award, Wallet, Users, Flame,
    User, Shield, Star, MessageCircle, ChevronRight, Search, X, Trophy, Zap
} from 'lucide-react';

// Types
interface Supporter {
    id: string;
    name: string;
    amount: number;
    message: string;
    date: string;
}

interface Reward {
    id: string;
    title: string;
    description: string;
    requiredStreak: number;
    requiredPoints?: number;
    icon: React.ReactNode;
    isUnlocked: boolean;
}

interface Challenge {
    id: string;
    title: string;
    currentAmount: number;
    targetAmount: number;
    description: string;
    rewardPercent: number;
    isCompleted: boolean;
    requiredStreak?: number;
}

interface Goal {
    id: string;
    friendName?: string;
    title: string;
    currentAmount: number;
    targetAmount: number;
    targetDate: string;
    image: string;
    category: 'car' | 'house' | 'travel' | 'etc';
    description: string;
    supportersCount: number;
    totalSupport: number;
    supporters: Supporter[];
    weeklyProgress: {
        week: string;
        amount: number;
        targetMet: boolean;
    }[];
    savingStreak: number;
    totalRewardPoints: number;
    challenges: Challenge[];
    availableRewards: Reward[];
}

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string, amount: number) => void;
}

interface AchievementModalProps {
    isOpen: boolean;
    onClose: () => void;
    achievement?: {
        title: string;
        description: string;
    };
}

interface MainContentProps {
    goal: Goal;
    onSupportClick: () => void;
}

// Modals
// 리워드 모달
const RewardsModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    rewards: Reward[];
    totalPoints: number;
    savingStreak: number;
}> = ({ isOpen, onClose, rewards, totalPoints, savingStreak }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade">
            <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex items-center">
                        <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                        나의 리워드
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 총 포인트 및 연속 저축 정보 */}
                <div className="bg-blue-50 p-4 rounded-lg flex justify-between">
                    <div>
                        <p className="text-sm text-gray-600">총 적립 포인트</p>
                        <p className="text-xl font-bold text-blue-600">{totalPoints}P</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">연속 저축</p>
                        <p className="text-xl font-bold text-blue-600">{savingStreak}일</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {rewards.map((reward) => (
                        <div
                            key={reward.id}
                            className={`p-4 rounded-lg border flex items-center space-x-4 
                                    ${reward.isUnlocked
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-gray-100 border-gray-200 opacity-50'}`}
                        >
                            <div className={`p-2 rounded-full 
                                    ${reward.isUnlocked
                                    ? 'bg-green-200 text-green-700'
                                    : 'bg-gray-200 text-gray-500'}`}
                            >
                                {reward.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold">{reward.title}</h3>
                                <p className="text-sm text-gray-600">{reward.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {reward.isUnlocked
                                        ? '달성 완료!'
                                        : reward.requiredStreak
                                            ? `${reward.requiredStreak}일 연속 저축 필요`
                                            : reward.requiredPoints
                                                ? `${reward.requiredPoints}P 필요`
                                                : ''}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 챌린지 모달
const ChallengesModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    challenges: Challenge[];
    currentAmount: number;
}> = ({ isOpen, onClose, challenges, currentAmount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade">
            <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex items-center">
                        <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                        진행 중인 챌린지
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    {challenges.map((challenge) => (
                        <div
                            key={challenge.id}
                            className={`p-4 rounded-lg border flex items-center space-x-4 
                                    ${challenge.isCompleted
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-blue-50 border-blue-200'}`}
                        >
                            <div className="flex-1">
                                <h3 className="font-bold">{challenge.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 
                                                           ${challenge.isCompleted
                                                    ? 'bg-green-500'
                                                    : 'bg-blue-500'}`}
                                            style={{
                                                width: `${Math.min((challenge.currentAmount / challenge.targetAmount) * 100, 100)}%`
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium">
                                        {challenge.isCompleted
                                            ? '완료!'
                                            : `${challenge.rewardPercent}%`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 응원하기 모달
const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = () => {
        onSubmit(message, amount);
        setMessage('');
        setAmount(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade">
            <div className="bg-white rounded-lg w-full max-w-md p-6 animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">친구 응원하기</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            응원 메시지
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border rounded-lg resize-none h-24"
                            placeholder="친구에게 응원의 메시지를 보내세요"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            응원 금액
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={amount ? new Intl.NumberFormat('ko-KR').format(amount) : ''}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/[^\d]/g, '');
                                setAmount(Number(rawValue) || 0);
                            }}
                            placeholder="금액을 입력하세요"
                            className="w-full p-2 border rounded text-right"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        응원하기
                    </button>
                </div>
            </div>
        </div>
    );
};

// Achievement Modal
const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose, achievement }) => {
    if (!isOpen || !achievement) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade">
            <div className="bg-white rounded-lg w-full max-w-md p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2">{achievement.title}</h2>
                <p className="text-gray-600 mb-6">{achievement.description}</p>
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

// Main Content Component
const MainContent: React.FC<MainContentProps> = ({ goal, onSupportClick }) => {
    const [isProgressVisible, setIsProgressVisible] = useState(false);

    useEffect(() => {
        setIsProgressVisible(true);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 상단 그라데이션 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{goal.title}</h1>
                        <div className="flex items-center space-x-2">
                            <Shield className="w-5 h-5" />
                            <span>연속 저축 {goal.savingStreak}일째</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm opacity-80">현재 금액</p>
                        <p className="text-3xl font-bold">₩{goal.currentAmount.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* 이미지 섹션 */}
            <div className="p-4">
                <img
                    src={goal.image}
                    alt={goal.title}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                />
            </div>

            <div className="p-6 space-y-6">
                {/* 목표 진행 상황 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">목표 달성률</span>
                        <span className="font-bold text-blue-600">
                            {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{
                                width: isProgressVisible
                                    ? `${(goal.currentAmount / goal.targetAmount) * 100}%`
                                    : '0%'
                            }}
                        />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                        목표 금액까지 ₩{(goal.targetAmount - goal.currentAmount).toLocaleString()} 남음
                    </div>
                </div>

                게임화 섹션
                <div className="grid grid-cols-2 gap-4">
                    <div
                        onClick={() => window.dispatchEvent(new Event('open-rewards-modal'))}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <h3 className="font-bold">나의 리워드</h3>
                            </div>
                            <span className="text-blue-600 font-medium">
                                {goal.totalRewardPoints}P
                            </span>
                        </div>
                    </div>

                    <div
                        onClick={() => window.dispatchEvent(new Event('open-challenges-modal'))}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Zap className="w-6 h-6 text-blue-500" />
                                <h3 className="font-bold">진행 중인 챌린지</h3>
                            </div>
                            <span className="text-blue-600 font-medium">
                                {goal.challenges.filter(c => !c.isCompleted).length}개
                            </span>
                        </div>
                    </div>
                </div>

                {/* 최근 받은 응원 섹션 */}
                <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-bold text-lg">최근 받은 응원</h3>
                            <p className="text-sm text-gray-600">
                                총 {goal.supportersCount}명이 {goal.totalSupport.toLocaleString()}원 응원
                            </p>
                        </div>
                        <button
                            onClick={onSupportClick}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium
                                hover:scale-105 active:scale-95 transform transition-transform"
                        >
                            응원내역
                        </button>
                    </div>
                    <div className="space-y-4">
                        {goal.supporters.slice(0, 3).map((supporter) => (
                            <div
                                key={supporter.id}
                                className="flex items-start space-x-4 p-4 bg-white rounded-lg 
                                    hover:bg-gray-100 transition-colors"
                            >
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium">{supporter.name}</p>
                                        <p className="font-bold text-blue-600">
                                            +{supporter.amount.toLocaleString()}원
                                        </p>
                                    </div>
                                    <p className="text-gray-600 mt-1">{supporter.message}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(supporter.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {goal.supporters.length > 3 && (
                            <div className="text-center">
                                <button
                                    onClick={() => {/* 전체 응원 목록 모달 오픈 */ }}
                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                                        transition-colors flex items-center justify-center w-full"
                                >
                                    <span>전체 응원 보기 ({goal.supportersCount}명)</span>
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// HomePage Component
const HomePage: React.FC = () => {
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [showChallengesModal, setShowChallengesModal] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [showAchievementModal, setShowAchievementModal] = useState(false);
    const [currentTab, setCurrentTab] = useState<'my-goal' | 'friend-goals'>('my-goal');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 모달 이벤트 리스너 추가
    useEffect(() => {
        const openRewardsModal = () => setShowRewardsModal(true);
        const openChallengesModal = () => setShowChallengesModal(true);

        window.addEventListener('open-rewards-modal', openRewardsModal);
        window.addEventListener('open-challenges-modal', openChallengesModal);

        return () => {
            window.removeEventListener('open-rewards-modal', openRewardsModal);
            window.removeEventListener('open-challenges-modal', openChallengesModal);
        };
    }, []);

    // 나의 목표 데이터
    const myGoal: Goal = {
        id: 'dreamcar',
        title: '나의 드림카',
        currentAmount: 2400000,
        targetAmount: 3000000,
        targetDate: '2025-12-31',
        image: '/rb_2149975033.png',
        category: 'car',
        description: '첫 차 마련을 위해 열심히 모으는 중!',
        supportersCount: 3,
        totalSupport: 150000,
        supporters: [
            {
                id: '1',
                name: '김땡땡',
                amount: 50000,
                message: '드림카 꼭 사세요!',
                date: '2024-01-08'
            },
            {
                id: '2',
                name: '이땡땡',
                amount: 30000,
                message: '조금이나마 도움이 되길 바랍니다.',
                date: '2024-01-07'
            },
            {
                id: '3',
                name: '박땡땡',
                amount: 70000,
                message: '목표 달성을 응원합니다!',
                date: '2024-01-06'
            }
        ],
        weeklyProgress: [
            { week: '1주차', amount: 100000, targetMet: true },
            { week: '2주차', amount: 150000, targetMet: true },
            { week: '3주차', amount: 120000, targetMet: false },
            { week: '4주차', amount: 130000, targetMet: true }
        ],
        savingStreak: 30,
        totalRewardPoints: 600,
        challenges: [
            {
                id: 'challenge1',
                title: '첫 30만원 저축',
                description: '한 달 동안 30만원 저축하기',
                currentAmount: 200000,
                targetAmount: 300000,
                rewardPercent: 67,
                isCompleted: false
            },
            {
                id: 'challenge2',
                title: '꾸준한 저축왕',
                description: '3개월 연속 목표 금액 달성하기',
                currentAmount: 450000,
                targetAmount: 450000,
                rewardPercent: 100,
                isCompleted: true,
                requiredStreak: 21
            }
        ],
        availableRewards: [
            {
                id: 'reward1',
                title: '저축 초보 탈출',
                description: '첫 30일 연속 저축 달성',
                requiredStreak: 30,
                icon: <Wallet className="w-5 h-5" />,
                isUnlocked: false
            },
            {
                id: 'reward2',
                title: '저축 마스터',
                description: '3개월 연속 저축 목표 달성',
                requiredStreak: 90,
                requiredPoints: 300,
                icon: <Trophy className="w-5 h-5" />,
                isUnlocked: true
            }
        ]
    };

    // 친구들의 목표 데이터
    const friendGoals = [
        {
            id: 'goal1',
            friendName: '김땡땡',
            title: '첫 차 구매하기',
            currentAmount: 2400000,
            targetAmount: 3000000,
            image: '/rb_2149975033.png',
            category: 'car',
            supportersCount: 15,
            description: '첫 차 마련을 위해 열심히 모으는 중!',
            totalSupport: 750000,
            supporters: [],
            weeklyProgress: [],
            savingStreak: 4,
            totalRewardPoints: 0,
            challenges: [],
            availableRewards: []
        },
        {
            id: 'goal2',
            friendName: '이땡땡',
            title: '유럽 여행 자금',
            currentAmount: 1500000,
            targetAmount: 5000000,
            image: '/rb_2151799389.png',
            category: 'travel',
            supportersCount: 8,
            description: '2년 동안 꿈꿔온 유럽 여행!',
            totalSupport: 400000,
            supporters: [],
            weeklyProgress: [],
            savingStreak: 5,
            totalRewardPoints: 0,
            challenges: [],
            availableRewards: []
        },
        {
            id: 'goal3',
            friendName: '박땡땡',
            title: '결혼 자금 모으기',
            currentAmount: 15000000,
            targetAmount: 30000000,
            image: '/rb_2150591941.png',
            category: 'etc',
            supportersCount: 25,
            description: '내년 결혼을 위한 자금 모으기',
            totalSupport: 2500000,
            supporters: [],
            weeklyProgress: [],
            savingStreak: 30,
            totalRewardPoints: 0,
            challenges: [],
            availableRewards: []
        }
    ];

    const categories = [
        { id: 'all', name: '전체' },
        { id: 'car', name: '자동차' },
        { id: 'house', name: '주택' },
        { id: 'travel', name: '여행' },
        { id: 'etc', name: '기타' }
    ];

    const handleSupport = (message: string, amount: number) => {
        console.log('Support submitted:', { message, amount });
        setShowAchievementModal(true);
    };

    const filteredFriendGoals = friendGoals.filter(goal => {
        const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            goal.friendName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || goal.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto p-4">
                {/* 탭 메뉴 */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setCurrentTab('my-goal')}
                            className={`flex-1 px-4 py-3 font-medium text-center ${currentTab === 'my-goal'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            나의 목표
                        </button>
                        <button
                            onClick={() => setCurrentTab('friend-goals')}
                            className={`flex-1 px-4 py-3 font-medium text-center ${currentTab === 'friend-goals'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            친구들의 목표
                        </button>
                    </div>
                </div>

                {currentTab === 'my-goal' ? (
                    // 나의 목표 컨텐츠
                    <div className="space-y-6">
                        <MainContent
                            goal={myGoal}
                            onSupportClick={() => setShowSupportModal(true)}
                        />

                        {/* Modals */}
                        <RewardsModal
                            isOpen={showRewardsModal}
                            onClose={() => setShowRewardsModal(false)}
                            rewards={myGoal.availableRewards}
                            totalPoints={myGoal.totalRewardPoints}
                            savingStreak={myGoal.savingStreak}
                        />
                        <ChallengesModal
                            isOpen={showChallengesModal}
                            onClose={() => setShowChallengesModal(false)}
                            challenges={myGoal.challenges}
                            currentAmount={myGoal.currentAmount}
                        />
                        <SupportModal
                            isOpen={showSupportModal}
                            onClose={() => setShowSupportModal(false)}
                            onSubmit={handleSupport}
                        />
                        <AchievementModal
                            isOpen={showAchievementModal}
                            onClose={() => setShowAchievementModal(false)}
                            achievement={{
                                title: "축하합니다!",
                                description: "새로운 업적을 달성했습니다!"
                            }}
                        />
                    </div>
                ) : (
                    // 친구들의 목표 컨텐츠
                    <div className="space-y-6">
                        {/* 검색 및 필터 섹션 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="친구 이름이나 목표를 검색해보세요"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                                            ${selectedCategory === category.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 친구 목표 목록 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredFriendGoals.map(goal => (
                                <div
                                    key={goal.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => setShowSupportModal(true)}
                                >
                                    <img
                                        src={goal.image}
                                        alt={goal.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-bold">{goal.title}</h3>
                                            <span className="text-sm text-gray-500">{goal.friendName}</span>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">목표 달성률</span>
                                                <span className="font-medium">
                                                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${(goal.currentAmount / goal.targetAmount) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center space-x-1 text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>{goal.supportersCount}명 참여</span>
                                            </div>
                                            <span className="font-medium">
                                                {goal.currentAmount.toLocaleString()}원
                                            </span>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowSupportModal(true);
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium
                                                    hover:bg-blue-700 transition-colors"
                                            >
                                                응원하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 모달 */}
                        <SupportModal
                            isOpen={showSupportModal}
                            onClose={() => setShowSupportModal(false)}
                            onSubmit={handleSupport}
                        />
                        <AchievementModal
                            isOpen={showAchievementModal}
                            onClose={() => setShowAchievementModal(false)}
                            achievement={{
                                title: "응원해주셔서 감사합니다!",
                                description: "친구의 목표 달성을 위한 응원이 전달되었습니다."
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;