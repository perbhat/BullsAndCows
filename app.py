import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('message')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function

    socketio.emit('chat',  data, broadcast=True, include_self=False)

@socketio.on('turn')
def on_update(data):
    print(str(data))
    socketio.emit('turn', data,  broadcast=True, include_self=False)
    
    
@socketio.on('login')
def on_login(data):
    print("Something Happened")
    # print(#str(data))
    socketio.emit('login', data, broadcast=True, include_self=False)


@socketio.on('reset')
def on_reset(data):
    print('reset')
    socketio.emit('reset', data, broadcast=True, include_self=False)

@socketio.on('target')
def on_target(data):
    print("set target")
    print(str(data))
    socketio.emit('target', data, broadcast=True, include_self=False)

@socketio.on('guess')
def on_guess(data):
    print("player has guessed")
    print(str(data))
    socketio.emit('guess', data, broadcast=True, include_delf=False)


@socketio.on('updateWin')
def on_guess(data):
    print("win check!")
    print(str(data))
    socketio.emit('updateWin', data, broadcast=True, include_delf=False)



# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    debug=True
)