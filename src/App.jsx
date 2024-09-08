import SegmentForm from './components/SegmentForm';
import './App.css'

function App() {
  const allSchemas = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const URL = `https://cors-anywhere.herokuapp.com/https://webhook.site/c610da6b-1b53-4fe4-8363-5212996da21e`;

  const handleSaveSegment = (segmentData) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segmentData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`segemtn data: `, data);
      })
      .catch((err) => {
        console.error(`Error saving segment`, err);
      });
  }

  return (
    <>
      <SegmentForm allSchemas={allSchemas} onSave={handleSaveSegment} />
    </>
  )
}

export default App
