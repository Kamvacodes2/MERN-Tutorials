const bcrypt = require('bcryptjs')
const User = require('../../models/user');


module.exports = {
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
    },
};