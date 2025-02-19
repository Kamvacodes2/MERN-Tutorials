const Event = require('../../models/event');
const Booking = require('../../models/booking');
const {transformBooking, transformEvent} = require('./merge')

module.exports = {
    bookings: async (x, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try {
            const bookings = await Booking.find({user: req.userId});
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (error) {
            throw error
        }
    },
    bookEvent: async (x, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        const fetchedEvent = await Event.findOne({ _id: x.eventId })
        const booking = new Booking({
            event: fetchedEvent,
            user: req.userId
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async (x, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try {
        const booking = await Booking.findById(x.bookingId).populate('event');
        const event = transformEvent(booking.event)
         await Booking.deleteOne({_id: x.bookingId})
         return event;
        } catch (error) {
            throw error;
        }
    }
}

