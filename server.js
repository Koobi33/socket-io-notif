const app = require('express')();
const http = require('http').createServer(app);
const io = module.exports.io =  require('socket.io')(http);
const jwtAuth = require('socketio-jwt-auth');
const axios = require('axios');
const mysql = require('mysql');
const path = require('path');
const dbknex = {
    client: 'mysql',
    connection: {
        host: '35.204.124.30',
        user: 'root',
        password: 'admin',
        database: 'users'
    }
};

const knex = require('knex')(dbknex);

function getConnection() {
    return mysql.createConnection({
        host: '35.204.124.30',
        port: '3306',
        user: 'root',
        password: 'admin',
        database: 'users',
    });
}

const db = {
    host: '35.204.124.30',
    user: 'root',
    password: 'admin',
    table: 'users',
};

// using middleware
// io.use(jwtAuth.authenticate({
//     secret: 'justwe',    // required, used to verify the token's signature
//     algorithm: 'HS256',        // optional, default to be HS256
//     succeedWithoutToken: true
// }, async function(payload, done) {
//     // you done callback will not include any payload data now
//     // if no token was supplied
//     if (payload && payload.userID) {
//         let user = await knex.from('users').select("*").where('id', '=', payload.userID);
//
//         // User.findOne({id: payload.sub}, function(err, user) {
//         function check(err, user) {
//             if (err) {
//                 // return error
//                 return done(err);
//             }
//             if (!user) {
//                 // return fail with an error message
//                 return done(null, false, 'user does not exist');
//             }
//             // return success with a user info
//             else {
//                 return done(null, user)
//             }
//         }
//         check(null, user);
//     } else {
//             return done() // in your connection handler user.logged_in will be false
//         }
//     }
// ));



io.on('connection', function(socket) {

   // socket.id = socket.request.user[0].id;
    console.log('Authentication passed!', socket.id);
    let test = socket.id;
    socket.on('sub', (room) => {
       socket.join(room);
       console.log(socket.id, 'has been joined to ', room)
    });
    socket.on('create', function (room) {
       socket.join(room);
       socket.leave(room, ()=>{});
        console.log(room, 'room has been created');
    });
    // now you can access user info through socket.request.user
    // socket.request.user.logged_in will be set to true if the user was authenticated
    // socket.emit('success', {
    //     message: 'success logged in!',
    //     user: socket.request.user,
    //     sock: test
    // });
    socket.on('room', () => {
        console.log(io.sockets.adapter.rooms, 'all sockets in all rooms');
    });
    socket.on('sendhello', (room) => {
        console.log(room, 'roomname to say hello');
        socket.in(room).emit('alarm');
    })
});


const PORT = process.env.PORT || 3030;
app.get('*', (req, res) => {
//getConnection(dbknex);

    res.sendFile(
        path.join(__dirname, 'ws.html'));
});

//io.on('connection', () => {
//     console.log('hello');
// });

http.listen(PORT, () => {
    console.log('server started on ' + PORT);
});
