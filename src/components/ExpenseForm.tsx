import React, { useEffect, useState } from 'react';
import { Expense } from '../types';

interface Props {
  onAddOrUpdate: (expense: Expense) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

const ExpenseForm: React.FC<Props> = ({ onAddOrUpdate, editingExpense, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Expense = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      title,
      amount: parseFloat(amount),
      date,
    };
    onAddOrUpdate(updated);
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="number" value={amount} required onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="date" value={date} required onChange={(e) => setDate(e.target.value)} />
      <button type="submit">{editingExpense ? 'Update' : 'Add'}</button>
      {editingExpense && <button onClick={onCancelEdit} type="button">Cancel</button>}
    </form>
  );
};

export default ExpenseForm;
