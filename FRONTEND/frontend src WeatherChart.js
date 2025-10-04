import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WeatherChart({ prob }) {
  const data = {
    labels: ['Very Hot', 'Very Cold', 'Very Windy', 'Very Wet', 'Very Uncomfortable'],
    datasets: [
      {
        label: 'Probability',
        data: [
          prob.veryHot,
          prob.veryCold,
          prob.veryWindy,
          prob.veryWet,
          prob.veryUncomfortable,
        ],
        backgroundColor: ['#FF5733', '#3498DB', '#F1C40F', '#1ABC9C', '#8E44AD'],
      },
    ],
  };

  return <Bar data={data} />;
}
