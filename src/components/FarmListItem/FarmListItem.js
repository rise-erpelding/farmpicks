import React from 'react'
import { Link } from 'react-router-dom'

export default function FarmListItem(props) {
  const farm = props.info
  return (
    <div>
      <h4><Link to={`/farms/${farm.id}`}>{farm.farm_name}</Link></h4>
    </div>
  )
}

FarmListItem.defaultProps = {
  info: {}
}