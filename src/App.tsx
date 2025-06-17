import React, { useEffect, useState } from 'react';
import { Expense } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';
import './styles.css';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('expenses');
    if (stored) setExpenses(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddOrUpdate = (expense: Expense) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((ex) => (ex.id === expense.id ? expense : ex))
      );
      setEditingExpense(null);
    } else {
      setExpenses((prev) => [expense, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const filteredExpenses = filterMonth
    ? expenses.filter((ex) => ex.date.split('-')[1] === filterMonth)
    : expenses;

  return (
    <div>
      <h1>Monthly Expense Tracker</h1>
      <Filter selectedMonth={filterMonth} onChange={setFilterMonth} />
      <ExpenseForm
        onAddOrUpdate={handleAddOrUpdate}
        editingExpense={editingExpense}
        onCancelEdit={handleCancelEdit}
      />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;