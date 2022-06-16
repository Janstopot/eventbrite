import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaidTickets } from "../classes/PaidticketsClass";
import { FreeTickets } from "../classes/FreeTicketClass";

const Api = require("../api/api");

function Tickets() {
  const [ticketInfo, setTicketInfo] = useState([]);
  let paidTicketList = [];
  let freeTicketList = [];

  let id = useParams().id;

  useEffect(() => {
    Api.getTicket(id).then((response) => {
      setTicketInfo(response.data.ticket_classes);
    });
  }, []);

  for (let i = 0; i < ticketInfo.length; i++) {
    if (ticketInfo[i].free === false) {
      const currentTicket = new PaidTickets(
        ticketInfo[i].name,
        ticketInfo[i].cost.display,
        ticketInfo[i].cost.currency,
        ticketInfo[i].description,
        ticketInfo[i].quantity_total,
        ticketInfo[i].quantity_sold
      );
      paidTicketList.push(currentTicket);
    } else if (ticketInfo[i].free === true) {
      const currentTicket = new FreeTickets(
        ticketInfo[i].name,
        ticketInfo[i].description,
        ticketInfo[i].quantity_total,
        ticketInfo[i].quantity_sold
      );
      freeTicketList.push(currentTicket);
    }

    paidTicketList.sort((a, b) => {
      return parseInt(a.cost.slice(1)) - parseInt(b.cost.slice(1));
    });
  }

  return (
    <div>
      <div>PAID TICKETS</div>
      <hr></hr>
      <div>
        {paidTicketList.map((t) => (
          <ul key={t.id}>
            <b>{t.name}</b>
            <div>{t.cost}</div>
            <div>{t.currency}</div>
            <div>{t.description}</div>
            <div>{t.quantity}</div>
            <div>{t.status}</div>
            <hr></hr>
          </ul>
        ))}
      </div>

      <hr></hr>
      <hr></hr>

      <div>FREE TICKETS</div>
      <hr></hr>
      <div>
        {freeTicketList.map((t) => (
          <ul key={t.id}>
            <b>{t.name}</b>
            <div>{t.description}</div>
            <div>{t.quantity}</div>
            <div>{t.status}</div>
            <hr></hr>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Tickets;
