export class FreeTickets{
    constructor(name, description, quantity, sold){
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        if(quantity === sold) this.status = "SOLD OUT"
        else this.status = "AVAILABLE" + quantity
    }
}