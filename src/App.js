// import './App.css';
// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// const socket = io();

// function App() {
//   const [players, updatePlayers] = useState({

//     Player1: '',
//     Player2: '',
//     spectators: [],

//   });

//   const [thisUser, updateUser] = useState('');
//   const inputUser = useRef('');
//   const [userName, setName] = useState('')

//   function onButtonClick(){
//     // Allows login to take place because text is extracted from useref
//     const user = inputUser.current.value;
    
//     if(user !==''){
//       setName(user)
//       console.log(user);
//       let copy = {...players};
//       if(copy.Player1 === ''){
//         copy.Player1 = user
//         updateUser('1');
//       }
//       else if(copy.Player2 === ''){
//         copy.Player2 = user;
//         updateUser('2');
//       }
//       else{
//         copy.spectators = [...copy.spectators, user];
//         updateUser('s')
//       }
//       socket.emit('login', {users: copy});
//       console.log('Sent request');

//     }
//   }

//   useEffect(
//     () => {
//       socket.on('login', (data)=>{
//         console.log('Login registered');
//         updatePlayers(data.users);

//       });
//     }
//   );



//   if(thisUser === ''){
//     return(
//       <>
//       <input type='text' ref={inputUser} required />
//       <button onClick={onButtonClick}>Log in</button>
//       </>
//     );
//   }

//   return (
//     <>
//     <h2>Player 1: {players.Player1}</h2>
//     <h2>Player 2: {players.Player2}</h2>
//     <h2>Spectators: {players.spectators.map((item) => <h3>{item}, </h3>)} </h2>
//     </>
//   );



// }

// export default App;




import './App.css';
import React, { useState } from 'react';


function App(props) {
  const [counter, setCounter] = useState(0);

  console.log(props);

  function clickHandler() {
      alert('In this function!');
  }

  return <button onClick={clickHandler} />;
}

export default App;