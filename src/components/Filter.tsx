import React from 'react';

interface Props {
  selectedMonth: string;
  onChange: (month: string) => void;
}

const Filter: React.FC<Props> = ({ selectedMonth, onChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Filter by Month: </label>
      <select value={selectedMonth} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {[...Array(12)].map((_, i) => {
          const monthValue = (i + 1).toString().padStart(2, '0');
          return (
            <option key={monthValue} value={monthValue}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;