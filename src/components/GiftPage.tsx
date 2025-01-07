import React, { useState, useMemo } from 'react';
import { ChevronRight, Gift, Heart, Filter, ArrowUpDown } from 'lucide-react';

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
    category: 'deposit' | 'savings' | 'investment';
}

const GiftPage = () => {
    const [products, setProducts] = useState<FinancialProduct[]>([
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
            isFavorite: false,
            category: 'savings'
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
            isFavorite: false,
            category: 'deposit'
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
            isFavorite: false,
            category: 'deposit'
        },
        {
            id: 4,
            title: '글로벌 주식형 펀드',
            description: '해외 투자 펀드',
            benefit: '다각화 투자',
            tag: '추천',
            tagColor: 'purple',
            interestRate: 7.2,
            minAmount: 500000,
            period: '36개월',
            isFavorite: false,
            category: 'investment'
        }
    ]);

    // 필터링 및 정렬 상태
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [sortOption, setSortOption] = useState<'rate' | 'amount'>('rate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // 즐겨찾기 토글 핸들러
    const handleFavoriteToggle = (productId: number) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === productId
                    ? { ...product, isFavorite: !product.isFavorite }
                    : product
            )
        );
    };

    // 제품 필터링 및 정렬 로직
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 카테고리 필터링
        if (categoryFilter !== 'all') {
            result = result.filter(product => product.category === categoryFilter);
        }

        // 정렬 로직
        result.sort((a, b) => {
            const compareValue = sortOption === 'rate' ? 'interestRate' : 'minAmount';
            const multiplier = sortDirection === 'desc' ? 1 : -1;
            return multiplier * (a[compareValue] - b[compareValue]);
        });

        return result;
    }, [products, categoryFilter, sortOption, sortDirection]);

    // 즐겨찾기 상품 필터링
    const favoriteProducts = products.filter(product => product.isFavorite);

    // 제품 태그 클래스 
    type TagColor = 'red' | 'blue' | 'green' | 'purple';

    const getTagClasses = (color: string) => {
        const tagColorClasses: Record<TagColor, string> = {
            red: 'bg-red-100 text-red-600',
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600'
        };

        return (color as TagColor) in tagColorClasses
            ? tagColorClasses[color as TagColor]
            : 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="page-container bg-gray-100 min-h-screen">
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 페이지 헤더 */}
                    <div className="px-6 py-4 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">금융 상품 추천</h2>
                            <Gift className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                    {/* 필터링 및 정렬 섹션 */}
                    <div className="px-6 py-4 bg-white border-b">
                        <div className="flex space-x-4">
                            {/* 카테고리 필터 */}
                            <div className="flex-1">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 flex items-center"
                                >
                                    <option value="all">전체 상품</option>
                                    <option value="deposit">예금</option>
                                    <option value="savings">적금</option>
                                    <option value="investment">투자</option>
                                </select>
                            </div>

                            {/* 정렬 옵션 */}
                            <div className="flex-1 relative">
                                <div
                                    onClick={() => {
                                        setSortOption(prev => prev === 'rate' ? 'amount' : 'rate');
                                        setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
                                    }}
                                    className="w-full border rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer"
                                >
                                    <span>
                                        {sortOption === 'rate'
                                            ? `금리 ${sortDirection === 'desc' ? '높은' : '낮은'}순`
                                            : `최소가입금액 ${sortDirection === 'desc' ? '높은' : '낮은'}순`}
                                    </span>
                                    <ArrowUpDown className="w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 즐겨찾기 상품 섹션 */}
                    {favoriteProducts.length > 0 && (
                        <div className="px-6 py-4 bg-gray-50 border-b">
                            <h3 className="font-bold text-lg mb-3">내 즐겨찾기 상품</h3>
                            <div className="space-y-3">
                                {favoriteProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{product.title}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getTagClasses(product.tagColor)}`}>
                                                        {product.tag}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{product.description}</p>
                                                <p className="text-xs text-blue-600 mt-1">{product.benefit}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleFavoriteToggle(product.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-full"
                                                >
                                                    <Heart
                                                        className="w-5 h-5 fill-red-500 text-red-500"
                                                    />
                                                </button>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 전체 상품 리스트 */}
                    <div className="px-6 py-4">
                        <h3 className="font-bold text-lg mb-3">
                            전체 상품 ({filteredAndSortedProducts.length}개)
                        </h3>
                        <div className="space-y-4">
                            {filteredAndSortedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">{product.title}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getTagClasses(product.tagColor)}`}>
                                                    {product.tag}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{product.description}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <div>
                                                    <span className="text-sm text-gray-600">최소가입금액</span>
                                                    <p className="font-medium">
                                                        {product.minAmount === 0
                                                            ? '제한 없음'
                                                            : `₩${product.minAmount.toLocaleString()}`}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm text-gray-600">금리</span>
                                                    <p className="font-bold text-blue-600">{product.interestRate}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            <button
                                                onClick={() => handleFavoriteToggle(product.id)}
                                                className="p-2 hover:bg-gray-200 rounded-full"
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${product.isFavorite
                                                        ? 'fill-red-500 text-red-500'
                                                        : 'text-gray-400'}`}
                                                />
                                            </button>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
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

export default GiftPage;