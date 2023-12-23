import { createStore } from "redux";

import reducer, { initialState } from "./user/userReducer";

export const myStore = createStore(reducer, initialState);

export default myStore;
