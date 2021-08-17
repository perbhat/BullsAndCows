import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import './App.css';

const socket = io();

export function Board(props) {
    
    const [targetWord, setTarget] = useState('')
    const [guesses, changeState] = useState(Array(10).fill(null));
    
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
          changeTurn(prev => !prev)
          console.log(targetWord);
          console.log(canSet)
        }
        
      };

        useEffect(() => {
        socket.on('target', (data) => {
            const wordTarget = data.target
            console.log(wordTarget)
            setTarget(prev => wordTarget)
            changeTurn(prev => !prev)
            console.log(canSet)
            });
            }, []);
 
    

    const guess = useRef('');
    const currIndex = 0

    function onSubmitGuess() {
        const curr = guess.current.value
        if (curr != ''){
            tempGuess = [...guesses]
            tempGuess[currIndex] = curr
            changeState[prev => tempGuess]
            currIndex ++
        }
        
        socket.emit('guess', {guess: guesses})
    }

    useEffect(() => {
        socket.on('guess', (data) => {
            const gameBoard = data.guesses
            console.log(gameBoard)
            changeState(prev => gameBoard)
            console.log("updated guesses")
            });
            }, []);





    if(canSet){
        return (
            <>
            <h3>{targetWord}</h3>
            
            <input type='text' ref={targetInput} placeholder='Enter target word' required/>
            <div style={{paddingTop: 10}}><button onClick={onButtonClick}><h3>Set Target</h3></button></div>
            {guesses.map((item, index) => (<h2>{ (index ? ', ': '') + item }</h2>))}
            </>
        );

    }
    // else if (targetWord)
    else {
        return (
            <>
            <h3> { targetWord } </h3>
            <input type='text' ref={guess} placeholder='Enter guess' required/>
            <div style={{paddingTop: 10}}><button onClick={onSubmitGuess}><h3>Set Target</h3></button></div>
            {guesses.map((item, index) => (<h2>{ (index ? ', ': '') + item }</h2>))}
            </>
        )
    }


}


