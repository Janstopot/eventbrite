import "../App.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Moment from "moment";

const Api = require("../api/api");

function Events() {
  const [eventId, setEventId] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [date, setDate] = useState();

  let id = useParams().id;

  useEffect(() => {
    Api.getEvent(id).then((response) => {
      createEvent(response);
    });
  }, []);

  function createEvent(response) {
    setEventId(response.data.id)
    setName(response.data.name.text);
    setDescription(response.data.description.text);
    setImage(response.data.logo.url);
    setDate(new Date(response.data.start.local));
  }

  return (
    <div>
      <div>EVENTS PAGE</div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{Moment(date).format("DD-MM-YYYY")}</div>
      <img src={image} alt="Logo" />
      <div>
        <Link to={`/event/${eventId}/tickets`}>
          <button>See available tickets</button>
        </Link>
      </div>
    </div>
  );
}

export default Events;
