
import { StoreContext } from '../../context/StoreContext';
import './Fillters.css'
import React, { useContext, useMemo, useState } from 'react'

const Filters = () => {

  const [isOpen,setIsOpen] =useState(false);
  const {makeFilters,modelFilters,yearFilters,chassisFilters,toggleMake,toggleModel,toggleYear,toggleChassis,products,setModelFilters,setMakeFilters,setYearFilters,setChassisFilters} =useContext(StoreContext)

  const options = useMemo(()=>{
    // Normalize make names: trim and capitalize first letter, rest lowercase
    const normalizeMake = make => make && make.trim() ? make.trim().charAt(0).toUpperCase() + make.trim().slice(1).toLowerCase() : '';
    const makes = Array.from(new Set(products.map(p => normalizeMake(p.make)).filter(Boolean)));

      // Filter products by normalized selected make
      const filteredByMake = makeFilters.length
        ? products.filter(p => makeFilters.includes(normalizeMake(p.make)))
        : products;

    const models = Array.from(new Set(filteredByMake.map(p=>p.model).filter(Boolean)));
      // Only show models for the selected make

    const filteredByModel = modelFilters.length
      ? filteredByMake.filter(p=>modelFilters.includes(p.model))
      : filteredByMake;

    const years = Array.from(new Set(filteredByModel.map(p=>String(p.year)).filter(Boolean)));
    const chassis = Array.from(new Set(filteredByModel.map(p=>p.chassisCode).filter(Boolean)));

    return {makes,models,years,chassis};
  },[products,makeFilters,modelFilters])

  return (
    <div className='filters-container'>
        <h2 onClick={()=>setIsOpen(!isOpen)}>Filtters</h2>
        <div className={`filter ${isOpen?"active":""}`}>
        <div className="categories">
            <p>Make</p>
            <ul className="categories-checkbox">
              {options.makes.map(make => (
                <li key={make}>
                  <input
                    type="checkbox"
                    value={make}
                    onChange={() => {
                      setMakeFilters(makeFilters.includes(make) ? [] : [make]);
                      setModelFilters([]);
                      setChassisFilters([]);
                      setYearFilters([]);
                    }}
                    checked={makeFilters.includes(make)}
                  /> {make}
                </li>
              ))}
            </ul>           
        </div>
        <div className="categories">
            <p>Model</p>
            <ul className="categories-checkbox">
            {options.models.map(model=>(
              <li key={model}><input type="checkbox" value={model} onChange={(e)=>setModelFilters(e.target.checked?[model]:[])} checked={modelFilters.includes(model)} /> {model}</li>
            ))}
            </ul>
        </div>
        <div className="categories">
            <p>Year</p>
            <ul className="categories-checkbox">
            {options.years.map(year=>(
              <li key={year}><input type="checkbox" value={year} onChange={toggleYear} checked={yearFilters.includes(year)} readOnly/> {year}</li>
            ))}
            </ul>
        </div>
        <div className="categories">
            <p>Chassis Code</p>
            <ul className="categories-checkbox">
            {options.chassis.map(code=>(
              <li key={code}><input type="checkbox" value={code} onChange={toggleChassis} checked={chassisFilters.includes(code)} readOnly/> {code}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Filters