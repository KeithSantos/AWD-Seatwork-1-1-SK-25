let currentUser = null;

function loadUserData() {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    } else {
        currentUser = {
            name: "Guest",
            balance: 0,
            history: []
        };
        saveUserData();
    }
}

loadUserData();

if (!currentUser || !currentUser.name || currentUser.name === "Guest") {
    alert("You need to log in first.");
    window.location.href = "login.html";
} else {
    document.getElementById("userName").innerText = currentUser.name;
    document.getElementById("balance").innerText = currentUser.balance;
    updateHistory();
}

function deposit() {
    const amount = prompt("Enter deposit amount (Max: ₱1,000,000):");
    const deposit = parseFloat(amount);

    if (isNaN(deposit) || deposit <= 0 || deposit > 1000000) {
        alert("Invalid deposit amount.");
        return;
    }

    currentUser.balance += deposit;
    currentUser.history.push(`Deposited: ₱${deposit}`);
    document.getElementById("balance").innerText = currentUser.balance;
    updateHistory();
    saveUserData();
}

function withdraw() {
    const amount = prompt("Enter withdrawal amount (Max: ₱100,000):");
    const withdrawal = parseFloat(amount);

    if (isNaN(withdrawal) || withdrawal <= 0 || withdrawal > 100000) {
        alert("Invalid withdrawal amount.");
        return;
    }

    if (withdrawal > currentUser.balance) {
        alert("Insufficient balance.");
        return;
    }

    currentUser.balance -= withdrawal;
    currentUser.history.push(`Withdrew: ₱${withdrawal}`);
    document.getElementById("balance").innerText = currentUser.balance;
    updateHistory();
    saveUserData();
}

function updateHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    currentUser.history.forEach((entry) => {
        const li = document.createElement("li");
        li.innerText = entry;
        historyList.appendChild(li);
    });
}

function saveUserData() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.href = "../../../../../index.html";
}

document.getElementById("depositButton").addEventListener("click", deposit);
document.getElementById("withdrawButton").addEventListener("click", withdraw);
document.getElementById("logoutButton").addEventListener("click", logout);