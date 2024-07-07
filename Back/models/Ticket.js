class Ticket {

  constructor(id, location, price, user, date, valid) {
      this.id = id;
      this.location = location;
      this.price = price;
      this.userId = user;
      this.date = date;
      this.valid = valid;
  }
}

module.exports = Ticket;