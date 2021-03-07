import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return(
    <>
       <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <>
       <p>{props.contentName} : {props.contentCount}</p> 
    </>
  )
}


const Content = (props) => {

  return(
    <>
       <Part contentName={props.list[0].name} contentCount={props.list[0].exercises}/> 
       <Part contentName={props.list[1].name} contentCount={props.list[1].exercises}/> 
       <Part contentName={props.list[2].name} contentCount={props.list[2].exercises}/> 
    </>
  )
}
 


const Total = (props) => {
  let total = 0
  for (const { exercises } of props.list){ total+=exercises; }

  return(
    <>
       <p>Number of exercises {total}</p>
    </>
  )
}


const App = () => {
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const course = {
    name: 'Half Stack application development',
    parts: [ part1, part2, part3  ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content list={course.parts} />
      <Total list={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))