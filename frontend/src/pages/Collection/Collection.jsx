import AllCollection from '../../components/AllCollections/AllCollection'
import Filters from '../../components/Filters/Filters'
import './Collection.css'


import React from 'react'

const Collection = () => {


  return (
    <div className='collection-container'> 
          
          <Filters/>
          <AllCollection/>
    </div>
  )
}

export default Collection