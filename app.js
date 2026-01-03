const totalBudget = document.getElementById("totalBudget");
const remainingBudget = document.getElementById("remainingBudget");
const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const alertMsg = document.getElementById("alert");

budget = 0;
remaining = 0;
amount = 0;

function saveToLocal() {
  localStorage.setItem("budget", budget);
  localStorage.setItem("remaining", remaining);
  localStorage.setItem("expenses", expenseList.innerHTML);
}

//budget form event
budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  budget = Number(budgetInput.value);
  remaining = budget;

  totalBudget.innerHTML = budget;
  remainingBudget.innerHTML = remaining;
  saveToLocal();
  budgetInput.value = "";
  expenseList.innerHTML = "";
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  amount = Number(expenseAmount.value);
  title = expenseName.value;

  if (amount > remaining) {
    alertMsg.classList.remove("hidden");
    return;
  }

  alertMsg.classList.add("hidden");
  remaining -= amount;
  remainingBudget.innerHTML = remaining;
  let displayDiv = document.createElement("div");
  displayDiv.innerHTML = `
  <span> ${title} </span>
  <span> ${amount} </span>
  `;
  displayDiv.className =
    "flex justify-between border border-red-300 bg-red-50 p-3 rounded-lg ";
  expenseList.appendChild(displayDiv);
  saveToLocal();
  expenseName.value = "";
  expenseAmount.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  savedBudget = localStorage.getItem("budget");
  savedRemaining = localStorage.getItem("remaining");
  savedExpenses = localStorage.getItem("expenses");

  if (savedBudget) {
    totalBudget.innerHTML = savedBudget;
  }
  if (savedRemaining) {
    remainingBudget.innerHTML = savedRemaining;
  }
  if (savedExpenses) {
    expenseList.innerHTML = savedExpenses;
  }
});
