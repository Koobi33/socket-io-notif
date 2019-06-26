import React from 'react';
import * as io from 'socket.io-client';

class Test extends React.Component{
    componentDidMount() {
        var socket = io('http://localhost:3030', {query: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjgxLCJuYW1lIjoi0JTQvNC40YLRgNC40LkiLCJpYXQiOjE1NjE1NTY3OTYsImV4cCI6MTU2MTU2MDM5Nn0.oCdbM6azveR0NsJjrYVZBe_-vAYNcCGbLszDG3KjjcA'});
       // console.log(socket);
        socket.on('connect', function (socket){
            console.log(socket);
        });
        // Connection failed
        socket.on('error', function(err) {
            console.log(err);
            throw new Error(err);
        });
        socket.on('success', function(data) {
            io.emit('room', {name: 'user' + data.user[0].userID});
            console.log(data.message);
            console.log(data);
            console.log('logged in: ' + data.user[0].email)
        });
        socket.on('hello', () => {
            console.log('hi from PUSH');
        });
    }

    render() {
        return(
            <div>
                <button onClick={() => {

                }}>TEST</button>
            </div>
        )
    }
}
export default Test;