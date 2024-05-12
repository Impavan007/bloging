import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    currentblog:null,
    loading:false,
    error:false
}

export const blogSlice = createSlice({
  name:'blog',
  initialState,
  reducers:{
    fetchStart:(state)=>{
        state.loading=true

    },
    fetchSucess:(state,action)=>{
        state.loading=false;
        state.currentblog=action.payload;
    },
    fetchFailure:(state)=>{
        state.loading=false;
        state.error=true;}
        ,
        like:(state,action)=>{
          if(!state.currentblog.likes.includes(action.payload)){
              state.currentblog.likes.push(action.payload)
              state.currentblog.dislikes.splice(state.currentblog.dislikes.splice((userId)=>userId===action.payload),1)}
        }
        ,
        dislike:(state,action)=>{
          if(!state.currentblog.dislikes.includes(action.payload)){
              state.currentblog.dislikes.push(action.payload);
              state.currentblog.likes.splice(state.currentblog.likes.splice((userId)=>userId===action.payload),1)}
        },
  }
     
  })

export const {fetchStart,fetchFailure,fetchSucess,like,dislike}= blogSlice.actions;

export default blogSlice.reducer;