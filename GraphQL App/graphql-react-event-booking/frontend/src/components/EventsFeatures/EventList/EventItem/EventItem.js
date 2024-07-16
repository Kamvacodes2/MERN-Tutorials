import React from 'react';
import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className='event__list-item'>
        <div>
            <h1>{props.title}</h1>
            <h2>R{props.price} - {new Date(props.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.userId === props.creatorId ? <p>You are the owner of this Event</p>: <button onClick={props.onDetail.bind(this, props.eventId)} className='btn'>View Details</button>}
        </div>
    </li>
)

export default eventItem;