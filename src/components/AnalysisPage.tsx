import React, { useState } from 'react';
import { Crown, Medal, PieChart, ChevronLeft, ChevronRight } from 'lucide-react';

const AnalysisPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // 월 변경 핸들러
    const handleMonthChange = (direction: number) => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + direction);
            return newDate;
        });
    };


    // 달력 날짜 렌더링
    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayOfWeek = firstDay.getDay();
        const totalDays = lastDay.getDate();

        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= totalDays; i++) {
            days.push(i);
        }

        return days;
    };

    const calendarDays = renderCalendarDays();

    return (
        <div className="space-y-4 p-4">
            {/* 소비 랭킹 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">이번 달 소비 랭킹</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <Crown className="w-6 h-6 text-yellow-500" />
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <p className="font-medium">식비</p>
                                <p className="font-bold">₩450,000</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Medal className="w-6 h-6 text-gray-400" />
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <p className="font-medium">교통비</p>
                                <p className="font-bold">₩280,000</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                                <div className="bg-gray-400 h-4 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 캘린더 뷰 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">소비 캘린더</h3>
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => handleMonthChange(-1)} className="p-2">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <p className="font-bold">
                        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </p>
                    <button onClick={() => handleMonthChange(1)} className="p-2">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-px">
                    {/* 요일 제목 */}
                    {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                        <div
                            key={index}
                            className={`h-8 flex items-center justify-center text-sm font-medium 
                ${index === 0 ? "text-red-500" : ""}  // 일요일
                ${index === 6 ? "text-blue-500" : ""} // 토요일
                ${index !== 0 && index !== 6 ? "text-gray-500" : ""}`} // 기타 요일
                        >
                            {day}
                        </div>
                    ))}
                    {/* 날짜 */}
                    {calendarDays.map((day, index) => {
                        const today = new Date();
                        const isToday =
                            day &&
                            currentDate.getFullYear() === today.getFullYear() &&
                            currentDate.getMonth() === today.getMonth() &&
                            day === today.getDate();

                        return (
                            <div
                                key={index}
                                className={`h-12 flex items-center justify-center border border-gray-100
                    ${day ? "hover:bg-gray-50 cursor-pointer" : "bg-gray-50"}
                    ${index % 7 === 0 ? "text-red-500" : ""} // 일요일
                    ${index % 7 === 6 ? "text-blue-500" : ""} // 토요일
                    ${isToday ? "bg-red-50 text-red-600 font-bold" : ""}`} // 오늘 날짜 강조
                            >
                                {day || ""}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 지출 예측 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold mb-4">이번 달 지출 예측</h3>
                <div className="flex items-center justify-between">
                    <PieChart className="w-16 h-16 text-blue-600" />
                    <div className="text-right">
                        <p className="text-sm text-gray-600">예상 지출액</p>
                        <p className="text-xl font-bold text-blue-600">₩950,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisPage;
