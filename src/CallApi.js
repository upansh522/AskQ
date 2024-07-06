// CallApi.js
import React, { useState, useEffect } from 'react';

const CallApi = async (message) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState('');

  // useEffect and useState cannot be used inside a regular function, 
  // they should be used inside a functional component.
  // Therefore, move this logic inside a functional component.
  
  setLoading("loading...");
  setData(null);
  setError(null);
  setQuestion(message);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://open-ai21.p.rapidapi.com/conversationgpt35';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'f95eaec492mshda4493b425e7f0ap16e7f4jsn2a0f9c7c3fcb',
          'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: { question }
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
        const result = await response.text();
        const ans = result.result;
        setLoading(false);
        setData(result);
        setError(null);
        console.log(result);
      } catch (error) {
        setLoading(false);
        setData("res undefined");
        setError("Something went wrong!");
        console.error(error);
      }
    };

    fetchData();
  }, [message]);

  return { data, loading, error };
};

export default CallApi;
