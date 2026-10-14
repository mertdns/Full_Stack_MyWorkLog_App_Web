import { configureStore } from "@reduxjs/toolkit";
import workSlicee from "./workSlice";

export const store = configureStore({
    reducer:{
        work: workSlicee
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch