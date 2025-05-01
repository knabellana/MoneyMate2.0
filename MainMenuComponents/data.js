// js/expense.js

import { updateBalance } from './income.js';

export function setupExpenses() {
  const category = document.getElementById('category');
  const amount = document.getElementById('amount');
  const date = document.getElementById('date');
  const note = document.getElementById('note');
  const addExpenseBtn = document.getElementById('add-expense-btn');
  const tableBody = document.querySelector('#transaction-table tbody');
  const totalExpensesDisplay = document.getElementById('total-expenses');

  function renderExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    tableBody.innerHTML = '';

    let total = 0;

    expenses.forEach((expense, index) => {
      total += parseFloat(expense.amount);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td>₱ ${parseFloat(expense.amount).toFixed(2)}</td>
        <td>${expense.note || ''}</td>
        <td>
          <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    totalExpensesDisplay.textContent = `₱ ${total.toFixed(2)}`;
    updateBalance();
  }

  function saveExpense(expense, index = null) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (index !== null) {
      expenses[index] = expense;
    } else {
      expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }

  addExpenseBtn.addEventListener('click', () => {
    const expense = {
      category: category.value,
      amount: amount.value,
      date: date.value,
      note: note.value,
    };

    if (!expense.category || !expense.amount || !expense.date) {
      alert('Please complete all required fields.');
      return;
    }

    saveExpense(expense);
    category.selectedIndex = 0;
    amount.value = '';
    date.value = '';
    note.value = '';
  });

  tableBody.addEventListener('click', (e) => {
    const index = e.target.closest('button')?.dataset.index;
    if (!index) return;

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (e.target.closest('.delete-btn')) {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    } else if (e.target.closest('.edit-btn')) {
      const expense = expenses[index];
      category.value = expense.category;
      amount.value = expense.amount;
      date.value = expense.date;
      note.value = expense.note;

      // Temporarily override the add button to perform update
      addExpenseBtn.textContent = 'Update Expense';
      addExpenseBtn.onclick = () => {
        const updatedExpense = {
          category: category.value,
          amount: amount.value,
          date: date.value,
          note: note.value,
        };
        saveExpense(updatedExpense, index);
        addExpenseBtn.textContent = 'Add Expense';
        addExpenseBtn.onclick = null;
        setupExpenses(); // Reinitialize to restore event listeners
      };
    }
  });

  renderExpenses();
}
