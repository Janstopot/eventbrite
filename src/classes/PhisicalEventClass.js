export class PhisicalEvent{
    constructor(id, name, description, date, image, online, city){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.image = image;
        this.online = online;
        if(online === false) this.city = city
        else this.city = "Online event"
    }
}