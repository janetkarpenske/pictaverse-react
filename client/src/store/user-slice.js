import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        signedInUserEmail: null,
        signedInUserUID: null
    },
    reducers: {
        setSignedInUser(state, action) {
            const userEmail = action.payload?.userEmail ?? null;
            const userUID = action.payload?.userUID ?? null;

            //because we are using redux-toolkit we can modify state directly while keeping it immutable
            state.signedInUserEmail = userEmail;
            state.signedInUserUID = userUID;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice;