import React from 'react';
import * as io from 'socket.io-client';

class Test extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            socket: null,
            user: null
        };
        this.createRoom = this.createRoom.bind(this);
        this.list = this.list.bind(this);
        this.subRoom = this.subRoom.bind(this);
        this.sendHello = this.sendHello.bind(this);
    }
    componentWillMount() {
        this.initSocket();
    }
    initSocket = () => {
        const socket = io('http://localhost:3030',
            {query: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjgxLCJuYW1lIjoi0JTQvNC40YLRgNC40LkiLCJpYXQiOjE1NjE2MzkwMjIsImV4cCI6MTU2MTY0MjYyMn0.5Pe9OmniTj9OuCBVgssEFaxGJuDcVVHm3ZiSPND5pf0'});
        // console.log(socket);
        socket.on('connect', () => {
            console.log('connected');
        });
        this.setState({socket});
        // Connection failed
        socket.on('error', function (err) {
            console.log(err);
            throw new Error(err);
        });
        socket.on('success', function (data) {
            console.log(data.message);
            console.log(data);
            console.log('logged in: ' + data.user[0].email);
            this.setState({
                user: data.user[0]
                //  ,
                //  socket: data.socket
            });
            socket.on('hello', () => {
                console.log('hi from PUSH');
            });
        }.bind(this));
        socket.on('alarm', () => {
            console.log('hello to all in socket room!!!');
        })
    };

    list() {
        const socket = this.state.socket;
        socket.emit('room', 'test');
    }
    createRoom() {
        const socket = this.state.socket;
        socket.emit('create','test');
    };
    subRoom() {
        const socket = this.state.socket;
        socket.emit('sub', 'test');
    }
    sendHello() {
        const socket = this.state.socket;
        socket.emit('sendhello', 'test')
    }
    render() {

        return (
            <div>
                <button onClick={
                    this.createRoom
                }>Create
                </button>

                <button onClick={
                    this.subRoom
                }>sub room
                </button>

                <button onClick={
                    this.list
                }>TEST list
                </button>

                <button onClick={
                    this.sendHello
                }>send hello
                </button>
            </div>
        )
    }
}
export default Test;