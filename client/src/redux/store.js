import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

export const store = configureStore(rootReducer);

export default store;
