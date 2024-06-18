const jwt = localStorage.getItem("jwt");
if (!jwt) {
  window.location.href = "../login/login.html";
}

fetch("http://localhost:3000/user/list_all", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: jwt,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const users = data.users;
    const headers = ["id", "name", "lastName", "age", "address", "email"];

    const tableBody = document.getElementById("table-body");
    users.forEach((user) => {
      const row = document.createElement("tr");
      headers.forEach((header) => {
        const col = document.createElement("td");
        col.textContent = user[header];
        row.appendChild(col);
      });

      tableBody.appendChild(row);
    });
  });
