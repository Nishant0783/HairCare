import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    personalDetails: {
        name: '',
        email: '',
        number: '',
    },
    step: 1,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setPersonalDetails: (state, action) => {
            state.personalDetails = action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
    },
});

export const { setPersonalDetails, setStep } = formSlice.actions;
export default formSlice.reducer;
