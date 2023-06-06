import React, { useState } from 'react';
import './App.css';
import APIService from './apiService';

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedSex, setSelectedSex] = useState('non-binary'); 
  const [drug, setDrug] = useState(''); 
  const [existingDrugs, setExistingDrugs] = useState(''); 
  const [allergies, setAllergies] = useState(''); 
  const [age, setAge] = useState<number>();
  const apiService = new APIService();

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const request = {
        model: "text-davinci-003",
        prompt: `Please summarize very shortly the leaflet of ${drug}.
        Are there any problems for a ${selectedSex} person with the age of ${age}, currently taking these drugs ${existingDrugs}, with known allergies ${allergies}, when taking ${drug}?`, 
      };

      const completion = await apiService.createCompletion(request);
      console.log(completion);

      setData(completion);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch completion:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label htmlFor="drug">Which drug?</label>
          <input type="text" id="drug" value={drug} onChange={(event) => setDrug(event.target.value)} />
        </div>        <div>
          <label htmlFor="sex">Sex:</label>
          <select id="sex" value={selectedSex} onChange={(event) => setSelectedSex(event.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(event) => setAge(Number(event.target.value))} />
        </div>
        <div>
          <label htmlFor="existingDrugs">What drugs are you taking currently:</label>
          <input type="text" id="existingDrugs" value={existingDrugs} onChange={(event) => setExistingDrugs(event.target.value)} />
        </div>
        <div>
          <label htmlFor="allergies">Do you have any allergies:</label>
          <input type="text" id="allergies" value={allergies} onChange={(event) => setAllergies(event.target.value)} />
        </div>
        <div>
          <button onClick={handleButtonClick}>Let's go</button>
        </div>
        {loading && <div>Loading...</div>}
        {data && (
          <div className="result">
            <h3>API Response:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
