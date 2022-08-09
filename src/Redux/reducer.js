import { UPDATE_CITIES, UPDATE_COUNTRIES, TOGGLE_LOADING } from "./actionType";

const initState = {
    city: [],
    country: [],
    isLoading: false
}
export const reducerCity = (state = initState, { type, payload }) => {
    switch (type) {
        case UPDATE_CITIES:
            return {
                ...state,
                city: payload
            }
        case UPDATE_COUNTRIES:
            return {
                ...state,
                country: payload
            }
        case TOGGLE_LOADING: {
            return {
                ...state,
                isLoading: payload
            }
        }
        default:
            return state;
    }
}