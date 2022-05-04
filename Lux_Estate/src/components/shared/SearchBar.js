import {useState} from 'react'
import '../../styling/Search.css'
import FilterPanel from './FilterPanel'


const SearchBar = (props) => {
    const { properties } = props

    const [searchTerm, setSearchTerm] = useState('')

    const filterProperties = () => {
        properties.filter((city) => {
            if (searchTerm == '') {
                return city
            }
            else if (properties.address.split(',').toLowerCase().includes(searchTerm.toLowerCase())) {
                return city
            }
        })
    }

    return (
        <div className='SearchBar_container'>
            <div className="searchBar_fields">
                <div className="search_text">
                    <h3>Search Luxury Real Estate</h3>
                </div>
                <div className="search_input">
                    <input className='search_bar' type='text' placeholder='search by city' onChange={(e) => {setSearchTerm(e.target.value)}}/>
                </div>
                <br></br>
                <h3 className='titleText'>Property Filters</h3>
                <br />
            </div>
            <div className="filter">
                <FilterPanel properties={properties} filterProperties={filterProperties}/>
            </div>
        </div>
    )
}

export default SearchBar