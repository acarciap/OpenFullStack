import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css';

const ShowCountry = ({country}) => 
{
  const [weatherData, setWeatherData] = useState()

  //console.log(process.env.REACT_APP_API_KEY) -- af0677cb2775ce38e85cba1852d68d00

  useEffect( ()=>{
  axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY.trim()}&query=${country.capital}`)
      .then(response => {
        const res = response.data;
        //console.log('res -->', res)
        setWeatherData(res)
        
      })
  }, [setWeatherData])

  //console.log('ShowCountry', country)
  //console.log('weatherData--->', weatherData)

  return(
    <div>
      <br />
      <h2> {country.name} </h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <br />
      <h3>Languages</h3>
      <ul>
      {country.languages.map( x => <li key={x.name}> {x.name} </li>)}
      </ul>
      <br />
      <img width="150px"
           src={country.flag} 
           alt={`${country.name} Flag`}
           title={`${country.name} Flag`} />
      <br />
      
      {(!(weatherData === null) && !(typeof weatherData === 'undefined')) 
      ?
         <>
         <h3>Weather forecast at {weatherData.location.name}</h3>
         <p><strong>Temperature:</strong> {weatherData.current.temperature} 
                ° { (weatherData.request.unit === 'm') ? 'Celsium' : 'Other' }</p>
         <img width="85px" src={weatherData.current.weather_icons[0]} />
         <p><strong>Wind -speed:</strong> {weatherData.current.wind_speed } 
            <strong> -direction:</strong> {weatherData.current.wind_dir }</p>
         </>
      : <></>
      }

      </div>
    )

}



const SearchCriteria = ({filter, hndl, hndlClear}) =>{
  return( 
        <>
        <p>Find Countries: </p>
        <input type="text" value={filter} onChange={hndl} />
        <button type="botton" onClick={hndlClear}>Clear Filter</button>
        </>
  )
}                        

const ExeCriteria = ({filter,data}) => {

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [clearSelection, setClearSelection] = useState(false)

  const hButton =(event) => {    
    let ctryName = event.target.attributes.name.value
    let country = data.filter(y => y.name.toUpperCase().match(ctryName.toUpperCase()))

    //console.log(country[0])
    setSelectedCountry(country[0])
    setClearSelection(true)
  }
  const Button = ({country}) => ( <button type="button" name={country.name} onClick={hButton}>...</button>)
  const btnClearSelection = () => { 
                                    setSelectedCountry(null)
                                    setClearSelection(false) 
                                  }

  const ShowAllList = ({country}) => (<p> <Button country={country}/> - {country.name} </p>)
  

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
    
    let listCountries = (selectedCountry === null) 
                      ? data.filter(y => y.name.toUpperCase().match(filter.toUpperCase()))
                      : [selectedCountry]
    
    switch (listCountries.length)
    {
      case 0 :
        return( <p><strong>No results for Search Criteria</strong></p>)

      case 1:                     
         return(  <>
                     { clearSelection                     
                      ? <> 
                        <br/>
                        <button onClick={btnClearSelection}> Clear Country Selected </button>
                        </>
                      : <></>
                     } 
                     <ShowCountry country={listCountries[0]}/> 
                  </> )

      case 2: 
      case 3: 
      case 4: 
      case 5: 
      case 6: 
      case 7: 
      case 8: 
      case 9: 
      case 10:
         return( listCountries.map( x => <ShowAllList key={x.name} country={x}/> ) )

      default:
          return(<p><strong>Too many macthes, insert other Criteria</strong> (total matches: {listCountries.length})</p> )
    }

    
}

const App = () => {
const [countries, setCountries] = useState([])
const [fltrCountries, setFltrCountries] = useState('') 

const hdlFltrCountries = (event) => setFltrCountries(event.target.value)
const hdlFltrClear = () => setFltrCountries('')

const hdlCountriesDataGet = () => {
  axios
      .get('http://localhost:3001/countries')
      .then( response => setCountries(response.data) )
}

useEffect( hdlCountriesDataGet, [])

return(
  <div>
    <SearchCriteria filter={fltrCountries} 
                    hndl={hdlFltrCountries} 
                    hndlClear={hdlFltrClear}/>
    <br />
    <ExeCriteria filter={fltrCountries} data={countries}/>
  </div>
  )
}

export default App;
