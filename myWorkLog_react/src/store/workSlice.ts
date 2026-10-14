import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WorkSliceType, WorkType } from "../types/Work";
import { worksData } from "../sample-data/data";

const initialState: WorkSliceType = {
    works: worksData,
    filteredWorks: []
}

const workSlice = createSlice({
    name: "work",
    initialState,
    reducers: {
        addWorks(state: WorkSliceType, action: PayloadAction<WorkType[]>) {
            state.works = action.payload;
        },
        addSingleWork(state: WorkSliceType, action: PayloadAction<WorkType>){
            state.works?.push(action.payload);
        },
        deleteWork(state, action: PayloadAction<number>) {
            const index = state.works?.findIndex(x => x.id === action.payload);
            if (index !== -1 && index != null) {
                state.works?.splice(index, 1);
            }
        },
        updateWork(state: WorkSliceType, action: PayloadAction<WorkType>) {
            const index = state.works?.findIndex(x => x.id === action.payload.id);
            if (index != -1 && index != null) {
                state.works?.splice(index, 1, action.payload);
            }
        },
        getFilteredWorks(state, action: PayloadAction<string>) {
            const parts = action.payload.split("-");

            if (parts.length !== 4) return;

            const [, month, year ,] = parts;

            const filteredWorks = state.works?.filter(work => {
                const [, workMonth, workYear ,] = work.date.split("-");

                return workMonth === month && workYear === year;
            });

            if(filteredWorks)
                state.filteredWorks = filteredWorks;
        }
    }
});

export const { addWorks, deleteWork, updateWork, getFilteredWorks, addSingleWork } = workSlice.actions;
export default workSlice.reducer;