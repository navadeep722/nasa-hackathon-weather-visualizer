import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/getWeatherProb', async (req, res) => {
  const { lat, lon, date } = req.body;
  const start = date.replace(/-/g, '');
  const end = start;

  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,WS10M,PRECTOT,RH2M,CLD_FRAC,DUST&community=AG&longitude=${lon}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const dailyData = data.properties.parameter;

    const temperature = dailyData.T2M[Object.keys(dailyData.T2M)[0]];
    const wind = dailyData.WS10M[Object.keys(dailyData.WS10M)[0]];
    const rainfall = dailyData.PRECTOT[Object.keys(dailyData.PRECTOT)[0]];
    const humidity = dailyData.RH2M[Object.keys(dailyData.RH2M)[0]];
    const cloud = dailyData.CLD_FRAC[Object.keys(dailyData.CLD_FRAC)[0]];
    const dust = dailyData.DUST[Object.keys(dailyData.DUST)[0]];

    const prob = {
      veryHot: temperature > 35 ? 0.7 : 0.1,
      veryCold: temperature < 5 ? 0.6 : 0.05,
      veryWindy: wind > 15 ? 0.5 : 0.1,
      veryWet: rainfall > 10 ? 0.6 : 0.1,
      veryUncomfortable:
        temperature > 35 || humidity > 80 || wind > 15 || dust > 0.5
          ? 0.75
          : 0.1,
    };

    res.json({ prob, rawData: dailyData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
