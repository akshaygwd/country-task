import { combineReducers } from "redux";
import CountryListReducer from "./countryReducer";

const RootReducer = combineReducers({
    countryList: CountryListReducer,
});

export default RootReducer;