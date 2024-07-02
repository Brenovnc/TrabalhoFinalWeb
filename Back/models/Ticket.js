class Ticket {

  constructor(id, location, price, user, travelDate, date, valid) {
      this.id = id;
      this.location = location;
      this.price = price;
      this.user = user;
      this.travelDate = travelDate;
      this.date = date;
      this.valid = valid;
  }
}

module.exports = Ticket;