const DataLoader = require('dataloader')
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');


// this takes a batching function it can execute for different events
const eventLoader = new DataLoader((eventIds)=> {
    return events(eventIds);
})

const userLoader = new DataLoader((userIds) => {
    console.log(userIds)
    return User.find({_id: {$in: userIds}});
})

const events = async eventIds => {

    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (error) {

    }
}

const singleEvent = async eventId => {
    try {
        const event = await eventLoader.load(eventId.toString());
        return event;
    } catch (error) {
        throw error;
    }
}

const user = async userID => {
    try {
        const user = await userLoader.load(userID.toString())
        return { ...user._doc, 
            _id: user.id, 
            createdEvents: () => eventLoader.loadMany(this, user._doc.createdEvents) }
    } catch (error) {
        throw error;
    }
}

const transformEvent = event => {
    return {...event._doc, _id: event.id,
        date: dateToString(event._doc.date), 
        creator: user.bind(this, event.creator)}
}

const transformBooking = booking => {
    return {
        ...booking._doc, _id: booking.id,
        event: singleEvent.bind(this, booking._doc.event),
        user: user.bind(this, booking._doc.user),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

exports.transformEvent= transformEvent;
exports.transformBooking=transformBooking;
// exports.events = events;
// exports.user = user;
// exports.singleEvent = singleEvent;