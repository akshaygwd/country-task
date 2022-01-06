import logo from './logo.svg';
import './App.css';
import data from './data.json';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCountry } from './actions/countryAction';
import CountryListing from './components/CountryListing';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountry(data));
  }, []);


  return (
    <div className="App">
      <CountryListing/>
    </div>
  );
}

export default App;
