// js/income.js

export function setupIncome() {
  const incomeInput = document.getElementById('income-input');
  const saveBtn = document.getElementById('save-income-btn');
  const totalIncomeDisplay = document.getElementById('total-income');

  saveBtn.addEventListener('click', () => {
    const incomeValue = parseFloat(incomeInput.value);
    if (!isNaN(incomeValue) && incomeValue >= 0) {
      localStorage.setItem('income', incomeValue);
      totalIncomeDisplay.textContent = `₱ ${incomeValue.toFixed(2)}`;
      updateBalance();
    }
  });

  const storedIncome = localStorage.getItem('income');
  if (storedIncome) {
    totalIncomeDisplay.textContent = `₱ ${parseFloat(storedIncome).toFixed(2)}`;
  }
}

export function updateBalance() {
  const income = parseFloat(localStorage.getItem('income')) || 0;
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const remaining = income - totalExpenses;
  document.getElementById('remaining-balance').textContent = `₱ ${remaining.toFixed(2)}`;
}
