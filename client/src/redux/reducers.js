import userReducer from "./slices/userSlice";
import tasksReducer from "./slices/tasksSlice";

export const rootReducer = {
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
};
