import React, { useState } from 'react';
import { ChevronRight, Trophy, Star, TrendingUp, Shield, Target, Gift, X, Search, Heart, ChevronDown, Clock } from 'lucide-react';

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: any;
    color: string;
    progress: number;
    details: string;
    achievedDate: string;
    nextLevel: string;
    category: string;
}

interface FinancialProduct {
    id: number;
    title: string;
    description: string;
    benefit: string;
    tag: string;
    tagColor: string;
    interestRate: number;
    minAmount: number;
    period: string;
    isFavorite: boolean;
}

const ListPage = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'progress' | 'date'>('progress');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const achievements: Achievement[] = [
        {
            id: 1,
            title: '절약왕',
            description: '3개월 연속 목표 달성',
            icon: Trophy,
            color: 'yellow',
            progress: 80,
            details: '매월 지출 목표를 설정하고 달성하여 절약 습관을 기르세요',
            achievedDate: '2024년 1월 1일',
            nextLevel: '6개월 연속 달성 시 골드 뱃지 획득',
            category: '저축'
        },
        {
            id: 2,
            title: '투자고수',
            description: '수익률 10% 달성',
            icon: Star,
            color: 'purple',
            progress: 60,
            details: '투자 포트폴리오의 수익률이 10%를 달성했습니다',
            achievedDate: '2023년 12월 15일',
            nextLevel: '수익률 15% 달성 시 다음 레벨',
            category: '투자'
        },
        {
            id: 3,
            title: '안정적인 저축',
            description: '6개월 연속 저축',
            icon: Shield,
            color: 'green',
            progress: 40,
            details: '매월 일정 금액을 저축하여 안정적인 자산을 만드세요',
            achievedDate: '2023년 11월 30일',
            nextLevel: '1년 연속 저축 시 다음 레벨',
            category: '저축'
        },
        {
            id: 4,
            title: '목표 달성',
            description: '첫 목표 달성',
            icon: Target,
            color: 'blue',
            progress: 90,
            details: '설정한 저축 목표를 달성했습니다',
            achievedDate: '2023년 12월 31일',
            nextLevel: '3개 목표 달성 시 다음 레벨',
            category: '목표'
        }
    ];

    const products: FinancialProduct[] = [
        {
            id: 1,
            title: '청년희망적금',
            description: '연 4.5% 금리',
            benefit: '최대 3.0% 우대금리',
            tag: '인기',
            tagColor: 'red',
            interestRate: 4.5,
            minAmount: 10000,
            period: '24개월',
            isFavorite: false
        },
        {
            id: 2,
            title: '급여우대통장',
            description: '수수료 면제',
            benefit: '타행이체 무제한',
            tag: '추천',
            tagColor: 'blue',
            interestRate: 2.5,
            minAmount: 0,
            period: '제한없음',
            isFavorite: false
        },
        {
            id: 3,
            title: '스마트정기예금',
            description: '연 3.8% 금리',
            benefit: '온라인 우대',
            tag: '신규',
            tagColor: 'green',
            interestRate: 3.8,
            minAmount: 100000,
            period: '12개월',
            isFavorite: false
        }
    ];

    const [financialProducts, setFinancialProducts] = useState<FinancialProduct[]>(products);
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

    const getProductClasses = (color: string) => ({
        tag: color === 'red' ? 'bg-red-100 text-red-600' :
            color === 'blue' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
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

    const handleFavoriteToggle = (productId: number) => {
        setFinancialProducts(prev =>
            prev.map(product =>
                product.id === productId
                    ? { ...product, isFavorite: !product.isFavorite }
                    : product
            )
        );
    };

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

    const ProductModal = () => {
        if (!selectedProduct) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-xl">{selectedProduct.title}</h3>
                        <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600">기본 금리</p>
                            <p className="text-lg font-bold text-blue-600">{selectedProduct.interestRate}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">최소 가입금액</p>
                            <p className="text-lg font-bold">₩{selectedProduct.minAmount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">가입기간</p>
                            <p className="text-lg font-bold">{selectedProduct.period}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">혜택</p>
                            <p className="text-blue-600">{selectedProduct.benefit}</p>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                            가입하기
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="page-container">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-xl font-bold">금융상품 및 목표 달성 현황</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 맞춤 금융상품 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">맞춤 금융상품 추천</h3>
                                <Gift className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="space-y-3">
                                {financialProducts.map((product) => {
                                    const classes = getProductClasses(product.tagColor);
                                    return (
                                        <div
                                            key={product.id}
                                            className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{product.title}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${classes.tag}`}>
                                                            {product.tag}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{product.description}</p>
                                                    <p className="text-xs text-blue-600">{product.benefit}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleFavoriteToggle(product.id);
                                                        }}
                                                        className="p-2 hover:bg-gray-200 rounded-full"
                                                    >
                                                        <Heart
                                                            className={`w-5 h-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                                                }`}
                                                        />
                                                    </button>
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 목표 현황 */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">나의 목표 달성 현황</h3>
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            {/* 검색 및 필터 */}
                            <div className="space-y-4">
                                {/* <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="업적 검색..."
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div> */}
                                <div className="flex space-x-4">
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
                            </div>
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
            <ProductModal />
        </div>
    );
};

export default ListPage;