// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: 'Full name can\'t be empty'
//     },
//     email: {
//         type: String,
//         required: 'Email can\'t be empty',
//         unique: true
//     },
//     password: {
//         type: String,
//         required: 'Password can\'t be empty',
//         minlength : [4,'Password must be at least 4 character long']
//     },
//     saltSecret: String
// });

// //mongoose.model('User', userSchema); //added this myself cuz of the vid

// // Custom validation for email
// userSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

// // Events
// // userSchema.pre('save', function (next) {
// //     bcrypt.genSalt(10, (err, salt) => {
// //         bcrypt.hash(this.password, salt, (err, hash) => {
// //             this.password = hash;
// //             this.saltSecret = salt;
// //             next();
// //         });
// //     });
// // });


// //mongoose.model('User', userSchema);
// // below is from YT vid
// export default mongoose.model('User', userSchema);

//new below
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);