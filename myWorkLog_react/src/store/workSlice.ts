import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddWork, WorkSliceType, WorkType } from "../types/Work";
import { api } from "../axios/axios";

const initialState: WorkSliceType = {
    works: [],
    filteredWorks: []
}
export const getAllWorks = createAsyncThunk(
    "work/getAllWorks",
    async () => {
        const response = await api.get<WorkType[]>("/work");
        return response.data;
    }
);

export const addWork = createAsyncThunk(
    "work/addWork",
    async (work: AddWork) => {
        const response = await api.post<WorkType>("/work", work);
        return response.data;
    }
);

export const deleteWork = createAsyncThunk(
    "work/deleteWork",
    async (id: string) => {
        await api.delete("/work/" + id);
        return id;
    }
);

const workSlice = createSlice({
    name: "work",
    initialState,
    reducers: {
        getFilteredWorks(state, action: PayloadAction<string>) {
            const parts = action.payload.split("-");

            if (parts.length !== 4) return;

            const [, month, year] = parts;

            state.filteredWorks = state.works.filter(work => {
                const [, workMonth, workYear] = work.date.split("-");

                return Number(workMonth) === Number(month)
                    && Number(workYear) === Number(year);
            });
        },
        clearFilteredWorks(state) {
            state.filteredWorks = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllWorks.fulfilled, (state, action) => {
            state.works = action.payload;
            state.filteredWorks = [];
        });
        builder.addCase(addWork.fulfilled, (state, action) => {
            state.works.push(action.payload);
            state.filteredWorks = [];
        });
        builder.addCase(deleteWork.fulfilled, (state, action) => {
            state.works = state.works.filter(x => x['_id'] !== action.payload);
            state.filteredWorks = [];
        });
    }
});

export const { getFilteredWorks, clearFilteredWorks } = workSlice.actions;
export default workSlice.reducer;