import { UPDATE_COUNTRIES, UPDATE_CITIES } from "./actionType";

export const getAllCities = () => async (dispatch) => {
    try {
        let res = await fetch("https://jsonserver-country-cities.herokuapp.com/cities");
        res = await res.json();
        dispatch({ type: UPDATE_CITIES, payload: res });
    } catch (error) {
        console.log(error);
    }
}
export const getAllCountries = () => async (dispatch) => {
    try {
        let res = await fetch("https://jsonserver-country-cities.herokuapp.com/country");
        res = await res.json();
        dispatch({ type: UPDATE_COUNTRIES, payload: res });
    } catch (error) {
        console.log(error);
    }
}
export const getFilterData = (country) => async (dispatch) => {
    try {
        let res = await fetch("https://jsonserver-country-cities.herokuapp.com/cities");
        res = await res.json();
        res = res.filter((el) => el.country === country);
        dispatch({ type: UPDATE_CITIES, payload: res });
    } catch (error) {
        console.log(error);
    }
}