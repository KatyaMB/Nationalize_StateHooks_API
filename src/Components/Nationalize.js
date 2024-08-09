import React from 'react';

function Nationalize() {

  // Setting the states with use state hook for name input and nationality
  const [name, setName] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  // Setting up useRef hook
  const inputRef = React.useRef(null);

  // Using an async function with a try catch block to catch errors
  const fetchNationality = async () => {
    if (!name) return;
    try {
      // Assingning API results
      let response = await fetch(`https://api.nationalize.io?name=${name}`);
      let data = await response.json();
      // Using state to set nationality
      if (data.country && data.country.length > 0) {
        setNationality(data.country[0]);
      } else {
        console.error('We could not find any information');
      }

    } catch (error) {
      console.error('There was an error with the submission', error);

    }
  };

  // Creating a button handle
  let handleButtonClick = () => {
    fetchNationality();
  }

  // Setting the name with input event
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  // Creating an autofocus
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);


  // Outputting the input field and button
  return (
    <div style={{ padding: '20px' }} className="App">
      <h1 className='headerOne'>Predict nationality by name </h1>
      <input className='inputName'
        id="input-field"
        ref={inputRef}
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter a name"
      />

      <button className="buttonClick" onClick={handleButtonClick}>Predict Nationality</button>
      {/* Conditionally rendering the output to leave out empty/NaN returns*/}
      {nationality && (
      <div>
          <p>Country ID: {nationality.country_id}</p>
          <p>Probability: {(nationality.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

// Exporting the app
export default Nationalize;
