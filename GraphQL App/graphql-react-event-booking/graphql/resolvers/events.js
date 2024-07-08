const Event = require('../../models/event');
const User = require('../../models/user');
const {transformEvent} = require('./merge');


module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event)
            })

        } catch (error) {
            throw err;
        }
    },
    createEvent: async x => {
        const event = new Event({
            title: x.eventInput.title,
            description: x.eventInput.description,
            price: +x.eventInput.price,
            date: new Date(x.eventInput.date),
            creator: '668815261459a96e0b5d7c4d'

        })
        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = transformEvent(result);
            const creator = await User.findById('668815261459a96e0b5d7c4d')

            if (!creator) {
                throw new Error('User not found')
            }
            creator.createdEvents.push(event)
            await creator.save();
            return createdEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};


// const events = async eventIds => {

//     try {
//         const events = await Event.find({ _id: { $in: eventIds } })
//         return events.map(event => {
//             return transformEvent(event);
//         });
//     } catch (error) {

//     }
// }