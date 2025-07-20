import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:{},
    isLoggedIn:false,
    value:0
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            state.user = action.payload.user;
            state.isLoggedIn=true
        },
        updateUser(state,action){
            state.user ={
                ...state.user,
                ...action.payload
            }
        },
        logout(state,action){
            state.user={}
            state.isLoggedIn=false
        }
    }
})

console.log(authSlice,'-------------------------------');



export const {login,updateUser,logout} = authSlice.actions
export default authSlice.reducer
