import React, { useState } from 'react';
import {
    Send, Users, QrCode, CreditCard, ArrowRightLeft,
    Star, Clock, Search, X, Plus, User
} from 'lucide-react';

// 계좌 인터페이스
interface Account {
    id: number;
    bankName: string;
    accountNumber: string;
    balance: number;
    type: 'checking' | 'saving';
}

// 연락처 인터페이스
interface Contact {
    id: number;
    name: string;
    phoneNumber: string;
    bankName?: string;
    accountNumber?: string;
    isFavorite: boolean;
}

// 송금 내역 인터페이스
interface TransferHistory {
    id: number;
    sender: string;
    recipient: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

const TransactionPage = () => {
    // 계좌 상태
    const [accounts, setAccounts] = useState<Account[]>([
        {
            id: 1,
            bankName: '국민은행',
            accountNumber: '123-45-6789',
            balance: 5000000,
            type: 'checking'
        },
        {
            id: 2,
            bankName: '신한은행',
            accountNumber: '987-65-4321',
            balance: 3000000,
            type: 'saving'
        }
    ]);

    // 자주 송금하는 연락처
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: 1,
            name: '김철수',
            phoneNumber: '010-1234-5678',
            bankName: '카카오뱅크',
            accountNumber: '3333-01-1234567',
            isFavorite: true
        },
        {
            id: 2,
            name: '이영희',
            phoneNumber: '010-8765-4321',
            bankName: '국민은행',
            accountNumber: '123-45-9876',
            isFavorite: false
        }
    ]);

    // 송금 내역
    const [transferHistory, setTransferHistory] = useState<TransferHistory[]>([
        {
            id: 1,
            sender: '국민은행 123-45-6789',
            recipient: '김철수 카카오뱅크 3333-01-1234567',
            amount: 50000,
            date: '2024-01-07 14:30',
            status: 'completed'
        }
    ]);

    // 송금 모달 상태
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [selectedFromAccount, setSelectedFromAccount] = useState<Account | null>(null);
    const [selectedToAccount, setSelectedToAccount] = useState<Contact | null>(null);
    const [transferAmount, setTransferAmount] = useState<string>('');

    // 송금 모달 열기
    const openTransferModal = () => {
        setIsTransferModalOpen(true);
    };

    // 송금 실행
    const executeTransfer = () => {
        if (!selectedFromAccount || !selectedToAccount || !transferAmount) {
            alert('송금 정보를 모두 입력해주세요.');
            return;
        }

        const amount = Number(transferAmount);
        if (amount <= 0) {
            alert('유효한 금액을 입력해주세요.');
            return;
        }

        if (selectedFromAccount.balance < amount) {
            alert('잔액이 부족합니다.');
            return;
        }

        // 송금 로직 (실제 구현 시 백엔드 API 호출 필요)
        const newTransfer: TransferHistory = {
            id: Date.now(),
            sender: `${selectedFromAccount.bankName} ${selectedFromAccount.accountNumber}`,
            recipient: `${selectedToAccount.name} ${selectedToAccount.bankName} ${selectedToAccount.accountNumber}`,
            amount,
            date: new Date().toISOString(),
            status: 'completed'
        };

        // 송금 내역 추가
        setTransferHistory(prev => [newTransfer, ...prev]);

        // 계좌 잔액 업데이트
        setAccounts(prev =>
            prev.map(account =>
                account.id === selectedFromAccount.id
                    ? { ...account, balance: account.balance - amount }
                    : account
            )
        );

        // 모달 초기화
        setIsTransferModalOpen(false);
        setSelectedFromAccount(null);
        setSelectedToAccount(null);
        setTransferAmount('');
    };

    // 송금 모달 컴포넌트
    const TransferModal = () => {
        if (!isTransferModalOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">송금하기</h3>
                        <button
                            onClick={() => setIsTransferModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* 출금 계좌 선택 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            출금 계좌
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {accounts.map(account => (
                                <button
                                    key={account.id}
                                    onClick={() => setSelectedFromAccount(account)}
                                    className={`p-3 border rounded-lg text-left 
                                        ${selectedFromAccount?.id === account.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{account.bankName}</p>
                                            <p className="text-sm text-gray-600">
                                                {account.accountNumber.slice(-4)}
                                            </p>
                                        </div>
                                        <p className="font-bold text-blue-600">
                                            ₩{account.balance.toLocaleString()}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 수취인 선택 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            받는 사람
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {contacts.map(contact => (
                                <button
                                    key={contact.id}
                                    onClick={() => setSelectedToAccount(contact)}
                                    className={`p-3 border rounded-lg text-center 
                                        ${selectedToAccount?.id === contact.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="bg-blue-100 p-2 rounded-full mb-2">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <p className="font-medium">{contact.name}</p>
                                        <p className="text-xs text-gray-600">
                                            {contact.bankName}
                                        </p>
                                    </div>
                                </button>
                            ))}
                            <button
                                className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50"
                            // 새 연락처 추가 로직 구현
                            >
                                <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">추가</p>
                            </button>
                        </div>
                    </div>

                    {/* 송금 금액 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            송금 금액
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={transferAmount === '' ? '' : Number(transferAmount).toLocaleString()}
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/[^0-9]/g, '');
                                    const maxAmount = selectedFromAccount ? selectedFromAccount.balance : Infinity;
                                    const limitedAmount = Math.min(Number(inputValue), maxAmount).toString();
                                    setTransferAmount(limitedAmount);
                                }}
                                onKeyDown={(e) => {
                                    // 숫자, 백스페이스, 방향키만 허용
                                    if (!/^[0-9]$/.test(e.key) &&
                                        e.key !== 'Backspace' &&
                                        !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                inputMode="numeric"
                                placeholder="송금할 금액을 입력하세요"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                            />

                        </div>

                        {/* 최대 송금 가능 금액 표시 및 전체 금액 송금 버튼 */}
                        {selectedFromAccount && (
                            <div className="flex justify-between items-center mt-1">
                                <button
                                    type="button"
                                    onClick={() => setTransferAmount(selectedFromAccount.balance.toString())}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    전체 금액
                                </button>
                                <p className="text-sm text-gray-600">
                                    최대 {selectedFromAccount.balance.toLocaleString()}원 송금 가능
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 송금 버튼 */}
                    <button
                        onClick={executeTransfer}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        송금하기
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="page-container bg-gray-100 min-h-screen" >
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 페이지 헤더 */}
                    <div className="px-6 py-4 flex items-center justify-between border-b">
                        <h2 className="text-xl font-bold">송금/이체</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={openTransferModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <Send className="w-5 h-5 text-blue-600" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* 내 계좌 섹션 */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">내 계좌</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {accounts.map(account => (
                                    <div
                                        key={account.id}
                                        className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <p className="font-medium">{account.bankName}</p>
                                                <p className="text-sm text-gray-600">
                                                    {account.accountNumber}
                                                </p>
                                            </div>
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <CreditCard className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-600">
                                                {account.type === 'checking' ? '입출금' : '저축'}
                                            </p>
                                            <p className="text-xl font-bold text-blue-600">
                                                ₩{account.balance.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 자주 송금하는 연락처 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">자주 송금하는 연락처</h3>
                                <button className="text-blue-600 hover:text-blue-700 text-sm">
                                    <Plus className="w-5 h-5 inline-block mr-1" />
                                    추가
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {contacts.filter(contact => contact.isFavorite).map(contact => (
                                    <div
                                        key={contact.id}
                                        className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                                            <User className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <p className="font-medium">{contact.name}</p>
                                        <p className="text-sm text-gray-600">{contact.bankName}</p>
                                    </div>))}
                            </div>
                        </div>

                        {/* 최근 송금 내역 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">최근 송금 내역</h3>
                                <button className="text-blue-600 hover:text-blue-700 text-sm">
                                    전체보기
                                </button>
                            </div>
                            <div className="space-y-3">
                                {transferHistory.map(transfer => (
                                    <div
                                        key={transfer.id}
                                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-blue-100 p-2 rounded-full">
                                                    <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{transfer.recipient.split(' ')[0]}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {transfer.date.split(' ')[0].replace('-', '.')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${transfer.status === 'completed' ? 'text-blue-600' : 'text-red-600'}`}>
                                                    ₩{transfer.amount.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {transfer.status === 'completed' ? '완료' : '대기'}
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

            {/* 송금 모달 */}
            <TransferModal />
        </div>
    );
};

export default TransactionPage;
