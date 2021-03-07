import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Titles = ({title}) => (<h1> {title} </h1>)
const Statistics = (props) => (<p> {props.name}:  {props.value}</p>)

const Button = ({label, handlerFunction}) => (
       <button onClick = {handlerFunction}>{label}</button>
     )

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  if (good+neutral+bad) {
  return (
          <div>
          <Titles title="Give Feedback" />
      
          <Button label="Good"  handlerFunction={() => ( setGood( good + 1) )}/>
          <Button label="Neutral"  handlerFunction={ () => ( setNeutral( neutral + 1) ) }/>
          <Button label="Bad"  handlerFunction={() => ( setBad( bad + 1) )}/>

          <Titles title="Statistics" />

          <Statistics name="Good" value={good}/>
          <Statistics name="Neutral" value={neutral}/>
          <Statistics name="Bad" value={bad}/>

          <br />

          <Statistics name="All" value={good+neutral+bad}/>
          <Statistics name="Avg" value={ (good-bad)/(good+neutral+bad)}/>
          <Statistics name="+ %" value={good/(good+neutral+bad)}/>
          </div>
         )
  }
  else
  {
    return (
      <div>
      <Titles title="Give Feedback" />
  
      <Button label="Good"  handlerFunction={() => ( setGood( good + 1) )}/>
      <Button label="Neutral"  handlerFunction={ () => ( setNeutral( neutral + 1) ) }/>
      <Button label="Bad"  handlerFunction={() => ( setBad( bad + 1) )}/>

      <Titles title="No Feedback Given..." />
      </div>
     )

  }

}

ReactDOM.render(<App />, 
  document.getElementById('root')
)