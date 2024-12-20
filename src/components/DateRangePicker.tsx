'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  const minDate = new Date('2024-01-01');
  const maxDate = new Date('2024-09-31');

  return (
    <div className="flex space-x-4">
      <div>
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      <div>
        <label>End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;