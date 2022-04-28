import React from 'react'
import NavBar from "./Components/Header/NavBar";
import SearchBar from './Components/SearchBar';
import './Styling/Style.css'

const App = () => {
  return (
    <div>
        <NavBar />
        <SearchBar />
    </div>
  )
}

export default App