import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../classes/UserClass";
import { PhisicalEvent } from "../classes/PhisicalEventClass";
import { OnlineEvent } from "../classes/OnlineEventClass";
import Moment from "moment";

import Switch from "../switch";
const Api = require("../api/api");

function Home() {
  const [userName, setUserName] = useState([]);
  const [events, setEvents] = useState([]);
  const [showOnline, setShowOnline] = useState(false)
  

  const eventsList = [];
  let userOrgId;
  let eventInfo;
  let venueInfo;

  

  useEffect(() => {
    createHome();
  }, []);
  

  async function createHome() {
    const user = await Api.getUser();

    const organization = await Api.getUsersOrganization();
    userOrgId = organization.data.organizations[0].id;
    createUser(user, userOrgId);

    const events = await Api.getAllEventsByOrganization(userOrgId);
    eventInfo = events.data.events;

    for (let i = 0; i < eventInfo.length; i++) {
      if (eventInfo[i].venue_id != null) {
        const venue = await Api.getVenue(eventInfo[i].venue_id);
        venueInfo = venue.data;
        createPhisicalEvent(eventInfo[i], venueInfo);
      } else {
        createOnlineEvent(eventInfo[i]);
      }
    }
    setEvents(eventsList);
  }

  function createUser(response, userOrgId) {
    const currentUser = new User(
      response.data.name,
      response.data.id,
      userOrgId
    );
    setUserName(response.data.name);
  }

  function createPhisicalEvent(eventInfo, venueInfo) {
    const currentEvent = new PhisicalEvent(
      eventInfo.id,
      eventInfo.name.text,
      eventInfo.description.text,
      new Date(eventInfo.start.local),
      eventInfo.logo.url,
      eventInfo.online_event,
      venueInfo.address.city
    );
    eventsList.push(currentEvent);
  }

  function createOnlineEvent(eventInfo) {
    const currentEvent = new OnlineEvent(
      eventInfo.id,
      eventInfo.name.text,
      eventInfo.description.text,
      new Date(eventInfo.start.local),
      eventInfo.logo.url,
      eventInfo.online_event
    );
    eventsList.push(currentEvent);
    console.log(eventsList)

  }

  //createHome();





  return (
    <div className="App">
      <header className="App-header">
        <div tyle={{ color: 'red' }}>Hello {userName}</div>



        
        <div>

        <div>
        <div style={{ color: 'red' }}>

        Your events in San Francisco:
        </div>
          {events.map((e) => (
            e.city === "San Francisco" &&
            <ul key={e.id + 1}>
              <Link to={`/event/${e.id}`}>
                <b>{e.name}</b>
                <div>{e.description}</div>
                <div>{Moment(e.date).format("DD-MM-YYYY")}</div>
                <div>{e.city}</div>
                <div>{e.online ? <div>ONLINE</div> : <div>PHISICAL</div>}</div>
              </Link>
            </ul>
          )
          
          )}


        </div>
        <div tyle={{ color: 'red' }}>

        All your events:
        </div>
          {events.map((e) => (
            
            <ul key={e.id}>
              <Link to={`/event/${e.id}`}>
                <b>{e.name}</b>
                <div>{e.description}</div>
                <div>{Moment(e.date).format("DD-MM-YYYY")}</div>
                <div>{e.city}</div>
                <div>{e.online ? <div>ONLINE</div> : <div>PHISICAL</div>}</div>
              </Link>
            </ul>
          )
          
          )}


          {/*showOnline ? <div>asdasd</div> : <div>laksdjlaksd</div>*/}


        <div>

        </div>


        </div>



      </header>
    </div>
  );
}

export default Home;
