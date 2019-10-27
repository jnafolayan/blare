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
  const [reportLabel, setReportLabel] = useState('')
  const [reportCategory, setReportCategory] = useState('')
  const [reportDesc, setReportDesc] = useState('')
  const [reportMSG, setReportMSG] = useState(null)
  const [reportImage, setReportImage] = useState(null)

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
      
      setUserCoords(coordsArray)
      setMap(map)
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const payload = {
      name: reportLabel,
      location: { coordinates: userCoords.slice(0) },
      description: reportDesc,
      category: reportCategory,
      images: [reportImage]
    }

    axios.post(buildUrl('/reports'), payload)
      .then(({ data }) => {
        setReportMSG(data.message);
      })
      .catch(console.error);
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
          <h1 className="font-sans text-3xl text-gray-800 font-semibold">ISSUE A REPORT</h1>
          
          {
          reportMSG ? 
          <div className="mt-6">
            <p className="font-sans text-green-600 text-lg">{reportMSG}</p>
          </div> :
          <div>
            <p className="mt-6 font-sans text-gray-600">
              <b className="font-semibold">1. Pick a location on the map</b>
            </p>
            <div id="mapbox" className="max-h-full mt-4" style={{ height: 500 }}>
              {/*Mapbox Data*/}
            </div>
            
            <form
              onSubmit={handleFormSubmit}
              action=""
              method="POST"
            >
              <p className="mt-6 font-sans text-gray-600">
                <b className="font-semibold">2. Give it a label</b>
              </p>

              <input 
                type="text" 
                placeholder="e.g Alimosho rd"
                className="border rounded w-full md:w-2/3 px-2 py-2 mt-2 text-md"
                style={{maxWidth: 565}}
                onChange={event => setReportLabel(event.target.value)} />

              <p className="mt-6 font-sans text-gray-600">
                <b className="font-semibold">3. What category is this report?</b> 
              </p>

              <select 
                className="border rounded w-64 px-2 py-2 mt-2 text-md"
                defaultValue={""}
                onChange={event => setReportCategory(event.target.value)}
              >
                <option value=""> Pick a category</option>
                <option value="Roads"> Roads</option>
                <option value="Banks"> Banks</option>
                <option value="Markets"> Markets</option>
                <option value="Others"> Others</option>
              </select>

              <p className="mt-6 font-sans text-gray-600">
                <b className="font-semibold">4. Tell us more about this</b> 
              </p>
              
              <textarea
                placeholder="Write about this report"
                className="border rounded w-full h-64 md:w-2/3 px-2 py-2 mt-2 text-lg"
                style={{maxWidth: 565}}
                onChange={event => setReportDesc(event.target.value)}></textarea>


              <p className="mt-6 font-sans text-gray-600">
                <b className="font-semibold">5. Share a picture url for more detail</b>
              </p>

              <input 
                type="text" 
                placeholder="e.g https://imghost.com/hello.jpg"
                className="border rounded w-full md:w-2/3 px-2 py-2 mt-2 text-md"
                style={{maxWidth: 565}}
                onChange={event => setReportImage(event.target.value)} />

              <button 
                type="submit"
                className="bg-blue-600 rounded-lg hover:shadow-lg block w-64 py-3 px-2 mt-2 mb-6 text-white font-medium font-sans text-center">
                SUBMIT
              </button>
            </form>
          </div>
        }
        </div>
      </div>
    </div>
  );

}