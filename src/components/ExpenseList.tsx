import React from 'react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.length === 0 && <p>No expenses found.</p>}
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            {expense.title} - ₹{expense.amount} on {expense.date}
            <button onClick={() => onEdit(expense)}>Edit</button>
            <button onClick={() => onDelete(expense.id)} style={{ background: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;