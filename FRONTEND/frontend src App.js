import React, { useState } from 'react';
import WeatherMap from './WeatherMap';
import WeatherChart from './WeatherChart';
import DownloadCSV from './DownloadCSV';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState({ lat: 12.9716, lon: 77.5946 });
  const [date, setDate] = useState('2025-10-01');
  const [prob, setProb] = useState(null);
  const [rawData, setRawData] = useState(null);

  const fetchWeather = async () => {
    const response = await axios.post('http://localhost:5000/getWeatherProb', {
      lat: location.lat,
      lon: location.lon,
      date,
    });
    setProb(response.data.prob);
    setRawData(response.data.rawData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Outdoor Weather Probability Dashboard</h1>
      <div className="mb-4">
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <WeatherMap location={location} setLocation={setLocation} />
      <button onClick={fetchWeather} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Check Weather
      </button>
      {prob && (
        <div className="mt-4">
          <WeatherChart prob={prob} />
          <DownloadCSV data={{ prob, rawData }} />
        </div>
      )}
    </div>
  );
}

export default App;
