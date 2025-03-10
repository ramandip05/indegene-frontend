import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidates: [],
};

const candidateSlice = createSlice({
  name: "candidateReducer",
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
    updateCandidateAvailability: (state, action) => {
      const { candidateID, status } = action.payload;
      const candidate = state.candidates.find(c => c.candidateID === candidateID);
      if (candidate) {
        candidate.available = status;
      }
    },
  },
});

export const { setCandidates, updateCandidateAvailability } = candidateSlice.actions;
export default candidateSlice.reducer;
