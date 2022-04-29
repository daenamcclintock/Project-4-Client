import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Banner from './Components/Header/Banner';
import NavBar from "./Components/Header/NavBar";
import CreateProperty from './Components/Property/CreateProperty';
import SearchBar from './Components/SearchBar';
import './Styling/Style.css'

const App = () => {
  return (
    <div>
        <Fragment>
            <Routes>
                <Route
                    path='/createproperty'
                    element={<CreateProperty />}
                />
            </Routes>
        </Fragment>
        <NavBar />
        <SearchBar />
        <Banner />
    </div>
  )
}

export default App