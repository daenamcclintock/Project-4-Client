import React, { useState, useEffect } from 'react'
import { Card, Dropdown, DropdownButton, Button } from 'react-bootstrap'
import { alignPropType } from 'react-bootstrap/esm/types'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'

const FilterPanel = (props) => {
    const { properties } = props
    const [selectedCity, setCities] = useState(null)
    const [selectedBedrooms, setBedrooms] = useState(null)
    const [selectedBathrooms, setBathrooms] = useState(null)
    const [selectedPrice, setSelectedPrice] = useState([1000000, 20000000])
    const [resultsFound, setResultsFound] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [list, setList] = useState(properties)

    const cityFilter = () => {
        properties.map(property => {
            const city = property.address.split(',')[1]
            
        })
    
    }

    const handleChangePrice = (event, value) => {
        setSelectedPrice(value);
      };

    const applyFilters = () => {
        let updatedList = properties

        // Bedrooms filter
        if (selectedBedrooms) {
            updatedList = updatedList.filter(
                (property) => parseInt(property.bedrooms) > parseInt(selectedBedrooms)
            )
        }

        // Bathrooms filter
        if (selectedBathrooms) {
            updatedList = updatedList.filter(
                (property) => parseInt(property.bathrooms) > parseInt(selectedBathrooms)
            )
        }

        // City filter
        if (selectedCity) {
            updatedList = updatedList.filter(
                (property) => {
                    const city = property.address.split(',')[1]
                }
            )
        }

        // Price filter
        const minPrice = selectedPrice[0];
        const maxPrice = selectedPrice[1];

        updatedList = updatedList.filter(
            (property) => property.price >= minPrice && property.price <= maxPrice
        )
        setList(updatedList)
        !updatedList.length ? setResultsFound(false) : setResultsFound(true)

    }

    useEffect(() => {
        applyFilters()
    }, [selectedBathrooms, selectedBedrooms, selectedCity, selectedPrice])
    
    const cityOptions = () => {
        return properties.map(property => {
            const city = property.address.split(',')
            console.log('this is city', city[1])
            return (
                <option key={city[1]} value={city[1]}>{city[1]}</option>
            )
        })
    }
    
    const bedroomsOptions = () => {
        return properties.map((property) => {
            return (
            <option key={property.bedrooms} value={property.bedrooms}>{property.bedrooms}+ BR</option>
            )
        })
    }
    
    const bathroomOptions = () => {
        return properties.map((property) => {
            return (
            <option key={property.bathrooms} value={property.bathrooms}>{property.bathrooms}+ BA</option>
            )
        })
    }
    
    return (
        <>
            <div className="filter-panel">
                <label for='city'>City</label>
                <br></br>
                <div className="filter-options">
                    <select name='city' className='city-filter'>
                        <option value="All">All</option>
                        {cityOptions()}
                    </select>
                </div>
                <br></br>
                <label for='bedrooms'>Bedrooms</label>
                <div className="filter-options">
                    <select name='city' className='city-filter'>
                        {bedroomsOptions()}
                    </select>
                </div>
                <br></br>
                <label for='bathrooms'>Bathrooms</label>
                <div className="filter-options">
                    <select name='bathrooms' class='city-filter'>
                        {bathroomOptions()}
                    </select>
                </div>
                <br></br>
                <label class='label'>Square Footage</label>
                <div className="min-sqft">
                    <input type='text' name='min-square-footage' class='min-square-footage' value='0'></input>
                </div>
                <div className="max-sqft">
                    <input type='text' name='max-square-footage' class='max-square-footage' value='15000'></input>
                </div>
                <br></br>
                
                <label for="customRange2" class="form-label">Price</label>
                <input type="range" class="form-range" min="0" max="5" id="customRange2"></input>
            </div>
        </>
    )
}

export default FilterPanel
