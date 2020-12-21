import React, { useEffect, useState} from 'react';
import JSONPretty from 'react-json-pretty';
import { getCombinedResults } from './helper';
import './App.css';

const App = () => {
  const [state, setstate] = useState({});

  useEffect(() => {
    getCombinedResults().then(x => setstate(x));
  }, []);
  return (

     <JSONPretty id="json-pretty" data={state}></JSONPretty>

  );
}

export default App;
