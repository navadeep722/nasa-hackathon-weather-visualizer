import { Parser } from 'json2csv';

export default function DownloadCSV({ data }) {
  const handleDownload = () => {
    const parser = new Parser();
    const csv = parser.parse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather_data.csv';
    a.click();
  };

  return (
    <button onClick={handleDownload} className="mt-2 p-2 bg-green-500 text-white rounded">
      Download CSV
    </button>
  );
}
