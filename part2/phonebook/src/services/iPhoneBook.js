import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPhBk = () => { 
    const r = axios.get(baseUrl)
    return r.then(response => response.data  )    
}

const postPhBk = ({name, number}) => { 
    const r = axios.post(baseUrl, {name, number})
    return r.then(response => response.data  )    
}

const putPhBk = ({ name, number, id}) => { 
    const r = axios.put(`${baseUrl}/${id}`, {id, name, number})
    return r.then(response => response.data  )    
}

const delPhBk = ({id}) => { 
    const r = axios.delete(`${baseUrl}/${id}`)
    return r.then(response => response.data  )    
}

export default { getPhBk, postPhBk, putPhBk, delPhBk }