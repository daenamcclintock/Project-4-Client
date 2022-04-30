import React from 'react'
import '../../styling/Search.css'
import FilterPanel from './FilterPanel'


const SearchBar = (props) => {
    const { properties } = props
    return (
        <div className='SearchBar_container'>
            <div className="searchBar_fields">
                <div className="search_text">
                    <h3>Search Luxury Real Estate</h3>
                </div>
                <div className="search_input">
                    <input type='text' placeholder='search' />
                </div>
                <h3 className='titleText'>Filters</h3>
            </div>
            <div className="filter">
                <FilterPanel properties={properties}/>
            </div>
        </div>
    )
}

export default SearchBar