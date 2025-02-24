fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const table = document.querySelector('#userTable tbody');
    users.forEach(user => {
      const address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${address}</td>
      `;
      table.appendChild(tr);
    });
  })
  .catch(error => console.error('Ошибка при получении данных пользователей:', error));
