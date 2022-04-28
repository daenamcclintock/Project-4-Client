import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import '../Styling/Search.css'


const SearchBar = () => {
  return (
    <div className='SearchBar_container'>
        <div className="searchBar_fields">
            <div className="search_text">
                <h3>Find Your Ideal Home</h3>
            </div>
            <div className="search_input">
                <input type='text' placeholder='search' />
                <SearchIcon />
            </div>
            <div className="filter">
                Filter By State:
                <select>
                    <option>All</option>
                    Loop thru data!
                </select>
            </div>
        </div>
    </div>
  )
}

export default SearchBar