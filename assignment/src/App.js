import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [searchText, setSearchText] = useState();
  const [token, setToken] = useState();
  const [callapi, setCallapi] = useState(1);
  const [suggestions, setSuggestions] = useState();
  const [flag, setFlag] = useState(false);
  const [suggestionList, setSuggestionList] = useState();
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
  useEffect(()=>{
if(suggestions){
  setFlag(true);
  setSuggestionList(suggestions.data);
}
  },[suggestions])
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
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setSuggestions(data));
  };
  const changeInput = (e) => {
    const input = e.target.value;
    setSearchText(input);
    fetchSearchSuggestion(input);
  }
  const handleEnter=(term)=>{
     setSearchText(term);
     setFlag(false);
  };
  return (
    <div>
      <div className='heading'>Autocomplete Dropdown</div>
    <div className="autocomplete searchbar">
      <input
        type="text"
        placeholder="Tap here to search"
        value={searchText}
        className="search-box1 ellipse"
        onChange={changeInput}
      />
      {flag && suggestionList && suggestionList.length>0&&
              <div className='search-suggestion' >
                <ul>
                  {suggestionList?.map((item) => {
                    return <li className='search-suggestion-list' style={{left: '11px'}} onClick={()=>handleEnter(item.DisplayLine)}><p>
                      {item.DisplayLine}
                    </p></li>;
                  })}
                </ul>
              </div>
            }
            <button
              data-testid="reset-search"
              className="close-icon lt"
              type="reset"
              onClick={() => setSearchText('')}
            ></button>
    </div>
    </div>
  );
}

export default App;
