//LYGZPN74JR3PDJQAAZ3W
//ZAZW37GCQUGLBHN74VDZ

//KEDQ5AXG7WKU5TMYSE75
const axios = require("axios");
class Api {
  constructor(baseURL) {
    //this.baseURL = baseURL;
    this.api = axios.create({
      baseURL: "https://www.eventbriteapi.com/v3/",
      headers: { Authorization: `Bearer ZAZW37GCQUGLBHN74VDZ` },
    });
  }

  //////// GET THE USER'S INFO
  getUser = () => this.api.get(`users/me/`);

  ///////////GET THE USER'S ORGANIZATIONS

  getUsersOrganization = () => this.api.get(`users/me/organizations/`)


  ////// GET ALL EVENTS BY ORGANIZATION ID

  getAllEventsByOrganization = (organizationId) =>
    this.api.get(`organizations/${organizationId}/events/`);

  /////////// GET A SPECIFIC EVENT

  getEvent = (eventId) => this.api.get(`events/${eventId}/`);

  ////////// GET A VENUE

  getVenue = (venueId) => this.api.get(`venues/${venueId}/`)

  /////////// GET A TICKET CLASS

  getTicket = (eventId) => this.api.get(`events/${eventId}/ticket_classes/`);
}

module.exports = new Api();
