import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/userSlice"
import taskReducer from "./slices/taskSlice"




export default configureStore({reducer: {user: rootReducer,task:taskReducer}})