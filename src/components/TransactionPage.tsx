import React, { useState } from 'react';
import {
    Send, Users, QrCode, CreditCard, ArrowRightLeft,
    Star, Clock, Search, X, Plus, User
} from 'lucide-react';

// 인터페이스 정의
interface Account {
    id: number;
    bankName: string;
    accountNumber: string;
    balance: number;
    type: 'checking' | 'saving';
}

interface Contact {
    id: number;
    name: string;
    phoneNumber: string;
    bankName?: string;
    accountNumber?: string;
    isFavorite: boolean;
}

interface TransferHistory {
    id: number;
    sender: string;
    recipient: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

// 송금 모달 props 인터페이스
interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
    contacts: Contact[];
    selectedFromAccount: Account | null;
    selectedToAccount: Contact | null;
    setSelectedFromAccount: (account: Account | null) => void;
    setSelectedToAccount: (contact: Contact | null) => void;
    onTransfer: (amount: number) => void;
}

// 계좌 관리 모달 props 인터페이스
interface AccountsModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: Account[];
    onAddAccount: (account: Omit<Account, 'id'>) => void;
    onDeleteAccount: (accountId: number) => void;
}

// 연락처 관리 모달 props 인터페이스
interface ContactsModalProps {
    isOpen: boolean;
    onClose: () => void;
    contacts: Contact[];
    onAddContact: (contact: Omit<Contact, 'id'>) => void;
    onToggleFavorite: (contactId: number) => void;
    onDeleteContact: (contactId: number) => void;
}

// 거래 내역 모달 props 인터페이스
interface TransferHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    transferHistory: TransferHistory[];
}

