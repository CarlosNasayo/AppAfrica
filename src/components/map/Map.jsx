import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl,Tooltip} from 'react-leaflet'
import './map.css'
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

  
function Map(){
    const [malawi, setMalawi] = useState([]);
    const [zambia, setZambia] = useState([]);
    const [tanzania, setTanania] = useState([]);
    const [checkZambia, setCheckZambia] = useState(false);
    const [checkTanzania, setCheckTanzania] = useState(false);
    const [checkMalawi, setCheckMalawi] = useState(false);

  

  useEffect(() => {
    Papa.parse('https://raw.githubusercontent.com/CarlosNasayo/AppAfrica/main/src/data/malawii.csv', {
      download: true,
      header: true,
      complete: function(results) {
        setMalawi(results.data);
      }
    });
  }, []);
  useEffect(() => {
    Papa.parse('https://raw.githubusercontent.com/CarlosNasayo/AppAfrica/main/src/data/zambia.csv', {
      download: true,
      header: true,
      complete: function(results) {
        setZambia(results.data);
      }
    });
  }, []);
console.log(malawi)
console.log(zambia)
    return (
      <MapContainer
        id="mapid"
        center={[14.88, -35, 76]}
        zoom={3}
        zoomSnap={0.25}
        maxBounds={[
          [-13.47, 29.3],
          [-0.97, 40.56],
        ]}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
        }}
        zoomControl={false}
        
      >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {malawi.map((dat,index) => (
          <Marker position={[dat.latitude,dat.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
                          Name: {dat.name} <br />
                          Ohers: {dat.others}<br />
                          
                          <br />
                         
                        </Tooltip>
          </Marker>
        ))}
        {zambia.map((dat,index) => (
          <Marker position={[dat.latitude,dat.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
                          Name: {dat.name} <br />
                          Ohers: {dat.others}<br />
                          
                          <br />
                         
                        </Tooltip>
          </Marker>
        ))}
        <Marker position={[-16.0308, 35.5059]} />
        <LayersControl position="topright" className="mt-5">
         
        <LayersControl.Overlay name="Zambia" 
          >
            <TileLayer url="" 
             eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                console.log('added zambia')
                },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                console.log('removed zambia')

              }
            }}
            />
          </LayersControl.Overlay>

           <LayersControl.Overlay name="Tanzania" 
          >
            <TileLayer url="" 
             eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                console.log('added tanzania')
                },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                console.log('removed tanzania')

              }
            }}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Malawi">
            <TileLayer url=""
            eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                console.log('added malawi')
                },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                console.log('removed malawi')

              }
            }} />

          </LayersControl.Overlay>
        </LayersControl>
        //{" "}
        
      </MapContainer>
    );
}
export default Map