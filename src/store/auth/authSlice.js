import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        buttonSpinnerFlag: false,
        uid: null, 
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null, 
        errorMessageFlag: false,
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            state.buttonSpinnerFlag = false;
            state.uid = payload.uid;
            state.displayName = payload.displayName;
            state.email = payload.email;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
            state.errorMessageFlag = false;
        },
        logout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.buttonSpinnerFlag = false;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage || null; 
            state.errorMessageFlag = !!state.errorMessage ? true : false;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = null; 
            state.errorMessageFlag = false;
        },
        deleteErrorMessageAlert: (state) => {
            state.errorMessageFlag = false;
        },
        loadButtonSpinner: (state) => {
            state.buttonSpinnerFlag = true;
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, deleteErrorMessageAlert, loadButtonSpinner } = authSlice.actions;