// ui.js

import { expenses, getTotalExpenses, getRemainingBalance } from './data.js';

const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expenses');
const balanceDisplay = document.getElementById('remaining-balance');
const tableBody = document.querySelector('#transaction-table tbody');

export function renderSummary() {
  expenseDisplay.textContent = `₱ ${getTotalExpenses().toFixed(2)}`;
  balanceDisplay.textContent = `₱ ${getRemainingBalance().toFixed(2)}`;
}

export function renderIncome(amount) {
  incomeDisplay.textContent = `₱ ${parseFloat(amount).toFixed(2)}`;
  renderSummary();
}

export function renderExpenses() {
  tableBody.innerHTML = '';
  expenses.forEach((exp, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${exp.category}</td>
      <td>${exp.date}</td>
      <td>₱ ${parseFloat(exp.amount).toFixed(2)}</td>
      <td>${exp.note}</td>
      <td>
        <button class="edit-btn" data-index="${index}">✏️</button>
        <button class="delete-btn" data-index="${index}">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  renderSummary();
}
