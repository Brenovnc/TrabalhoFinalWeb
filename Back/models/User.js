class User {

  constructor(id, username, email, password, tickets) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.tickets = tickets;
  }
}

module.exports = User;