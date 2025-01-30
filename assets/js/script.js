let users = [
  {
      email: "keith@gmail.com",
      password: "password123",
      name: "Keith Santos",
      balance: 5000,
      history: [],
  },
];

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
      alert("Invalid email or password.");
      return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "./AWD-Seatwork-1-1-SK-25/pages/page1";
}

document.getElementById("loginButton").addEventListener("click", login);