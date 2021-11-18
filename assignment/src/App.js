// eslint-disable-next-line react-hooks/exhaustive-deps
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [searchText, setSearchText] = useState();
  const [token, setToken] = useState();
  const [callapi, setCallapi] = useState(1);
  const [suggestions, setSuggestions] = useState(1);
  useEffect(() => {
    if (callapi === 1) {
      fetch('https://devcore02.cimet.io/v1/generate-token', {
        method: 'POST',
        headers: {
          'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301',
        },
        body: JSON.stringify({

        })
      })
        .then(response => response.json())
        .then(data => setToken(data.data.token));
      setCallapi(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callapi]);
  const fetchSearchSuggestion=(text)=>{
    fetch('https://devcore02.cimet.io/v1/search-address', {
      method: 'POST',
      body: JSON.stringify(
        {
          search_address: `${text}`,
        }
        ),
      headers: {
        'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301',
        'Auth-token':`${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setSuggestions(data));
    setCallapi(0);
  };
  const changeInput = (e) => {
    const input = e.target.value;
    setSearchText(input);
    fetchSearchSuggestion(input);
  }
  console.log(suggestions);
  return (

    <div className="App">
      <input
        type="text"
        placeholder="Tap here to search"
        value={searchText}
        onChange={changeInput}
      />
    </div>
  );
}

export default App;
