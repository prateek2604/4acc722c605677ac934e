import React, { useState } from 'react'
import Detail from './Detail'
import axios from 'axios'

const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/neo'
const API_KEY = 'KZ86BDRRizg7kovkh5qRyu9HN3f3cBHNe7SwA48v'

const Astro = ()=>{
  const [astroId, setAstroId] = useState('')
  const [astroDetails, setAstroDetails] = useState('')
  const [msg, setMsg] = useState('')

  const browseAstro = ()=>{
    setMsg('Loading...')
    axios.get(`${ BASE_URL }/browse?api_key=${ API_KEY }`)
    .then(res=>{
      if(res.data && res.data.near_earth_objects){
        getRandomID(res.data.near_earth_objects)
      }
      setMsg('')
    })
    .catch(err=>{
      setMsg('failed to fetch')
    })
  }

  const getRandomID = (arr)=>{
    const random = Math.floor(Math.random() * arr.length)
    if(arr[random] && arr[random].id){
      setAstroId(arr[random].id)
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setMsg('Loading...')
    setAstroDetails('')
    axios.get(`${ BASE_URL }/${ astroId }/?api_key=${ API_KEY }`)
    .then(res=>{
      if(res.data && res.data.name){
        const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = res.data
        setAstroDetails({
          name,
          nasa_jpl_url,
          is_potentially_hazardous_asteroid
        })
        setMsg('')
      }else{
        setMsg('not found')
      }
    })
    .catch(err=>{
      setMsg('failed to fetch')
    })
  }

  return(
    <div className="row">
      <div className="col-lg-6">
        <div className="card bg-light">
          <div className="card-header">Search Asteroid</div>
          <div className="card-body">
            <form method="post" onSubmit={ handleSubmit }>
              <div className="form-group text-left">
                <label>Enter Asteroid ID</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={ (e)=> setAstroId(e.target.value) }
                  value={ astroId }
                  required={ true }
                />
              </div>
              <div className="form-group text-left">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                  style={{ marginRight: '10px' }}
                  disabled={ astroId? false : true }
                />
                <input
                  type="button"
                  onClick={ (e)=> browseAstro() }
                  className="btn btn-outline-primary"
                  value="Random Asteroid"
                />
                <strong style={{ marginLeft: '15px' }}>{ msg }</strong>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        { astroDetails?
          <Detail {...astroDetails} />
        : null }
      </div>
    </div>
  )
}

export default Astro
