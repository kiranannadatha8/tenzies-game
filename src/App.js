import './styles.css';
import Die from './Die';
import React from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import { useStopwatch } from 'react-timer-hook';

function App() {

  const[dice, setDice]  = React.useState(allNewDice())
  const[tenzies, setTenzies] = React.useState(false)
  const[count, setCount] = React.useState(0)

  const  {
    seconds,
    minutes,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    } 
  },[dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for(let i=0; i<10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const diceElements =dice.map(die => <Die id={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)


  function rollDice(){
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setCount(prevCount => prevCount + 1)
    } else {
      setTenzies(false)
      pause()
      setCount(0)
      setDice(allNewDice())
    }
  }
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-dice">
          {tenzies ? "New Game" : "Roll"}
        </button>
      <div className='timer' style={{textAlign: 'center'}}>
        <div style={{fontSize: '25px'}}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      <h3>Count:{count}</h3>
    </main>
  )
}

export default App;
