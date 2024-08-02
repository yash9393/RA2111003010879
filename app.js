import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [sections, setSections] = useState({
        characters: true,
        numbers: true,
        highestAlphabet: true
    });

    const handleSubmit = async () => {
        try {
            const res = await axios.post('your_backend_api_url/bfhl', JSON.parse(jsonInput));
            setResponse(res.data);
        } catch (error) {
            console.error('Invalid JSON or server error', error);
        }
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <input 
                type="text" 
                value={jsonInput} 
                onChange={e => setJsonInput(e.target.value)} 
                placeholder='Enter JSON' 
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <div>
                    <div>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={sections.characters}
                                onChange={() => setSections({...sections, characters: !sections.characters})} 
                            />
                            Characters
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={sections.numbers}
                                onChange={() => setSections({...sections, numbers: !sections.numbers})} 
                            />
                            Numbers
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={sections.highestAlphabet}
                                onChange={() => setSections({...sections, highestAlphabet: !sections.highestAlphabet})} 
                            />
                            Highest Alphabet
                        </label>
                    </div>

                    {sections.characters && <div>Characters: {response.alphabets.join(', ')}</div>}
                    {sections.numbers && <div>Numbers: {response.numbers.join(', ')}</div>}
                    {sections.highestAlphabet && <div>Highest Alphabet: {response.highest_alphabet.join(', ')}</div>}
                </div>
            )}
        </div>
    );
}

export default App;
