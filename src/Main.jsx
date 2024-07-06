import React, { useState, useEffect } from 'react';
import './Main.css';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

const Main = (props) => {
  const outputSectionStyle = {
    flex: props.historyShow ? 0.8 : 1,
    filter: props.historyShow ? 'blur(2px)' : 'none'
  };

  // Initialize message state with an empty string
  const [message, setMessage] = useState('');
  const [ask, setAsk] = useState('');
  const [result,setResult]=useState(false);


  // Initialize historyContent as an array
  const [historyContent, setHistoryContent] = useState([]);
  const [ans, setAns] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://open-ai21.p.rapidapi.com/conversationgpt35';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'cbb840180emsh2680e9f3a3f59c2p15db9bjsn2e06040ea692',
          'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: ask // Pass the current message as content
            }
          ],
          web_access: false,
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256
        })
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse response as JSON
        const apiResult = result.result; // Access the "result" property
        setAns(apiResult); // Set the result to state
      } catch (error) {
        console.error(error);
      }
    };

    if (ask) {
      // Call fetchData only if ask has a value
      fetchData();
    }
  }, [ask]); // Trigger the effect whenever ask changes

  const handleSearch = () => {
    // Update historyContent by spreading previous content and adding a new object
    setHistoryContent(prev => [...prev, { content: message }]);
    setAsk(message); // Set ask to the current message
    setResult(true);
    setMessage('') ;
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Main">
      {props.historyShow &&
        <div className="HistorySection">
          {historyContent.map((item, index) => (
            <h4 key={index} className='history_items' maxLength={10} onClick={() => setAsk(item.content)}>{item.content}</h4>
          ))}
        </div>
      }
      <div className="outputSection" style={outputSectionStyle}>
        {result && <div className="result">
          <h3 >{ask}</h3>
          <div className='output'>
            <h4>{ans}</h4>
          </div>
        </div>}
        <div className="search">
          <input className="searchPlace" placeholder="Search Here" type="text" value={message} onChange={handleChange} />
          <SearchIcon className='searchIcon' onClick={handleSearch} onKeyUp={searchQueryHandler} />
          <MicIcon className='MicIcon' />
        </div>
      </div>
    </div>
  );
};

export default Main;
