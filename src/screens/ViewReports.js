import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import storage from '../shared/core/storage'
import { buildUrl } from '../shared/utils'

const mapboxgl = window.mapboxgl;

export default function CreateReport() {
  
  const user = storage.get('user')

  const [map, setMap] = useState(null)
  const [buildMap, setBuildMap] = useState(true)
  const [userCoords, setUserCoords] = useState(null)
  const [queryCategory, setQueryCategory] = useState('')
  const [maxDist, setMaxDist] = useState(0)
  const [markers, setMarkers] = useState([])

  const initMap = ({ accessToken, containerId }) => {
    mapboxgl.accessToken = accessToken

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const coordsArray = [coords.longitude, coords.latitude];

      const map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordsArray,
        zoom: 9
      })

      const marker = new mapboxgl.Marker()
        .setLngLat(coordsArray)
        .addTo(map);

      map.addControl(new mapboxgl.NavigationControl())

      try {
        document.querySelector('.mapboxgl-marker').style.color = 'red';
      } catch (e) {
        console.log(e)
      }
      
      setUserCoords(coordsArray)
      setMap(map)
    })
  }

  const markCoords = (arrOfCoords) => {
    // remove all markers
    markers.forEach(marker => marker.remove())

    setMarkers(arrOfCoords.map(({ coords, text }) => {
      // const popup = new mapboxgl.Popup({ offset: 25 })
      //   .setText(text)

      return new mapboxgl.Marker()
        .setLngLat(coords)
        // .setPopup(popup)
        .addTo(map)
    }))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const payload = {
      query: { category: queryCategory },
      coordinates: userCoords.slice(0),
      maxDistance: maxDist
    }

    axios.post(buildUrl('/reports/filter?num=100'), payload)
      .then(({ data }) => {
        const coords = data.data.map(d => ({
          coords: d.location.coordinates.reverse(),
          text: `${d.name}: ${d.dest}`
        }))
        markCoords(coords)
      })
      .catch(console.error)
  }

  useEffect(() => {

    if (!buildMap)
      return

    setBuildMap(false)
    initMap({
      accessToken: 'pk.eyJ1Ijoiam5hZm9sYXlhbiIsImEiOiJjazI3enJzMWEwYzZ0M2dxZmpyZXZheWN4In0.uexfq6HYts1_SB4KGyh2hA',
      containerId: 'mapbox'
    })

  }, [buildMap])
  
  return (
    <div>
      <Navbar username={user.username} />

      <div className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="font-sans text-3xl text-gray-800 font-semibold">REPORTS</h1>
          
          <div>
            <form
              onSubmit={handleFormSubmit}
              action=""
              method="POST"
            >
              <div className="flex w-full lg:w-9/12">
                <div className="w-full md:w-1/2">
                  <label className="block">Pick a category</label>
                  <select 
                    className="border rounded w-full px-2 py-2 mt-2 text-md"
                    defaultValue={""}
                    onChange={event => setQueryCategory(event.target.value)}
                  >
                    <option value=""> Pick a category</option>
                    <option value="Roads"> Roads</option>
                    <option value="Banks"> Banks</option>
                    <option value="Markets"> Markets</option>
                    <option value="Others"> Others</option>
                  </select>
                </div>
                <div className="w-full pl-4 md:w-1/2">
                  <label className="block">Set a maximum distance from your location</label>
                  <input
                    type="mumber" 
                    placeholder="Enter in kilometres"
                    className="border rounded w-full px-2 py-2 mt-2 text-md"
                    onChange={event => setMaxDist(event.target.value)} />
                </div>
              </div>

              <button 
                type="submit"
                className="bg-blue-600 rounded-lg hover:shadow-lg block w-64 py-3 px-2 mt-2 mb-6 text-white font-medium font-sans text-center">
                FETCH
              </button>
            </form>

            <div id="mapbox" className="max-h-full mt-4" style={{ height: 500 }}>
              {/*Mapbox Data*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}