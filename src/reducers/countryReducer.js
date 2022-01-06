const DefaultState = {
  loading: false,
  data: {},
  errorMessage: ""
}

const CountryListReducer = (state=DefaultState, action) => {
  switch(action.type) {
      case "COUNTRY_LIST_SUCCESS":
        console.log(action.payload, 'hit me');
          return {
              ...state,
              loading: false,
              data: action.payload,
              errorMessage: ''

          }
        case "COUNTRY_ADD":
            console.log(action.payload, 'in reducer');
            return {
                ...state,
                data: {
                    ...state.data,
                    countries: [...state.data.countries, action.payload]
                }
            }
      default:
          return state;
  }
}

export default CountryListReducer;