const bcrypt = require('bcryptjs')
const Event = require('../../models/event');
const User = require('../../models/user');


const events = async eventIds => {

    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        events.map(event => {
            return {
                ...event._doc, _id: event.id,
                date: new Date(event._doc.date).toISOString(), creator: user.bind(this, event.creator)
            }
        })
        return events;
    } catch (error) {

    }
}




const user = async userID => {
    try {
        const user = await User.findById(userID)
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return {
                    ...event._doc, _id: event.id,
                    date: new Date(event._doc.date).toISOString()
                    , creator: user.bind(this, event._doc.creator)
                }
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
            createdEvent = { ...result._doc, _id: result._doc._id.toString(), creator: user.bind(this, result._doc.creator) };
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
    },
    createUser: async x => {
        try {
            const existingUser = await User.findOne({ email: x.userInput.email })
            if (existingUser) {
                throw new Error('User exists already')
            }
            const hashedPassword = await bcrypt.hash(x.userInput.password, 12)

            const user = new User({
                email: x.userInput.email,
                password: hashedPassword
            })
            const result = await user.save()
            return { ...result._doc, password: null, _id: result.id }
            
        } catch (err) {
            throw err;
        }
    }
}