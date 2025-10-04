import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
}

export default function WeatherMap({ location, setLocation }) {
  return (
    <MapContainer center={[location.lat, location.lon]} zoom={6} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[location.lat, location.lon]} />
      <LocationPicker setLocation={setLocation} />
    </MapContainer>
  );
}
