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

  // Store user data in localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "../../pages/page1/index.html";
}

// Add an event listener to the login button
document.getElementById("loginButton").addEventListener("click", login);