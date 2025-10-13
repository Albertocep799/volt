import React, { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import './DateFilter.scss';

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const DateFilter: React.FC = () => {
  const [interval, setInterval] = useState('Daily');
  const [isIntervalOpen, setIntervalOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(new Date('2025-08-03T00:00:00'));
  const [endDate, setEndDate] = useState<Date | null>(new Date('2025-08-08T00:00:00'));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01T00:00:00'));
  const [calendarView, setCalendarView] = useState<'days' | 'months'>('days');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
        setIntervalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIntervalSelect = (option: string) => {
    setInterval(option);
    setIntervalOpen(false);
  };

  const changeCalendarPeriod = (e: React.MouseEvent, amount: number) => {
    e.stopPropagation();
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (calendarView === 'days') {
        newDate.setMonth(newDate.getMonth() + amount);
      } else {
        newDate.setFullYear(newDate.getFullYear() + amount);
      }
      return newDate;
    });
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setCalendarView('days');
  };

  const renderDaysView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    const days = Array.from({ length: 42 }, (_, i) => {
        const dayNumber = i - dayOffset;
        if (dayNumber > 0 && dayNumber <= daysInMonth) {
            return { day: dayNumber, isCurrent: true, date: new Date(year, month, dayNumber) };
        } else if (dayNumber <= 0) {
            return { day: daysInPrevMonth + dayNumber, isCurrent: false, date: new Date(year, month - 1, daysInPrevMonth + dayNumber) };
        } else {
            return { day: dayNumber - daysInMonth, isCurrent: false, date: new Date(year, month + 1, dayNumber - daysInMonth) };
        }
    });

    return (
      <div className="calendar-grid days-grid">
        {days.map((d, i) => {
            const dayTime = d.date.getTime();
            const isStartDate = startDate && d.isCurrent && dayTime === startDate.getTime();
            const isEndDate = endDate && d.isCurrent && dayTime === endDate.getTime();

            let isPartOfRange = false;
            if (startDate && endDate && d.isCurrent) {
                isPartOfRange = dayTime >= startDate.getTime() && dayTime <= endDate.getTime();
            } else if (startDate && !endDate && hoverDate && d.isCurrent) {
                const start = Math.min(startDate.getTime(), hoverDate.getTime());
                const end = Math.max(startDate.getTime(), hoverDate.getTime());
                isPartOfRange = dayTime >= start && dayTime <= end;
            }

            const cellClasses = [
                'calendar-cell',
                !d.isCurrent ? 'disabled' : '',
                isPartOfRange ? 'in-range' : '',
                (isStartDate && isPartOfRange) ? 'start-date' : '',
                (isEndDate && isPartOfRange) ? 'end-date' : '',
            ].filter(Boolean).join(' ');
            
            return (
              <div 
                key={i} 
                className={cellClasses}
                onClick={() => d.isCurrent && handleDayClick(d.day)}
                onMouseEnter={() => d.isCurrent && setHoverDate(d.date)}
                onMouseLeave={() => setHoverDate(null)}
              >
                <span className='day-number'>{d.day}</span>
              </div>
            );
        })}
      </div>
    );
  };

  const renderMonthsView = () => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return (
        <div className="calendar-grid months-grid">
            {months.map((month, index) => (
                <div key={index} className="calendar-cell month-cell" onClick={() => handleMonthSelect(index)}>
                    {month}
                </div>
            ))}
        </div>
    );
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const monthName = currentMonth.toLocaleString('es-ES', { month: 'long' });

    return (
      <div className="calendar-dropdown" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-header">
          <button onClick={(e) => changeCalendarPeriod(e, -1)}><FaChevronLeft /></button>
          <div className="calendar-title" onClick={() => calendarView === 'days' && setCalendarView('months')}>
            {calendarView === 'days' ? `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}` : year}
          </div>
          <button onClick={(e) => changeCalendarPeriod(e, 1)}><FaChevronRight /></button>
        </div>
        {calendarView === 'days' && (
          <>
            <div className="calendar-weekdays">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>
            <hr className="calendar-divider" />
          </>
        )}
        {calendarView === 'days' ? renderDaysView() : renderMonthsView()}
      </div>
    );
  };

  return (
    <div className="date-filter-container" ref={containerRef}>
      <div className="filter-group">
        <label>Interval</label>
        <div className="custom-select-wrapper">
          <div className="custom-select-trigger" onClick={() => setIntervalOpen(!isIntervalOpen)}>
            <span>{interval}</span>
            <FaChevronDown className="chevron-icon" />
          </div>
          {isIntervalOpen && (
            <div className="custom-options">
              {['Daily', 'Weekly', 'Monthly'].map(opt => (
                <div key={opt} className={`custom-option ${interval === opt ? 'selected' : ''}`} onClick={() => handleIntervalSelect(opt)}>{opt}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range-picker" onClick={() => setCalendarOpen(!isCalendarOpen)}>
          <span>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
          <FaCalendarAlt className="calendar-icon" />
          {isCalendarOpen && renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
