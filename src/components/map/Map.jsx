import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl} from 'react-leaflet'
import './map.css'
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

  
function Map(){
    const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    Papa.parse('https://raw.githubusercontent.com/CarlosNasayo/AppAfrica/main/src/data/malawi.csv', {
      download: true,
      header: true,
      complete: function(results) {
        setCsvData(results.data);
      }
    });
  }, []);
console.log(csvData)

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
        {csvData.map((dat,index) => (
          <Marker key={index} position={[dat.latitude,dat.longitude]} />
        ))}
        <Marker position={[-16.0308, 35.5059]} />
        <LayersControl position="topright" className="mt-5">
          <LayersControl.BaseLayer checked name="Normal">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Relief">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>

          {/*  <LayersControl.Overlay name="Aceesions" 
          >
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Gap">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                setPruebita(true)
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                setPruebita(false)
              }
            }} />

          </LayersControl.Overlay> */}
        </LayersControl>
        //{" "}
        {/* <ImageOverlay zIndex={1000} url={imageUrl} bounds={imageBounds} /> */}
      </MapContainer>
    );
}
export default Map