const User = require('../models/Blogger');

module.exports = (function () {

    // createAdmin();

})();

// function createAdmin(){
//     User.findOne({role: 'admin'}, (err, existAdmin) => {
//         if (err) return console.log('err in create admin.');
//         if (existAdmin) return console.log('admin already exest.');
//
//         new User({
//             firstName: "admin",
//             lastName: "admin",
//             userName: "admin",
//             password: "123456",
//             role: "admin",
//             gender: true,
//             mobile: "09177477549"
//         }).save(err => {
//             if (err) return console.log('err in create admin.');
//             console.log('admin created.');
//         });
//     });
// }
