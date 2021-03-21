import React, { useState, useEffect } from 'react'
import iPhBook from './services/iPhoneBook'
import './index.css'

const Notification = ({ msg, msgType }) => {
  if (msg === null) {
    return null
  }

  return (
    <div className={msgType}>
      {msg}
    </div>
  )
}

const Filter = ({filter, hndle}) => {
  return(
    <div>
         show only names having: <input value={filter} onChange={hndle}/>
    </div>
  )
}


const PersonForm = ({hndle, inName, hName, inNumber, hNumber}) => {
  return(
    <form onSubmit={hndle}>
        <div>
            name: <input value={inName} onChange={hName}/>
        </div>
        <div>
            number: <input value={inNumber} onChange={hNumber}/>
        </div>
        <div>
           <button type="submit">add</button>
        </div>
    </form>    
  )
}

const DelBtn = ({id, hBtn}) => (<button name={id} onClick={hBtn}>Delete Contact {id}</button>)

const Persons = ({phBook, filter, hdl}) => {
  if((phBook === null) || (phBook === []) || (typeof phBook === 'undefined'))
  return( <> phone book empty...</> )

  if (filter.length === 0) 
     return( phBook.map( x => <p key={x.id}><DelBtn id={x.id} hBtn={hdl}/> {x.name}  -- {x.number}</p>)  )

  return( 
          phBook.filter(y => y.name.toUpperCase().match(filter.toUpperCase()))
                .map( x => <p key={x.id}><DelBtn id={x.id} hBtn={hdl}/> {x.name}  -- {x.number}</p>)
        )                
    
  
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notificationMsg, setNotificationMsg ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('')
  
  const hndlInputName = (event)=>setNewName(event.target.value)
  const hndlInputNumber = (event)=>setNewNumber(event.target.value)
  const hndlInputFilter = (event)=>setFilterName(event.target.value)

  const hdnlDel = (evt) => {
    evt.preventDefault();

    const rec = persons.filter(x=>x.id == evt.target.attributes.name.value) 

    if (window.confirm('Do you really want to delete the record '))
    {
    iPhBook.delPhBk({id:rec[0].id})
           .then( x=> { 
                        setPersons( persons.filter(r=>r.id != rec[0].id))           
                        setNewName("")
                        setNewNumber("")   

                        setNotificationMsg('Contact succesfully deleted...')
                        setNotificationType('success')

                        setTimeout(() => {setNotificationMsg(null); setNotificationType('')}, 5000)
                      })
           .catch(() => {
                  setNotificationMsg('Upps! deleting data error: data has alredy removed from the server ....')
                  setNotificationType('error')
                  setTimeout(() => {setNotificationMsg(null); setNotificationType('')}, 5000) 
                 })        
    }
    else {
         setNotificationMsg('Delete action aborted by the user....')
         setNotificationType('warning')
         setTimeout(() => {setNotificationMsg(null); setNotificationType('')}, 5000)
    }


  }

  const hndlAdd = (evt) => {
      evt.preventDefault();
      if (persons.some(x=>x.name.toUpperCase() === newName.toUpperCase())){
         alert(`${newName} already exists in the phonebook...`)

         if (window.confirm("Do you want to replace the phone number?")) {          
             const rec = persons.filter(x=>x.name.toUpperCase() === newName.toUpperCase()) 
             iPhBook.putPhBk({name:newName, number:newNumber, id:rec[0].id})
                    .then( x=> { 
                              setPersons( persons.filter(r=>r.id != x.id).concat(x))           
                              setNewName("")
                              setNewNumber("")   

                              setNotificationMsg('Contact succesfully updated...')
                              setNotificationType('success')
      
                              setTimeout(() => {setNotificationMsg(null); setNotificationType('')}, 5000)
      
                            })
                    .catch(() =>{                                   
                                  setNotificationMsg('Upps! updating data error: data has alredy removed from the server ....')
                                  setNotificationType('error')
                                  setTimeout(() => {setNotificationMsg(null); setNotificationType('')}, 5000) 

                                  setPersons( [] )           
                                  setNewName("")
                                  setNewNumber("")

                                })        
           } 
      }
      else{ 
          iPhBook.postPhBk({name:newName, number:newNumber})
                 .then( x=> { 
                              setPersons( persons.concat(x))           
                              setNewName("")
                              setNewNumber("")   

                              setNotificationMsg('Contact succesfully added ...')
                              setNotificationType('success')
      
                              setTimeout(() => {setNotificationMsg(null); setNotificationType('')}, 5000)
      
                            })
                 .catch('Upps! posting new data error....')
        }
   }
   

   useEffect ( () => { iPhBook.getPhBk()
                              .then(x => setPersons(x))
                              .catch('Upps! geting data error....')
                     }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <Notification msgType={notificationType} msg={notificationMsg}/>
      <Filter filter={filterName} hndle={hndlInputFilter}/>
      <br />
      <h3>Add new persons</h3>
      <br />
      <PersonForm hndle={hndlAdd} 
                  inName={newName} 
                  hName={hndlInputName} 
                  inNumber={newNumber} 
                  hNumber={hndlInputNumber}/>
      <br />
      <h3>Numbers</h3>
      <br />
      <Persons phBook={persons} filter={filterName} hdl={hdnlDel}/>
      </div>
  )
}

export default App
