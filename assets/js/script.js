let users = [
    {
      email: "keith@gmail.com",
      password: "password123",
      name: "Keith Santos",
      balance: 5000,
      history: [],
    },
  ];

  let currentUser = null;

  function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "../../pages/page1/index.html";
  }