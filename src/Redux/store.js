

import {
    legacy_createStore as createStore,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import { reducerCity } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";


export const store = createStore(reducerCity, composeWithDevTools(applyMiddleware(thunk)));