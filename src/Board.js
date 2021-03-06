import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import './App.css';

const socket = io();

export function Board(props) {
    
    const [targetWord, setTarget] = useState('')
    const [guesses, changeState] = useState([]);
    const [winState, chickenDinner] = useState([false])
    
    const currTurn = props.player == '1' ? true : false 
    const[canSet, changeTurn] = useState(currTurn)
    // canSet = false means that the player is guessing right now


    
    const player1 = props.player1
    const player2 = props.player2


    
    const targetInput = useRef('');

    function onButtonClick(){ //Allows users to log into Application
        // console.log(targetInput.current.value)
        // console.log(targetInput.current.value != '' &  targetWord === '')
        const curr = targetInput.current.value
        if(curr != '' ){ //&  targetWord == ''
          setTarget(prev => curr) // Add checking to make sure target is valid 5 letters
          
          socket.emit('target', {target: curr});
        //   changeTurn(prev => !prev)
        //   console.log(targetWord);
        //   console.log(canSet)
        }
        
      };

        useEffect(() => {
        socket.on('target', (data) => {
            const wordTarget = data.target
            // console.log(wordTarget)
            setTarget(prev => wordTarget)
            // changeTurn(prev => !prev)
            // console.log(canSet)
            });
            }, []);
 
    

    const guess = useRef('');

    function onSubmitGuess() {
        const curr = guess.current.value
        if (curr != '' & guesses.length < 10){
            const win = checkWin(curr)
            chickenDinner(win)
            console.log(winState)
            const tempGuess = [...guesses, curr]
            changeState(prev => tempGuess)
            socket.emit('updateWin', {state: win})
            socket.emit('guess', {board: tempGuess})
        }
        
    }

    useEffect(() => {
        socket.on('guess', (data) => {
            changeState(prev => data.board)
            console.log("updated guesses")
            });
            }, []);

    
    function checkWin(guess){
        if (targetWord != '' & guess ==  targetWord){
            return true
        }
        else{
            return false
        }
    }

    useEffect(() => {
        socket.on('updateWin', (data) => {
            chickenDinner(data.state)
            console.log("updated win")
            });
            }, []);



    if (winState == true & canSet == true & guesses.length < 10) {
        return (
            <h1>You Lost!</h1>
        )
    }

    else if (winState == true & canSet == false & guesses.length < 10) {
        return (
            <h1>You Won!</h1>
        )
    }

    else if (winState == false & canSet == false & guesses.length >= 10) {
        return (
            <h1>You Lost!</h1>
        )
    }

    else if (winState == false & canSet == true & guesses.length >= 10) {
        return (
            <h1>You Won!</h1>
        )
    }

    
    

    if(canSet){
        return (
            <>
            <h3>{targetWord}</h3>
            
            <input type='text' ref={targetInput} placeholder='Enter target word' required/>
            <div style={{paddingTop: 10}}><button onClick={onButtonClick}><h3>Set Target</h3></button></div>
            {guesses.map((item) => (<h2>{ item }</h2>))}
            </>
        );

    }
    // else if (targetWord)
    else {
        return (
            <>
            <h3> { targetWord } </h3>
            <input type='text' ref={guess} placeholder='Enter guess' required/>
            <div style={{paddingTop: 10}}><button onClick={onSubmitGuess}><h3>Enter a Guess</h3></button></div>
            {guesses.map((item) => (<h2>{ item }</h2>))}
            </>
        )
    }

    


}


