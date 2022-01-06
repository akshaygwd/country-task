import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './CountryListing.css';
import { AddCountry } from '../actions/countryAction';


const CountryListing = () => {
  const countries = useSelector((state) => state?.countryList?.data?.countries);
  const dispatch = useDispatch();
  console.log(countries, 'here');
  const [ countryListingItems, setCountryListingItems ] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [countryError, setCountryError] = useState('');
  const [ fileError, setFileError ] = useState('');
  const [ countryImage, setCountryImage ] = useState('');
  const [ countryImageUrl, setCountryImageUrl ] = useState('');
  const [ continents, setContinents ] = useState([]);
  const [ continentValue, setContinentValue ] = useState('');
  const [rank, setRank] = useState(0);

  useEffect(() => {
    setCountryListingItems(countries);
    const onlyContinents =  (countries && countries.length > 0) && countries.map((item) => item.continent);
    console.log(onlyContinents);
    setContinents([...new Set(onlyContinents)])
  }, [countries]);


  const handleChange = (e) => {
    const oldState = [...countries];
    const updateState = oldState.filter((item) => item.name === e.target.value);
    if(e.target.value === 'reset') {
      setCountryListingItems(countries);
    } else {
      setCountryListingItems(updateState);
    }
  }

  useEffect(() => {
    if(countryImageUrl) {
      console.log(countryName, countryImageUrl, continentValue, rank);
      dispatch(AddCountry({name: countryName, continent: continentValue, flag: countryImageUrl, rank: rank }))
    }
}, [countryImageUrl])

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(countryImage.type === 'image/png', 'hit');
    if(countryName.length < 3 || countryName.length > 21) {
      setCountryError('County name should be between 3 to 20 length');
    }
    else if((countryImage.type === 'image/png' || countryImage.type === 'image/jpeg') && (countryName.length > 3 || countryName.length < 21)) {
      setCountryError('');
      setFileError('');
      const data = new FormData();
      data.append("file", countryImage);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dp0xf2zwq");
      fetch("https://api.cloudinary.com/v1_1/dp0xf2zwq/image/upload", {
        method: "post",
        body: data
      }).then(res => res.json())
      .then((data) => {
        console.log(data);
        setCountryImageUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else {
      setFileError('only upload png and jpeg upto 4 MB');
    }
  }

  return (
    <div className="container">
      <div className="leftside">
      <select onChange={(e) => handleChange(e)}>
        <option value="reset">Please select Country</option>
      {(countries && countries?.length > 0) && countries.map((item) => {
            return (
              <option key={item.name } value={item.name}>{item.name}</option>
            )
          })
        }
      </select>
      <div className="country-list">
        <ul>
          {(countryListingItems && countryListingItems?.length > 0) && countryListingItems.map((item) => {
            return (
              <li key={item.name}>
                <h2>
                  {item?.name}
                </h2>
                <img src={`${item.flag}`} alt={item?.name}/>
                <p>{item.continent}</p>
                <p>{item?.rank}</p>
              </li>
            )
          })
          }
        </ul>
      </div>
      </div>
      <div className="rightside">
        <form onSubmit={(e) => submitHandle(e)}>
          <div className="field-wrapper">
            <label for="country-name">Country Name</label>
            <input type="text" id="country-name" minLength={3} maxLength={20} onChange={(e) => setCountryName(e.target.value)} value={countryName}/>
            {countryError && <span className="error">{countryError}</span>}
          </div>
          <div className="field-wrapper">
            <div className="btn">
              <span>Upload Country Image</span>
              <input type="file" onChange={(e) => setCountryImage(e.target.files[0])} />
              {fileError && <span className="error">{fileError}</span>}
            </div>
          </div>
          <div className="field-wrapper">
            <label for="continent">Select continent</label>
            <select id="continent" onChange={(e) => setContinentValue(e.target.value)}>
                <option value="reset">Please select</option>
              {(continents && continents?.length > 0) && continents.map((item) => {
                    return (
                      <option value={item} key={item}>{item}</option>
                    )
                  })
                }
            </select>
          </div>
          <div className="field-wrapper">
            <label for="rank">Rank</label>
            <input id="rank" type="number" onChange={(e) => setRank(e.target.value)} value={rank} />
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}

export default CountryListing;