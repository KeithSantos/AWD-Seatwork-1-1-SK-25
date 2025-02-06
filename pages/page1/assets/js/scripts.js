let balance = parseFloat(localStorage.getItem('balance')) || 5000;
const transactionList = JSON.parse(localStorage.getItem('transactions')) || [];
const validUsername = "Keith";
const validPassword = "Keith1";

const MAX_BALANCE = 1000000;
const MIN_WITHDRAW = 500;
const MIN_DEPOSIT = 100;
const MAINTAINING_BALANCE = 500;

function updateBalance() {
  document.getElementById('balanceAmount').innerText = `₱${balance.toFixed(2)}`;
  localStorage.setItem('balance', balance);
}

function deposit() {
  const amount = parseFloat(document.getElementById('depositAmount').value);
  if (!isNaN(amount) && amount >= MIN_DEPOSIT) {
    if (balance + amount <= MAX_BALANCE) {
      balance += amount;
      transactionList.push(`Deposited: ₱${amount.toFixed(2)}`);
      updateTransactionList();
      updateBalance();
      document.getElementById('depositAmount').value = '';
      localStorage.setItem('transactions', JSON.stringify(transactionList));
    } else {
      alert("Cannot exceed maximum balance of ₱1,000,000.");
    }
  } else {
    alert("Minimum deposit amount is ₱100.");
  }
}

function withdraw() {
  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  if (!isNaN(amount) && amount >= MIN_WITHDRAW) {
    if (balance - amount >= MAINTAINING_BALANCE) {
      balance -= amount;
      transactionList.push(`Withdrew: ₱${amount.toFixed(2)}`);
      updateTransactionList();
      updateBalance();
      document.getElementById('withdrawAmount').value = '';
      localStorage.setItem('transactions', JSON.stringify(transactionList));
    } else {
      alert("Insufficient balance. You must maintain a minimum balance of ₱500.");
    }
  } else {
    alert("Minimum withdrawal amount is ₱500.");
  }
}

function updateTransactionList() {
  const transactionListElement = document.getElementById('transactionList');
  transactionListElement.innerHTML = '';
  transactionList.forEach(transaction => {
    const li = document.createElement('li');
    li.innerText = transaction;
    transactionListElement.appendChild(li);
  });
}

function showLogOutButton() {
  const logOutButton = document.getElementById('logOutButton');
  logOutButton.style.display = 'block';
}

function logIn() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === validUsername && password === validPassword) {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    showLogOutButton();
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

updateBalance();
updateTransactionList();

window.onload = function() {
  document.getElementById('loginModal').style.display = 'block';

  document.getElementById('username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      logIn();
    }
  });

  document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      logIn();
    }
  });
};