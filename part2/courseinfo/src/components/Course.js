
import React from 'react'

export const Header = ({title, course}) => {
    if (title ==="si")
        return(  <h1>{course}</h1>  )
  
    return( <h2>{course}</h2> )
}


const Content = ({list, idxPpal}) => 
(  <> 
      {list.map( x => <p key = {idxPpal*100 + x.id}> {x.name} -- {x.exercises}</p>)} 
   </>
)

 
const Total = ({list}) => 
(
    <p>Total of **{list.reduce( (acc, cVle) => acc + cVle.exercises, 0)}** exercises</p>
)

export const Course = ({course}) => {
  return (
    <>
      <Header title="no" course={course.name} />
      <Content idxPpal={course.id} list={course.parts} />
      <Total list={course.parts}/> 
    </>
  )
}

