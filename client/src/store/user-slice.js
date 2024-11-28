import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        signedInUser: null
    },
    reducers: {
        setSignedInUser(state, action) {
            const user = action.payload;

            //because we are using redux-toolkit we can modify state directly while keeping it immutable
            state.signedInUser = !state.cartIsVisible;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice;