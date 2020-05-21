import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
// import FarmListItem from '../../components/FarmListItem/FarmListItem'

class FarmPage extends Component {

  static contextType = FarmContext

  goBack = () => {
    this.props.history.push('/')
  }

  render () {
    const farmId = Number(this.props.match.params.farmId)
    // console.log(`value of farmId is ` + farmId)
    const farms = this.context.farms
    console.log(farms)
    const farmInfo = farms.find(farm => 
      farm.id === farmId) || {}
    console.log(farmInfo)

    // const farmsList = farms.map(farm =>
    //   <li key={farm.id}>
    //     <FarmListItem info={farm} />
    //   </li>
    //   )
    return (
      <section>
        <div onClick={this.goBack}>X</div>
        <img src={farmInfo.cover_image} alt="farm cover"></img>
        <h2>{farmInfo.farm_name}</h2>
        <img src={farmInfo.profile_image} alt="farm avatar"></img>
        <div>{farmInfo.products}</div>
        <address>
          {farmInfo.address_1}<br />
          {farmInfo.address_2}<br />
          {farmInfo.city}, {farmInfo.state} {farmInfo.zip_code}
        </address>
    <div><a href={farmInfo.website}>Website</a></div>
        <p>
          {farmInfo.farm_description}
        </p>
        <div>Line</div>
        <h4>Purchasing Information</h4>
        <div>{farmInfo.purchase_options}</div>
        <p>{farmInfo.purchase_details}</p>

      </section>
    )
  }
}

export default FarmPage