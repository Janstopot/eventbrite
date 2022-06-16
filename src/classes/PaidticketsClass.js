export class PaidTickets{
    constructor(name, cost, currency, description, quantity, sold){
        this.name = name;
        this.cost = cost;
        this.currency = currency;
        this.description = description;
        this.quantity = quantity;
        if(quantity === sold) this.status = "SOLD OUT"
        else this.status = "AVAILABLE" + quantity
    }
}