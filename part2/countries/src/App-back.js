import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css';

const ShowCountry = ({name, capital, population, languages=[], flag}) => 
{
  return(
    <div>
      <br />
      <h2> {name} </h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <br />
      <h3>Languages</h3>
      <ul>
      {languages.map( x => <li key={x.name}> {x.name} </li>)}
      </ul>
      <br />
      <img width="150px"
           src={flag} 
           alt={`${name} Flag`}
           title={`${name} Flag`} />
      </div>
    )

}

const hButton =(event) => {
  console.log(event)
}

const Button = ({country}) => {
  const {name,capital, population,languages,flag} = country 

  return( 
  <button type="button" value={country}
          onClick={ hButton/* () => ShowCountry(name,capital, population,languages,flag)*/}>...</button>
  )
}


const ShowAllList = ({country}) => {
return(
  <>
     <p> <Button country={country}/> - {country.name} </p>
  </>
)

}

const SearchCriteria = ({filter, hndl}) =>{
  return( 
        <>
        <p>Find Countries: </p>
        <input type="text" value={filter} onChange={hndl} />
        </>
  )
}                        

const ExeCriteria = ({filter,data}) => {



    if (data.length === 0 )
    {
       return( <p> data --- [] </p> );
    }

    if ( typeof filter === "undefined" 
    ||   filter === null
    ||   filter === "" 
    ) 
    {
      return( <p> waiting for a search criteria ... </p> );
    }

    let listCountries = data.filter(y => y.name.toUpperCase().match(filter.toUpperCase()))

    switch (listCountries.length)
    {
      case 0 :
        return( <p><strong>No results for Search Criteria</strong></p>)

      case 1:   
         return(
           <ShowCountry name={listCountries[0].name}
                        capital={listCountries[0].capital}
                        population={listCountries[0].population}
                        languages={listCountries[0].languages}
                        flag={listCountries[0].flag}/>    
         )        

      case 2: 
      case 3: 
      case 4: 
      case 5: 
      case 6: 
      case 7: 
      case 8: 
      case 9: 
      case 10:
         //return( listCountries.map( x => <p key={x.name}> {x.name} </p>) )
         return( listCountries.map( x => <ShowAllList key={x.name} country={x}/> ) )

      default:
          return(<p><strong>Too many macthes, insert other Criteria</strong> (total matches: {listCountries.length})</p> )
    }
          
}

const App = () => {
const [countries, setCountries] = useState([])
const [fltrCountries, setFltrCountries] = useState('') 

const hdlFltrCountries = (event) => setFltrCountries(event.target.value)

const hdlCountriesDataGet = () => {
  axios
      .get('http://localhost:3001/countries')
      .then( response => setCountries(response.data) )
}

useEffect( hdlCountriesDataGet, [])

return(
  <div>
    <SearchCriteria filter={fltrCountries} hndl={hdlFltrCountries}/>
    <br />
    <ExeCriteria filter={fltrCountries} data={countries}/>
  </div>
  )
}

export default App;
