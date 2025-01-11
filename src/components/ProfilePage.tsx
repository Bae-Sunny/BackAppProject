import React, { useState, useEffect } from 'react';
import {
    User, Shield, Trophy, Zap, PlusCircle, Wallet, Goal, X,
    Gift, Sparkles, TrendingUp, Target, Award
} from 'lucide-react';

// 인터페이스 정의
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
    rewardPoints: number;
    isCompleted: boolean;
    requiredStreak?: number;
}

interface Goal {
    id: string;
    title: string;
    currentAmount: number;
    targetAmount: number;
    targetDate: string;
}

interface Milestone {
    id: string;
    title: string;
    description: string;
    targetAmount: number;
    rewardPoints: number;
    isAchieved: boolean;
    icon: React.ReactNode;
}

interface SavingTip {
    id: string;
    tip: string;
    source: string;
}

const MyProfilePage: React.FC = () => {
    // 상태 관리
    const [showAddGoalModal, setShowAddGoalModal] = useState(false);
    const [showUpdateAmountModal, setShowUpdateAmountModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);
    const [savingStreak, setSavingStreak] = useState(0);
    const [lastSavingDate, setLastSavingDate] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'rewards' | 'challenges' | 'milestones'>('rewards');

    // 초기 데이터 정의
    const savingTips: SavingTip[] = [
        {
            id: 'tip1',
            tip: '매일 카페에서 커피를 사는 대신 집에서 내려 마시면 한 달에 9만원을 절약할 수 있어요.',
            source: '생활경제연구소'
        },
        {
            id: 'tip2',
            tip: '급여가 들어올 때 자동이체로 먼저 저축하세요. 본인도 모르게 저축이 쌓입니다.',
            source: '금융전문가 조언'
        }
    ];

    const [currentTip, setCurrentTip] = useState<SavingTip>(savingTips[0]);

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: 'goal1',
            title: '첫 집 마련',
            currentAmount: 12000000,
            targetAmount: 50000000,
            targetDate: '2030-12-31',
        },
    ]);

    const [challenges, setChallenges] = useState<Challenge[]>([
        {
            id: 'challenge1',
            title: '첫 30만원 저축',
            description: '한 달 동안 30만원 저축하기',
            currentAmount: 200000,
            targetAmount: 300000,
            rewardPoints: 50,
            isCompleted: false
        },
        {
            id: 'challenge2',
            title: '꾸준한 저축왕',
            description: '3개월 연속 목표 금액 달성하기',
            currentAmount: 450000,
            targetAmount: 450000,
            rewardPoints: 100,
            isCompleted: true,
            requiredStreak: 21
        }
    ]);

    const [availableRewards, setAvailableRewards] = useState<Reward[]>([
        {
            id: 'reward1',
            title: '저축 초보 탈출',
            description: '첫 30일 연속 저축 달성',
            requiredStreak: 30,
            icon: <Wallet className="w-5 h-5" />,
            isUnlocked: false,
        },
        {
            id: 'reward2',
            title: '저축 마스터',
            description: '3개월 연속 저축 목표 달성',
            requiredStreak: 90,
            requiredPoints: 300,
            icon: <Trophy className="w-5 h-5" />,
            isUnlocked: true
        },
    ]);

    const milestones: Milestone[] = [
        {
            id: 'milestone1',
            title: '첫 백만원 달성',
            description: '저축 여정의 시작!',
            targetAmount: 1000000,
            rewardPoints: 100,
            isAchieved: false,
            icon: <Target className="w-5 h-5" />
        },
        {
            id: 'milestone2',
            title: '천만원 클럽',
            description: '작지만 큰 성취의 순간',
            targetAmount: 10000000,
            rewardPoints: 500,
            isAchieved: false,
            icon: <Award className="w-5 h-5" />
        }
    ];

    // 연속된 날짜인지 확인하는 헬퍼 함수
    const isConsecutiveDay = (prevDate: string, currentDate: string) => {
        const prev = new Date(prevDate);
        const current = new Date(currentDate);
        const dayDifference = (current.getTime() - prev.getTime()) / (1000 * 3600 * 24);
        return dayDifference === 1;
    };

    // 레벨 계산 로직
    useEffect(() => {
        const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
        const newLevel = Math.floor(totalSaved / 1000000) + 1; // 100만원당 1레벨
        if (newLevel > currentLevel) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        setCurrentLevel(newLevel);
    }, [goals, currentLevel]);

    // 랜덤 팁 선택
    useEffect(() => {
        const getRandomTip = () => {
            const newIndex = Math.floor(Math.random() * savingTips.length);
            return savingTips[newIndex];
        };

        setCurrentTip(getRandomTip());
    }, []);

    // 목표 금액 추가 핸들러
    const handleUpdateGoalAmount = (amount: number) => {
        if (selectedGoal) {
            const today = new Date().toISOString().split('T')[0];

            // 목표 업데이트
            const updatedGoals = goals.map(goal =>
                goal.id === selectedGoal.id
                    ? { ...goal, currentAmount: goal.currentAmount + amount }
                    : goal
            );
            setGoals(updatedGoals);

            // 포인트 계산
            const pointsEarned = Math.floor(amount / 10000);
            setTotalPoints(prev => prev + pointsEarned);

            // 연속 저축 트래킹
            if (!lastSavingDate || isConsecutiveDay(lastSavingDate, today)) {
                setSavingStreak(prev => prev + 1);
                setLastSavingDate(today);
            } else {
                setSavingStreak(1);
                setLastSavingDate(today);
            }

            // 챌린지 자동 완료 로직
            const updatedChallenges = challenges.map(challenge => {
                if (!challenge.isCompleted &&
                    selectedGoal.currentAmount + amount >= challenge.targetAmount) {
                    return { ...challenge, isCompleted: true };
                }
                return challenge;
            });
            setChallenges(updatedChallenges);

            // 리워드 자동 해금 로직
            const updatedRewards = availableRewards.map(reward => {
                if (!reward.isUnlocked &&
                    ((reward.requiredStreak && savingStreak >= reward.requiredStreak) ||
                        (reward.requiredPoints && totalPoints >= reward.requiredPoints))) {
                    return { ...reward, isUnlocked: true };
                }
                return reward;
            });
            setAvailableRewards(updatedRewards);

            setShowUpdateAmountModal(false);
            setSelectedGoal(null);
        }
    };

    // 목표 추가 핸들러
    const handleAddGoal = (goal: {
        title: string;
        currentAmount: number;
        targetAmount: number;
        targetDate: string;
    }) => {
        const newGoalData = {
            ...goal,
            id: `goal${goals.length + 1}`,
        };
        setGoals((prev) => [...prev, newGoalData]);
        setShowAddGoalModal(false);
    };

    // 모달 컴포넌트들
    const UpdateAmountModal: React.FC<{
        isOpen: boolean;
        onClose: () => void;
        goal: Goal | null;
        onUpdateAmount: (amount: number) => void;
    }> = ({ isOpen, onClose, goal, onUpdateAmount }) => {
        const [amount, setAmount] = useState('');

        if (!isOpen || !goal) return null;

        const handleSubmit = () => {
            const numAmount = Number(amount.replace(/[^\d]/g, ''));
            if (!isNaN(numAmount) && numAmount > 0) {
                onUpdateAmount(numAmount);
                setAmount('');
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">{goal.title} 금액 추가</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">추가할 금액</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={amount ? new Intl.NumberFormat('ko-KR').format(Number(amount)) : ''}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/[^\d]/g, '');
                                setAmount(rawValue);
                            }}
                            placeholder="금액을 입력하세요"
                            className="w-full p-2 border rounded text-right"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            추가하기
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const AddGoalModal: React.FC<{
        isOpen: boolean;
        onClose: () => void;
        onAddGoal: (goal: {
            title: string;
            currentAmount: number;
            targetAmount: number;
            targetDate: string;
        }) => void;
    }> = ({ isOpen, onClose, onAddGoal }) => {
        const [title, setTitle] = useState('');
        const [amount, setAmount] = useState('');
        const [targetDate, setTargetDate] = useState('');

        useEffect(() => {
            if (!isOpen) {
                setTitle('');
                setAmount('');
                setTargetDate('');
            }
        }, [isOpen]);

        if (!isOpen) return null;

        const handleSubmit = () => {
            const targetAmount = Number(amount.replace(/[^\d]/g, ''));
            if (title && targetAmount > 0) {
                onAddGoal({
                    title,
                    currentAmount: 0,
                    targetAmount,
                    targetDate
                });
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">목표 추가</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">목표 제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded w-full"
                            placeholder="목표 제목을 입력하세요"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">목표 금액</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={amount ? new Intl.NumberFormat('ko-KR').format(Number(amount)) : ''}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/[^\d]/g, '');
                                setAmount(rawValue);
                            }}
                            placeholder="금액을 입력하세요"
                            className="w-full p-2 border rounded text-right"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">목표일</label>
                        <input
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                            disabled={!title || Number(amount.replace(/[^\d]/g, '')) <= 0}
                        >
                            추가하기
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-4 rounded-full relative">
                                <User className="w-8 h-8 text-blue-600" />
                                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                    {currentLevel}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">마이 프로필</h1>
                                <p className="text-gray-600">연속 저축 {savingStreak}일째</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">다음 레벨까지</p>
                            <p className="text-lg font-bold text-blue-600">
                                ₩{(1000000 - (goals.reduce((sum, goal) => sum + goal.currentAmount, 0) % 1000000)).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Today's Tip */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        <h3 className="font-bold">오늘의 저축 팁</h3>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm">{currentTip.tip}</p>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">달성 현황</h2>
                        <div className="bg-blue-50 px-4 py-2 rounded-lg flex space-x-6">
                            <div>
                                <p className="text-sm text-gray-600">총 적립 포인트</p>
                                <p className="text-lg font-bold text-blue-600">{totalPoints}P</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">연속 저축</p>
                                <p className="text-lg font-bold text-blue-600">{savingStreak}일</p>
                            </div>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setActiveTab('rewards')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${activeTab === 'rewards'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Trophy className="w-4 h-4" />
                                <span>리워드</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('challenges')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${activeTab === 'challenges'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Zap className="w-4 h-4" />
                                <span>챌린지</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('milestones')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${activeTab === 'milestones'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Target className="w-4 h-4" />
                                <span>마일스톤</span>
                            </div>
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="space-y-4">
                        {/* Rewards Tab */}
                        {activeTab === 'rewards' && (
                            <div className="space-y-4">
                                {availableRewards.map((reward) => (
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
                        )}
                        {/* Challenges Tab */}
                        {activeTab === 'challenges' && (
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
                                                        : `${Math.round((challenge.currentAmount / challenge.targetAmount) * 100)}%`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Milestones Tab */}
                        {activeTab === 'milestones' && (
                            <div className="space-y-4">
                                {milestones.map((milestone) => {
                                    const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
                                    const isAchieved = totalSaved >= milestone.targetAmount;
                                    return (
                                        <div
                                            key={milestone.id}
                                            className={`p-4 rounded-lg border flex items-center space-x-4 
                                               ${isAchieved
                                                    ? 'bg-purple-50 border-purple-200'
                                                    : 'bg-gray-50 border-gray-200'}`}
                                        >
                                            <div className={`p-2 rounded-full 
                                               ${isAchieved
                                                    ? 'bg-purple-200 text-purple-700'
                                                    : 'bg-gray-200 text-gray-500'}`}
                                            >
                                                {milestone.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold">{milestone.title}</h3>
                                                    <span className={`text-sm font-bold px-2 py-1 rounded ${isAchieved
                                                        ? 'bg-purple-200 text-purple-700'
                                                        : 'bg-gray-200 text-gray-600'
                                                        }`}>
                                                        +{milestone.rewardPoints}P
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{milestone.description}</p>
                                                <div className="mt-2 text-sm">
                                                    {isAchieved ? (
                                                        <span className="text-purple-600 font-medium">달성 완료!</span>
                                                    ) : (
                                                        <span className="text-gray-600">
                                                            목표까지 {(milestone.targetAmount - totalSaved).toLocaleString()}원 남음
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                {/* Goals Section */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">나의 목표</h2>
                        <button
                            onClick={() => setShowAddGoalModal(true)}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>추가하기</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {goals.map((goal) => (
                            <div
                                key={goal.id}
                                className="p-4 bg-gray-50 rounded-lg border flex justify-between items-center"
                            >
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{goal.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        목표 금액: ₩{goal.targetAmount.toLocaleString()}<br />
                                        현재 금액: ₩{goal.currentAmount.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right space-y-2">
                                    <p className="text-blue-600 font-bold">
                                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                                    </p>
                                    <p className="text-xs text-gray-500">목표일: {goal.targetDate}</p>
                                    <button
                                        onClick={() => {
                                            setSelectedGoal(goal);
                                            setShowUpdateAmountModal(true);
                                        }}
                                        className="bg-blue-500 text-white text-xs p-1.5 rounded hover:bg-blue-600 transition"
                                    >
                                        금액 추가
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modals */}
                <AddGoalModal
                    isOpen={showAddGoalModal}
                    onClose={() => setShowAddGoalModal(false)}
                    onAddGoal={handleAddGoal}
                />
                <UpdateAmountModal
                    isOpen={showUpdateAmountModal}
                    onClose={() => {
                        setShowUpdateAmountModal(false);
                        setSelectedGoal(null);
                    }}
                    goal={selectedGoal}
                    onUpdateAmount={handleUpdateGoalAmount}
                />

                {/* Level Up Effect */}
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                        <div className="text-4xl font-bold text-yellow-500 animate-bounce">
                            🎉 Level Up! 🎉
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfilePage;