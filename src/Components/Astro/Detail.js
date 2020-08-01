import React from 'react'

const Detail = ({ name, nasa_jpl_url, is_potentially_hazardous_asteroid })=>(
  <div className="card bg-light">
    <div className="card-header">Asteroid Details</div>
    <div className="card-body">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>JPL Url</th>
            <th>Is potentially hazardous asteroid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ name }</td>
            <td>
              <a target="_blank" rel="noopener noreferrer" href={ nasa_jpl_url }>{ nasa_jpl_url }</a>
            </td>
            <td>{
              is_potentially_hazardous_asteroid?
              <span className="badge badge-danger" style={{ fontSize: '13px', width: '120px' }}>Yes</span>
              :
              <span className="badge badge-primary" style={{ fontSize: '13px', width: '120px' }}>No</span>
            }</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default Detail
