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
  const [showExistingDrugsInput, setShowExistingDrugsInput] = useState(false);
  const [showAllergiesInput, setShowAllergiesInput] = useState(false);
  const apiService = new APIService();

  const currentMedication = `They are currently taking other medication, ${existingDrugs}.`;
  const noCurrentMedication = 'They are currently taking no other medication.';
  const knownAllergies = `There have known allergies. ${allergies}`;
  const noKownAllergies = 'There are no known allergies';

  let medicationInfo = showExistingDrugsInput ? currentMedication : noCurrentMedication;
  let allergyInformation = showAllergiesInput ? knownAllergies : noKownAllergies;

  const promptToApi = `Please give me a brief information about the medicine ${drug} and probably problems about it taking by a ${selectedSex} at the age of  ${age}.
  ${medicationInfo}
  ${allergyInformation}
  Can you add some information about the side effects, the dosage, and possible contraindication to other drugs.`;

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const request = {
        model: 'text-davinci-003',
        max_tokens: 4000,
        prompt: promptToApi
      };

      const completion = await apiService.createCompletion(request);
      console.log(completion);

      setData(completion);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch completion:', error);
      setLoading(false);
    }
  };

  const handleCheckButtonClick = (inputType: string) => {
    if (inputType === 'existingDrugs') {
      setShowExistingDrugsInput(!showExistingDrugsInput);
    } else if (inputType === 'allergies') {
      setShowAllergiesInput(!showAllergiesInput);
    }
  };

  const isFormValid = age && drug; // Check if age and drug fields are filled

  return (
    <div className="App">
      <div className="App-header">
        <div className="App-logo">Mediscan</div>
      </div>
      <div className="App-body">
        <div className="text-block">Information about medication and more</div>
        <div className="form-group">
          <label htmlFor="drug">Which drug?</label>
          <input
            className="styled-input"
            type="text"
            id="drug"
            value={drug}
            onChange={(event) => setDrug(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <select
            className="styled-select"
            id="sex"
            value={selectedSex}
            onChange={(event) => setSelectedSex(event.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            className="styled-input"
            type="number"
            id="age"
            value={age || ''}
            onChange={(event) => setAge(Number(event.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkExistingDrugs">Are you currently taking any other drugs:</label>
          <input
            className="styled-checkbox"
            type="checkbox"
            id="checkExistingDrugs"
            checked={showExistingDrugsInput}
            onChange={() => handleCheckButtonClick('existingDrugs')}
          />
        </div>
        {showExistingDrugsInput && (
          <div className="form-group">
            <label htmlFor="existingDrugs">Please list your current drugs:</label>
            <input
              className="styled-input"
              type="text"
              id="existingDrugs"
              value={existingDrugs}
              onChange={(event) => setExistingDrugs(event.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="checkAllergies">Do you have any known allergies?:</label>
          <input
            className="styled-checkbox"
            type="checkbox"
            id="checkAllergies"
            checked={showAllergiesInput}
            onChange={() => handleCheckButtonClick('allergies')}
          />
        </div>
        {showAllergiesInput && (
          <div className="form-group">
            <label htmlFor="allergies">Please list your allergies:</label>
            <input
              className="styled-input"
              type="text"
              id="allergies"
              value={allergies}
              onChange={(event) => setAllergies(event.target.value)}
            />
          </div>
        )}
        <div>
          <button className="styled-button" onClick={handleButtonClick} disabled={!isFormValid}>
            Let's go
          </button>
          {!isFormValid && <div className="add-info">Please enter your age and the drug you want to scan.</div>}
        </div>
        {loading && <div>Loading...</div>}
      </div>
      {data && (
        <div className="result">
          {/* <h3>API Response:</h3> */}
          <pre className="response-text">{data}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
