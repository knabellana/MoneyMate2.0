// js/main.js

import { setupIncome } from './income.js';
import { setupExpenses } from './expense.js';
import { setupSummary } from './summary.js';
import { renderTransactions } from './ui.js';

// Initialize all modules after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  setupIncome();
  setupExpenses();
  setupSummary();
  renderTransactions();
});
