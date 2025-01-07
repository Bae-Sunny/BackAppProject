import React, { useState, useEffect } from 'react';
import {
    Settings, DollarSign, TrendingUp, Target, Share2, User,
    PlusCircle, Edit, Trash2, CheckCircle2
} from 'lucide-react';

// 타입 정의
interface Transaction {
    id: string;
    title: string;
    date: string;
    amount: number;
    type: 'income' | 'expense';
}

interface Friend {
    id: string;
    name: string;
    goal: string;
    current: number;
    target: number;
    color: string;
}

interface Goal {
    id: string;
    title: string;
    currentAmount: number;
    targetAmount: number;
    targetDate: string;
    image?: string;
}

const HomePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: '1',
            title: '월급 입금',
            date: '2024년 12월 25일',
            amount: 500000,
            type: 'income'
        },
        {
            id: '2',
            title: '친구로부터 입금',
            date: '2024년 12월 22일',
            amount: 200000,
            type: 'income'
        },
        {
            id: '3',
            title: '저축용 계좌 이체',
            date: '2024년 12월 18일',
            amount: 300000,
            type: 'expense'
        }
    ]);

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: 'dreamcar',
            title: '나의 드림카',
            currentAmount: 500000,
            targetAmount: 3000000,
            targetDate: '2025-12-31',
            image: '/rb_2149975033.png'
        }
    ]);

    const [friends, setFriends] = useState<Friend[]>([
        {
            id: '1',
            name: '친구 1',
            goal: '구찌백',
            current: 1200000,
            target: 2000000,
            color: 'bg-green-500'
        },
        {
            id: '2',
            name: '친구 2',
            goal: '보증금',
            current: 2000000,
            target: 5000000,
            color: 'bg-blue-500'
        },
        {
            id: '3',
            name: '친구 3',
            goal: '미국 여행',
            current: 500000,
            target: 2000000,
            color: 'bg-yellow-500'
        }
    ]);

    // 새 트랜잭션 추가 모달 상태
    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
        title: '',
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        type: 'income'
    });

    // 목표 수정 모달 상태
    const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);
    const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

    // 진행률 계산 함수
    const calculateProgress = (current: number, target: number): number => {
        const progress = (current / target) * 100;
        return Math.min(Math.round(progress), 100);
    };

    // 남은 금액 계산 함수
    const calculateRemaining = (current: number, target: number): number => {
        return target - current;
    };

    // 예상 달성까지 남은 일수 계산
    const calculateDaysRemaining = (targetDateString: string): number => {
        const targetDate = new Date(targetDateString).getTime();
        const today = new Date().getTime();
        const diffTime = Math.abs(targetDate - today);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // 트랜잭션 추가 핸들러
    const handleAddTransaction = () => {
        const newTransactionWithId = {
            ...newTransaction,
            id: Date.now().toString(),
        };
        setTransactions([newTransactionWithId, ...transactions]);
        setIsAddTransactionModalOpen(false);
        setNewTransaction({
            title: '',
            date: new Date().toISOString().split('T')[0],
            amount: 0,
            type: 'income'
        });
    };

    // 트랜잭션 삭제 핸들러
    const handleDeleteTransaction = (id: string) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    // 목표 업데이트 핸들러
    const handleUpdateGoal = () => {
        if (currentGoal) {
            setGoals(goals.map(g =>
                g.id === currentGoal.id ? currentGoal : g
            ));
            setIsEditGoalModalOpen(false);
        }
    };

    return (
        <div className="page-container bg-gray-100 min-h-screen">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 목표 카드 헤더 */}
                    <div className="px-6 py-4 flex flex-row items-center justify-between border-b">
                        <h2 className="text-xl font-bold">나의 목표</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => {
                                    setCurrentGoal(goals[0]);
                                    setIsEditGoalModalOpen(true);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="목표 설정 수정하기"
                            >
                                <Settings className="w-6 h-6 text-blue-600" />
                            </button>
                        </div>
                    </div>

                    {/* 목표 상세 섹션 */}
                    {goals.map((goal) => (
                        <div key={goal.id} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <img
                                        src={goal.image}
                                        alt={goal.title}
                                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <p className="text-sm text-gray-600">현재 금액</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                ₩{goal.currentAmount.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">목표 금액</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                ₩{goal.targetAmount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* 목표 달성률 */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2">
                                                <Target className="w-5 h-5 text-blue-600" />
                                                <span className="font-medium">목표 달성률</span>
                                            </span>
                                            <span className="text-lg font-bold text-blue-600">
                                                {calculateProgress(goal.currentAmount, goal.targetAmount)}%
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <div className="w-full bg-gray-200 rounded-full h-6">
                                                <div
                                                    className="bg-blue-600 h-6 rounded-full transition-all duration-500 ease-in-out"
                                                    style={{
                                                        width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 남은 금액 */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-green-600" />
                                                <span className="font-medium">남은 금액</span>
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                ₩{calculateRemaining(goal.currentAmount, goal.targetAmount).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 목표 달성까지 남은 기간 */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-gray-600">목표 달성까지</p>
                                        <p className="text-lg font-bold text-blue-600">
                                            {calculateDaysRemaining(goal.targetDate)}일 남음
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            ({goal.targetDate}까지)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* 저축 내역 섹션 */}
                    <div className="p-6 space-y-4 border-t">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">최근 거래 내역</h3>
                            <button
                                onClick={() => setIsAddTransactionModalOpen(true)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                거래 추가
                            </button>
                        </div>

                        <div className="space-y-3">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-full ${transaction.type === 'income'
                                            ? 'bg-green-100'
                                            : 'bg-red-100'
                                            }`}>
                                            <DollarSign className={`w-5 h-5 ${transaction.type === 'income'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`} />
                                        </div>
                                        <div>
                                            <p className="font-medium">{transaction.title}</p>
                                            <p className="text-sm text-gray-500">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className={`font-bold ${transaction.type === 'income'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'}
                                            ₩{transaction.amount.toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 거래 추가 모달 */}
                    {isAddTransactionModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-bold mb-4">새 거래 추가</h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="거래 제목"
                                        value={newTransaction.title}
                                        onChange={(e) => setNewTransaction({
                                            ...newTransaction,
                                            title: e.target.value
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="date"
                                        value={newTransaction.date}
                                        onChange={(e) => setNewTransaction({
                                            ...newTransaction,
                                            date: e.target.value
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="금액"
                                        value={newTransaction.amount}
                                        onChange={(e) => setNewTransaction({
                                            ...newTransaction,
                                            amount: Number(e.target.value)
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex space-x-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="transactionType"
                                                value="income"
                                                checked={newTransaction.type === 'income'}
                                                onChange={() => setNewTransaction({
                                                    ...newTransaction,
                                                    type: 'income'
                                                })}
                                            />수입
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="transactionType"
                                                value="expense"
                                                checked={newTransaction.type === 'expense'}
                                                onChange={() => setNewTransaction({
                                                    ...newTransaction,
                                                    type: 'expense'
                                                })}
                                            />지출
                                        </label>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setIsAddTransactionModalOpen(false)}
                                            className="px-4 py-2 bg-gray-200 rounded"
                                        >
                                            취소
                                        </button>
                                        <button
                                            onClick={handleAddTransaction}
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                        >
                                            추가
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 목표 수정 모달 */}
                    {isEditGoalModalOpen && currentGoal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-bold mb-4">목표 수정</h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="목표 제목"
                                        value={currentGoal.title}
                                        onChange={(e) => setCurrentGoal({
                                            ...currentGoal,
                                            title: e.target.value
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="현재 금액"
                                        value={currentGoal.currentAmount}
                                        onChange={(e) => setCurrentGoal({
                                            ...currentGoal,
                                            currentAmount: Number(e.target.value)
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="목표 금액"
                                        value={currentGoal.targetAmount}
                                        onChange={(e) => setCurrentGoal({
                                            ...currentGoal,
                                            targetAmount: Number(e.target.value)
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="date"
                                        value={currentGoal.targetDate}
                                        onChange={(e) => setCurrentGoal({
                                            ...currentGoal,
                                            targetDate: e.target.value
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setIsEditGoalModalOpen(false)}
                                            className="px-4 py-2 bg-gray-200 rounded"
                                        >
                                            취소
                                        </button>
                                        <button
                                            onClick={handleUpdateGoal}
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                        >
                                            저장
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 친구 목표 섹션 */}
                    <div className="p-6 space-y-4 border-t">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">친구들의 목표</h3>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                <Share2 className="w-4 h-4" />
                                친구 초대하기
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {friends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between space-x-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white p-2 rounded-full shadow-sm">
                                                <User className="w-8 h-8 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{friend.name}</p>
                                                <p className="text-sm text-gray-600">목표: {friend.goal}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end flex-1 max-w-[200px]">
                                            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-1">
                                                <div
                                                    className={`${friend.color} h-4 rounded-full transition-all duration-500 ease-in-out`}
                                                    style={{
                                                        width: `${calculateProgress(friend.current, friend.target)}%`
                                                    }}
                                                >
                                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                                        {calculateProgress(friend.current, friend.target)}%
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-right text-sm text-gray-600">
                                                ₩{friend.current.toLocaleString()} / ₩{friend.target.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;