class User {

  constructor(id, username, role, email, password, tickets) {
      this.id = id;
      this.username = username;
      this.role = role
      this.email = email;
      this.password = password;
      this.tickets = tickets;
  }
}

module.exports = User;