// 송금 모달 컴포넌트
const TransferModal: React.FC<TransferModalProps> = ({
    isOpen,
    onClose,
    accounts,
    contacts,
    selectedFromAccount,
    selectedToAccount,
    setSelectedFromAccount,
    setSelectedToAccount,
    onTransfer
}) => {
    const [amount, setAmount] = useState<string>('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">송금하기</h3>

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
                        </div>
                    </div>

                    {/* 송금 금액 입력 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            송금 금액
                        </label>
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
                        {selectedFromAccount && (
                            <div className="flex justify-end mt-1">
                                <p className="text-sm text-gray-600">
                                    최대 {selectedFromAccount.balance.toLocaleString()}원
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => {
                                if (amount) {
                                    onTransfer(Number(amount));
                                    setAmount('');
                                }
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            송금하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 계좌 관리 모달 컴포넌트
const AccountsModal: React.FC<AccountsModalProps> = ({
    isOpen,
    onClose,
    accounts,
    onAddAccount,
    onDeleteAccount
}) => {
    const [isAddingAccount, setIsAddingAccount] = useState(false);
    type AccountType = 'checking' | 'saving';

    const [newAccount, setNewAccount] = useState<{
        bankName: string;
        accountNumber: string;
        balance: number;
        type: AccountType;  // 여기서 타입을 AccountType으로 명시
    }>({
        bankName: '',
        accountNumber: '',
        balance: 0,
        type: 'checking'
    });

    if (!isOpen) return null;

    const handleAddAccount = () => {
        if (!newAccount.bankName || !newAccount.accountNumber) {
            alert('은행명과 계좌번호는 필수입니다.');
            return;
        }
        onAddAccount(newAccount);
        setNewAccount({
            bankName: '',
            accountNumber: '',
            balance: 0,
            type: 'checking'
        });
        setIsAddingAccount(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">계좌 관리</h3>
                        <button onClick={onClose}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 계좌 추가 버튼/폼 */}
                    {!isAddingAccount ? (
                        <button
                            onClick={() => setIsAddingAccount(true)}
                            className="w-full p-3 border-2 border-dashed rounded-lg text-center mb-4 hover:bg-gray-50"
                        >
                            <Plus className="w-5 h-5 inline-block mr-2" />
                            새 계좌 추가
                        </button>
                    ) : (
                        <div className="mb-4 p-4 border rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="은행명"
                                    value={newAccount.bankName}
                                    onChange={(e) => setNewAccount(prev => ({ ...prev, bankName: e.target.value }))}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="계좌번호"
                                    value={newAccount.accountNumber}
                                    onChange={(e) => setNewAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="초기 잔액"
                                    value={newAccount.balance === 0 ? '' : newAccount.balance}
                                    onChange={(e) => setNewAccount(prev => ({ ...prev, balance: Number(e.target.value) }))}
                                    className="p-2 border rounded"
                                />

                                <select
                                    value={newAccount.type}
                                    onChange={(e) => {
                                        const selectedType = e.target.value as 'checking' | 'saving';
                                        setNewAccount(prev => ({
                                            ...prev,
                                            type: selectedType
                                        }))
                                    }}
                                    className="p-2 border rounded"
                                >
                                    <option value="checking">입출금</option>
                                    <option value="saving">저축</option>
                                </select>
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    onClick={() => setIsAddingAccount(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleAddAccount}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    추가
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 계좌 목록 */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {accounts.map(account => (
                            <div
                                key={account.id}
                                className="p-4 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <CreditCard className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{account.bankName}</p>
                                            <p className="text-sm text-gray-600">{account.accountNumber}</p>
                                            <p className="text-sm text-gray-600">
                                                {account.type === 'checking' ? '입출금' : '저축'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-blue-600">
                                            ₩{account.balance.toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => onDeleteAccount(account.id)}
                                            className="p-2 rounded-full text-red-500 hover:bg-gray-100"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 연락처 관리 모달 컴포넌트
const ContactsModal: React.FC<ContactsModalProps> = ({
    isOpen,
    onClose,
    contacts,
    onAddContact,
    onToggleFavorite,
    onDeleteContact
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingContact, setIsAddingContact] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        phoneNumber: '',
        bankName: '',
        accountNumber: '',
        isFavorite: false
    });

    if (!isOpen) return null;

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber.includes(searchTerm)
    );

    const handleAddContact = () => {
        if (!newContact.name || !newContact.phoneNumber) {
            alert('이름과 전화번호는 필수입니다.');
            return;
        }
        onAddContact(newContact);
        setNewContact({
            name: '',
            phoneNumber: '',
            bankName: '',
            accountNumber: '',
            isFavorite: false
        });
        setIsAddingContact(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">자주 송금하는 연락처 관리</h3>
                        <button onClick={onClose}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 검색 바 */}
                    <div className="mb-4 relative">
                        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="이름 또는 전화번호로 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>

                    {/* 연락처 추가 버튼/폼 */}
                    {!isAddingContact ? (
                        <button
                            onClick={() => setIsAddingContact(true)}
                            className="w-full p-3 border-2 border-dashed rounded-lg text-center mb-4 hover:bg-gray-50"
                        >
                            <Plus className="w-5 h-5 inline-block mr-2" />
                            새 연락처 추가
                        </button>
                    ) : (
                        <div className="mb-4 p-4 border rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="이름"
                                    value={newContact.name}
                                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="전화번호"
                                    value={newContact.phoneNumber}
                                    onChange={(e) => setNewContact(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="은행명"
                                    value={newContact.bankName}
                                    onChange={(e) => setNewContact(prev => ({ ...prev, bankName: e.target.value }))}
                                    className="p-2 border rounded"
                                />
                                <input
                                    placeholder="계좌번호"
                                    value={newContact.accountNumber}
                                    onChange={(e) => setNewContact(prev => ({ ...prev, accountNumber: e.target.value }))}
                                    className="p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    onClick={() => setIsAddingContact(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleAddContact}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    추가
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 연락처 목록 */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredContacts.map(contact => (
                            <div
                                key={contact.id}
                                className="p-4 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{contact.name}</p>
                                            <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                                            {contact.bankName && (
                                                <p className="text-sm text-gray-600">
                                                    {contact.bankName} {contact.accountNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onToggleFavorite(contact.id)}
                                            className={`p-2 rounded-full ${contact.isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                                        >
                                            <Star className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onDeleteContact(contact.id)}
                                            className="p-2 rounded-full text-red-500 hover:bg-gray-100"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
// 거래 내역 모달 컴포넌트
const TransferHistoryModal: React.FC<TransferHistoryModalProps> = ({
    isOpen,
    onClose,
    transferHistory
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

    if (!isOpen) return null;

    const filteredHistory = transferHistory.filter(transfer => {
        const matchesSearch = transfer.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transfer.sender.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || transfer.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">송금 내역</h3>
                        <button onClick={onClose}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 검색 및 필터 */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="받는 사람 또는 보낸 계좌로 검색"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="all">전체</option>
                            <option value="completed">완료</option>
                            <option value="pending">대기</option>
                        </select>
                    </div>

                    {/* 거래 내역 목록 */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredHistory.map(transfer => (
                            <div
                                key={transfer.id}
                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {transfer.recipient.split(' ')[0]}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {transfer.recipient}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(transfer.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${transfer.status === 'completed'
                                            ? 'text-blue-600'
                                            : 'text-red-600'
                                            }`}>
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
    );
};
// 메인 TransactionPage 컴포넌트
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

    // 모달 상태들
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);
    const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedFromAccount, setSelectedFromAccount] = useState<Account | null>(null);
    const [selectedToAccount, setSelectedToAccount] = useState<Contact | null>(null);

    // 송금 처리 핸들러
    const handleTransfer = (amount: number) => {
        if (!selectedFromAccount || !selectedToAccount) {
            alert('송금 정보를 모두 입력해주세요.');
            return;
        }

        if (amount <= 0) {
            alert('유효한 금액을 입력해주세요.');
            return;
        }

        if (selectedFromAccount.balance < amount) {
            alert('잔액이 부족합니다.');
            return;
        }

        // 송금 내역 추가
        const newTransfer: TransferHistory = {
            id: Date.now(),
            sender: `${selectedFromAccount.bankName} ${selectedFromAccount.accountNumber}`,
            recipient: `${selectedToAccount.name} ${selectedToAccount.bankName} ${selectedToAccount.accountNumber}`,
            amount,
            date: new Date().toISOString(),
            status: 'completed'
        };

        setTransferHistory(prev => [newTransfer, ...prev]);

        // 계좌 잔액 업데이트
        setAccounts(prev =>
            prev.map(account =>
                account.id === selectedFromAccount.id
                    ? { ...account, balance: account.balance - amount }
                    : account
            )
        );

        // 모달 초기화 및 닫기
        setIsTransferModalOpen(false);
        setSelectedFromAccount(null);
        setSelectedToAccount(null);
    };

    // 계좌 관리 핸들러들
    const handleAddAccount = (account: Omit<Account, 'id'>) => {
        const newAccount: Account = {
            ...account,
            id: accounts.length + 1
        };
        setAccounts(prev => [...prev, newAccount]);
    };

    const handleDeleteAccount = (accountId: number) => {
        // 잔액이 있는 계좌는 삭제할 수 없도록 체크
        const account = accounts.find(acc => acc.id === accountId);
        if (account && account.balance > 0) {
            alert('잔액이 있는 계좌는 삭제할 수 없습니다.');
            return;
        }

        if (window.confirm('정말로 이 계좌를 삭제하시겠습니까?')) {
            setAccounts(prev => prev.filter(account => account.id !== accountId));
        }
    };

    // 연락처 관리 핸들러들
    const handleAddContact = (contact: Omit<Contact, 'id'>) => {
        const newContact: Contact = {
            ...contact,
            id: contacts.length + 1
        };
        setContacts(prev => [...prev, newContact]);
    };

    const handleToggleFavorite = (contactId: number) => {
        setContacts(prev =>
            prev.map(contact =>
                contact.id === contactId
                    ? { ...contact, isFavorite: !contact.isFavorite }
                    : contact
            )
        );
    };

    const handleDeleteContact = (contactId: number) => {
        if (window.confirm('정말로 이 연락처를 삭제하시겠습니까?')) {
            setContacts(prev => prev.filter(contact => contact.id !== contactId));
        }
    };
    return (
        <div className="page-container bg-gray-100 min-h-screen">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 페이지 헤더 */}
                    <div className="px-6 py-4 flex items-center justify-between border-b">
                        <h2 className="text-xl font-bold">송금/이체</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsTransferModalOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <Send className="w-5 h-5 text-blue-600" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* 내 계좌 섹션 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">내 계좌</h3>
                                <button
                                    onClick={() => setIsAccountsModalOpen(true)}
                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <Plus className="w-5 h-5 inline-block mr-1" />
                                    관리
                                </button>
                            </div>
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
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">자주 송금하는 연락처</h3>
                                <button
                                    onClick={() => setIsContactsModalOpen(true)}
                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                >
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 최근 송금 내역 */}
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">최근 송금 내역</h3>
                                <button
                                    onClick={() => setIsHistoryModalOpen(true)}
                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    전체보기
                                </button>
                            </div>
                            <div className="space-y-3">
                                {transferHistory.slice(0, 3).map(transfer => (
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
                                                <p className={`font-bold ${transfer.status === 'completed'
                                                    ? 'text-blue-600'
                                                    : 'text-red-600'
                                                    }`}>
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
            {/* 모달 컴포넌트들 */}
            <TransferModal
                isOpen={isTransferModalOpen}
                onClose={() => setIsTransferModalOpen(false)}
                accounts={accounts}
                contacts={contacts}
                selectedFromAccount={selectedFromAccount}
                selectedToAccount={selectedToAccount}
                setSelectedFromAccount={setSelectedFromAccount}
                setSelectedToAccount={setSelectedToAccount}
                onTransfer={handleTransfer}
            />

            <AccountsModal
                isOpen={isAccountsModalOpen}
                onClose={() => setIsAccountsModalOpen(false)}
                accounts={accounts}
                onAddAccount={handleAddAccount}
                onDeleteAccount={handleDeleteAccount}
            />

            <ContactsModal
                isOpen={isContactsModalOpen}
                onClose={() => setIsContactsModalOpen(false)}
                contacts={contacts}
                onAddContact={handleAddContact}
                onToggleFavorite={handleToggleFavorite}
                onDeleteContact={handleDeleteContact}
            />

            <TransferHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                transferHistory={transferHistory}
            />
        </div>
    );
};

export default TransactionPage;