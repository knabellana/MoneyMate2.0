// events.js

import { saveIncome, addExpense, deleteExpense, updateExpense } from './data.js';
import { renderIncome, renderExpenses } from './ui.js';

export function setupEventListeners() {
  document.getElementById('save-income-btn').addEventListener('click', () => {
    const incomeInput = document.getElementById('income-input').value;
    saveIncome(incomeInput);
    renderIncome(incomeInput);
  });

  document.getElementById('add-expense-btn').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const note = document.getElementById('note').value;

    if (category && amount && date) {
      const expense = { category, amount, date, note };
      addExpense(expense);
      renderExpenses();
      clearInputs();
    }
  });

  document.querySelector('#transaction-table tbody').addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('delete-btn')) {
      deleteExpense(index);
      renderExpenses();
    } else if (e.target.classList.contains('edit-btn')) {
      loadExpenseForEdit(index);
    }
  });

  function loadExpenseForEdit(index) {
    const exp = window.expenses[index];
    document.getElementById('category').value = exp.category;
    document.getElementById('amount').value = exp.amount;
    document.getElementById('date').value = exp.date;
    document.getElementById('note').value = exp.note;

    document.getElementById('add-expense-btn').textContent = 'Update Expense';
    document.getElementById('add-expense-btn').onclick = function () {
      const updatedExpense = {
        category: document.getElementById('category').value,
        amount: document.getElementById('amount').value,
        date: document.getElementById('date').value,
        note: document.getElementById('note').value
      };
      updateExpense(index, updatedExpense);
      renderExpenses();
      clearInputs();
      this.textContent = 'Add Expense';
      setupEventListeners(); // Reset events
    };
  }

  function clearInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
    document.getElementById('note').value = '';
  }
}
