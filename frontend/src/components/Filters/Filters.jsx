
import { StoreContext } from '../../context/StoreContext';
import './Fillters.css'
import React, { useContext, useMemo, useState } from 'react'

const Filters = () => {

  const [isOpen,setIsOpen] =useState(false);
  const {makeFilters,modelFilters,yearFilters,chassisFilters,toggleMake,toggleModel,toggleYear,toggleChassis,products} =useContext(StoreContext)

  const options = useMemo(()=>{
    const makes = Array.from(new Set(products.map(p=>p.make).filter(Boolean)));
    const models = Array.from(new Set(products.map(p=>p.model).filter(Boolean)));
    const years = Array.from(new Set(products.map(p=>String(p.year)).filter(Boolean)));
    const chassis = Array.from(new Set(products.map(p=>p.chassisCode).filter(Boolean)));
    return {makes,models,years,chassis};
  },[products])

  return (
    <div className='filters-container'>
        <h2 onClick={()=>setIsOpen(!isOpen)}>Filtters</h2>
        <div className={`filter ${isOpen?"active":""}`}>
        <div className="categories">
            <p>Make</p>
            <ul className="categories-checkbox">
              {options.makes.map(make=>(
                <li key={make}><input type="checkbox" value={make} onChange={toggleMake}/> {make}</li>
              ))}
            </ul>           
        </div>
        <div className="categories">
            <p>Model</p>
            <ul className="categories-checkbox">
            {options.models.map(model=>(
              <li key={model}><input type="checkbox" value={model} onChange={toggleModel}/> {model}</li>
            ))}
            </ul>
        </div>
        <div className="categories">
            <p>Year</p>
            <ul className="categories-checkbox">
            {options.years.map(year=>(
              <li key={year}><input type="checkbox" value={year} onChange={toggleYear}/> {year}</li>
            ))}
            </ul>
        </div>
        <div className="categories">
            <p>Chassis Code</p>
            <ul className="categories-checkbox">
            {options.chassis.map(code=>(
              <li key={code}><input type="checkbox" value={code} onChange={toggleChassis}/> {code}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Filters