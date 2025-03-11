import React, { useEffect, useState, useMemo } from "react";
import { generateDate, months } from "../../utils/calendar";
import dayjs from "dayjs";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function DayPicker({ onDateChange, recordData }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  // Memoize the calendar dates generation to prevent recalculation on every render
  const calendarDates = useMemo(() => {
    return generateDate(today.month(), today.year(), recordData);
  }, [today, recordData]);

  // Update parent component when date is selected
  useEffect(() => {
    // Use the correct format that matches your data filtering logic
    onDateChange(selectDate);
  }, [selectDate, onDateChange]);

  // Function to safely handle date selection
  const handleDateSelect = (date) => {
    if (dayjs.isDayjs(date)) {
      setSelectDate(date);
    } else {
      setSelectDate(dayjs(date));
    }
  };

  return (
    <div className="w-96 h-96">
      <div className="flex justify-between">
        <h1 className="font-semibold">{months[today.month()]}, {today.year()}</h1>
        <div className="flex items-center gap-5">
          <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
            setToday(today.month(today.month() - 1));
          }} />
          <h1 className="cursor-pointer" onClick={() => {
            setToday(currentDate);
            handleDateSelect(currentDate);
          }}>Today</h1>
          <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
            setToday(today.month(today.month() + 1));
          }} />
        </div>
      </div>
      <div className="w-full grid grid-cols-7 text-gray-600">
        {days.map((day, index) => (
          <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
        ))}
      </div>
      <div className="w-full grid grid-cols-7">
        {calendarDates.map(({ date, currentMonth, today: isToday, hasData }, index) => (
          <div key={index} className="h-14 border-t grid place-content-center text-sm">
            <h1 className={cn(
              currentMonth ? "" : "text-gray-400",
              isToday ? "border border-indigo-400" : "",
              selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-indigo-400 text-white" : "",
              "h-10 w-10 grid place-content-center rounded-full hover:bg-indigo-700 hover:text-white transition-all cursor-pointer relative"
            )}
            onClick={() => {
              handleDateSelect(date);
            }}
            >
              {date.date()}
              {hasData && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}