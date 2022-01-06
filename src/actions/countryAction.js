export const fetchCountry = (country) => {
    return {
      type: 'COUNTRY_LIST_SUCCESS',
      payload: country
    }
  }

export const AddCountry = (country) => {
    console.log(country, 'country');
    return {
        type: 'COUNTRY_ADD',
        payload: country
    }
}
