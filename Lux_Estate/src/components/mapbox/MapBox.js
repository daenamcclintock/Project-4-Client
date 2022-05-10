// import React, { useState, useEffect } from 'react'
// // import ReactMapGL, { Marker, Popup } from 'react-map-gl'

// const MapBox = () => {
//     const [viewport, setViewport] = useState({
//         latitude: 42.3601,
//         longitude: -71.0589,
//         zoom: 10,
//         width: '100vw',
//         height: '100vh'
//     })
//     cosnt [selectedProperty, setSelectedProperty] = useState(null)

//     useEffect(() => {
//         const listener = e => {
//             if(e.key === 'Escape') {
//                 setSelectedProperty(null)
//             }
//         }
//         window.addEventListener('keydown', listener)

//         return () => {
//             window.removeEventListener('keydown', listener)
//         }
//     },[])

//     return (
//         <div>
//             <ReactMapGL 
//                 {...viewport}
//                 mapboxApiAccessToken = {'pk.eyJ1IjoiZG1jY2xpbnRvY2sxMyIsImEiOiJjbDJudGxoYjQyNWI1M2RwbDk3a3oxYWEzIn0.iIbD8pohUJSXTf9Gf9AujQ'}
//                 mapStyle = 'mapbox://styles/mapbox/streets-v11'
//                 onViewportChange = {(viewport) => {setViewport(viewport)
//                 }}
//             >
//                 {propertiesData.map((property) => (
//                     <Marker
//                         key={property._id}
//                         latitude={42.3601}
//                         longitude={-71.0589}
//                     >
//                         <button className='house-btn' onClick={(e) => {
//                             setSelectedProperty(property)
//                         }}>
//                             <img src="../../images/house-emoji.png" alt="House Icon"/>
//                         </button>
//                     </Marker>
//                 ))}
//                 {selectedProperty ? (
//                     <Popup latitude={1} longitude={1} onClose={() => {
//                         setSelectedProperty(null)
//                     }}>
//                         <div>
//                             <h2>{property.address}</h2>
//                             <h2>{property.seller}</h2>
//                             <h2>{property.address}</h2>
//                         </div>
//                     </Popup>
//                 ) : null}
//             </ReactMapGL>

//         </div>
//     )
// }
// export default MapBox