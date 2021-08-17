import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import './App.css';
import { Board } from './Board.js';

let socket = io.connect();

function App(){

  const [thisUser, updateUser] = useState('') //Tells whether player is X or O
  const [userName, updateName] = useState('') //Store's player's username
  
  const [userMap, updateUsers] = useState({
    player1: '',
    player2: '',
    spectators: []
  });
  



  const inputUser = useRef(''); //Hook to take value from the textbox
  
  
  
  function onButtonClick(){ //Allows users to log into Application
    if(inputUser.current.value != ''){
      var copy = {...userMap}
      const user = inputUser.current.value
      if(copy.player1 == ''){
        copy.player1 = user
        updateUser(oldUser => '1')
      }
      else if(copy.player2 == ''){
        copy.player2 = user
         updateUser(oldUser => '2')
      }
      else{
        let specs = [...copy.spectators, user]
        copy.spectators = specs
        updateUser(oldUser => 's')
      }
      updateUsers(copy);
      updateName(user)
      
      
      
      socket.emit('login', {users: copy});
      console.log(copy);
      console.log("emitted");
    }
    
  };
  
  useEffect(() => {
    socket.on('login', (data) => {
        console.log('login registered')
        updateUsers(data.users);
        console.log(data.users.spectators)
        });
     }, []);
     
     
  
  
  if(thisUser == ''){
    return(
      <div class='wrapper-input'>
        <div>
        <input type='text' ref={inputUser} placeholder='username' required/>
        <div style={{paddingTop: 10}}><button onClick={onButtonClick}><h3>Log In</h3></button></div>
        </div>
      </div>

      )
    
  }
  
  else if(userMap.player1 == '' || userMap.player2 == ''){
    return(
      <div class='wrapper'>
        <div>
          <h3>player1: {userMap.player1}</h3>
          <h3>player2: {userMap.player2}</h3>
          <h3>Spectators:</h3>
          {userMap.spectators.map((item) => <h3>{item}, </h3>)}
        </div>
      </div>
      ) 
  }


  else{
    
    return (

      <div class='wrapper-small'>
        <div>
          <h3>player1: {userMap.player1}</h3>
          <h3>player2: {userMap.player2}</h3>
          <div class='spec'>
          <h2>Spectators: </h2>
          
          {userMap.spectators.map((item, index) => (<h2>{ (index ? ', ': '') + item }</h2>))}
          </div>

          <Board player1={userMap.player1} player2={userMap.player2} player={thisUser} />
          
          
        </div>
      </div>

    );



}




  
  
};

export default App;