const authResolver = require('./auth');
const bookingResolver = require('./booking');
const eventsResolver = require('./events');


const rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver
};

module.exports = rootResolver;
// event: singleEvent.bind(this, booking._doc.event),
// user: user.bind(this, booking._doc.user),
