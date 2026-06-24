const displayTotal = document.querySelector("#total");
const expenseName = document.querySelector("#exp-name");
const expenseAmount = document.querySelector("#exp-amt");
const button = document.querySelector("#add-exp");
const expenseList = document.querySelector("#exp-list");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let getInput = () => {
  if (!expenseName.value.trim() || !expenseAmount.value.trim()) {
    return;
  }
  if (Number(expenseAmount.value) <= 0) {
    return;
  }
  let expense = {
    name: expenseName.value,
    amount: Number(expenseAmount.value),
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  showOutput();

  expenseName.value = "";
  expenseAmount.value = "";
};

let showOutput = () => {
  if (expenses.length === 0) {
    expenseList.innerHTML = "No Expenses Added Yet";
    displayTotal.innerHTML = "₹0";
    return;
  }

  let displayArea = "";
  expenses.forEach((i, index) => {
    let { name, amount } = i;
    displayArea += `<div>• ${name}  – ₹${amount} <button class="delete-btn" onclick="deleteExpense(${index})"><i class="fa-solid fa-trash-can"></i></button></div>`;
  });

  let total = 0;
  expenses.forEach((i) => {
    total += i.amount;
  });

  expenseList.innerHTML = displayArea;
  displayTotal.innerHTML = `₹${total}`;
};

let deleteExpense = (index) => {
  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  showOutput();
};

button.addEventListener("click", getInput);

expenseAmount.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getInput();
  }
});
expenseName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getInput();
  }
});

showOutput();
