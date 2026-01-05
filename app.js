// get all elements
const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const totalBudget = document.getElementById("totalBudget");
const remainingBudget = document.getElementById("remainingBudget");
const expForm = document.getElementById("expenseForm");
const expName = document.getElementById("expenseName");
const expAmount = document.getElementById("expenseAmount");
const expList = document.getElementById("expenseList");
const nameError = document.getElementById("nameError");
const amountError = document.getElementById("alert");

budget = 0;
remaining = 0;
amount = 0;

function saveToLocal() {
  localStorage.setItem("budget", budget);
  localStorage.setItem("remaining", remaining);
  localStorage.setItem("allExpenses", expList.innerHTML);
}

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  budget = Number(budgetInput.value);
  remaining = budget;
  console.log(remaining);

  totalBudget.innerHTML = budget;
  remainingBudget.innerHTML = remaining;
  saveToLocal();

  expList.innerHTML = "";
  budgetInput.value = "";
});

expForm.addEventListener("submit", (event) => {
  event.preventDefault();

  name = expName.value;
  amount = Number(expAmount.value);
  // console.log("name is:", name, "amount:", amount)

  if (amount > remaining) {
    amountError.classList.remove("hidden");
    return;
  }

  amountError.classList.add("hidden");
  remaining -= amount;
  remainingBudget.innerHTML = remaining;

  displayDiv = document.createElement("div");
  displayDiv.innerHTML = `
  <span> ${name} </span>
  <span>${amount} </span>
  `;
  displayDiv.className =
    "flex justify-between border border-red-300 bg-red-50 p-3 rounded-lg";
  expList.appendChild(displayDiv);

  saveToLocal();
  expName.value = "";
  expAmount.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  savedBudget = localStorage.getItem("budget");
  savedRemaining = Number(localStorage.getItem("remaining"));
  savedExpenses = localStorage.getItem("allExpenses");

  if (savedBudget) {
    totalBudget.innerHTML = savedBudget;
    console.log(savedBudget);
  }

  if (savedRemaining) {
    remaining = Number(savedRemaining);
    remainingBudget.innerHTML = remaining;
    console.log(remaining);
  }
  if (savedExpenses) {
    expList.innerHTML = savedExpenses;
  }
});
