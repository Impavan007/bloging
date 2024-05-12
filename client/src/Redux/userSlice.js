import { createSlice } from '@reduxjs/toolkit'
const initialState ={
    currentUser:null,
    loading:false,
    error:false
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart:(state)=>{
        state.loading=true
    },
    loginSuccess:(state,action)=>{
        state.loading=false;
        state.currentUser=action.payload;
    },
    loginfailure:(state)=>{
        state.loading=false;
        state.error=true;
    },
    logOut:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=false;
    },
    follow:(state,action)=>{
        if(state.currentUser.following.includes(action.payload)){
          state.currentUser.following.splice(state.currentUser.following.findIndex((blogerId)=>blogerId===action.payload),1)
        }else{
          state.currentUser.following.push(action.payload)
        }
            }
  }
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginfailure,logOut,follow } = userSlice.actions

export default userSlice.reducer