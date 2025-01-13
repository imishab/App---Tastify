import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
    userInfo: any | null;
    token: string | null;
}

const initialState: UserState = {
    userInfo: null, 
    token: null,    
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<{ userInfo: any; token: string }>) => {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            if (typeof window === 'undefined') {
                AsyncStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
                AsyncStorage.setItem('token', action.payload.token);
            }
        },
        clearUserDetails: (state) => {
            state.userInfo = null;
            state.token = null;
            if (typeof window === 'undefined') {
                AsyncStorage.removeItem('userInfo');
                AsyncStorage.removeItem('token');
            }
        },
        loadUserDetails: (state) => {
            // This action will be dispatched to load the user info from AsyncStorage when the app starts
            AsyncStorage.getItem('userInfo')
                .then((userInfo) => {
                    if (userInfo) {
                        state.userInfo = JSON.parse(userInfo);
                    }
                })
                .catch((error) => {
                    console.error('Error loading user info from AsyncStorage:', error);
                });
            AsyncStorage.getItem('token')
                .then((token) => {
                    if (token) {
                        state.token = token;
                    }
                })
                .catch((error) => {
                    console.error('Error loading token from AsyncStorage:', error);
                });
        },
    },
});

export const { setUserDetails, clearUserDetails, loadUserDetails } = userSlice.actions;

export default userSlice.reducer;
