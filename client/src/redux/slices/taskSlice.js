import {createSlice} from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getusertasks = createAsyncThunk(
    "/task/getusertasks", async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get("/task/getusertasks", {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)

export const addtask = createAsyncThunk(
    "/task/newtask", async (info, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.post("/task/newTask",info, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getusertasks())
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)
export const deletetask = createAsyncThunk(
    "/task/deleteusertasks", async (personid, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.delete(`/task/deleteusertask/${personid._id}`, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getusertasks())
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)

export const updatetask = createAsyncThunk(
    "/task/updatetasks", async (personid, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.put(`/task/updateusertask/${personid._id}`,personid, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getusertasks())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)



const taskSlice = createSlice({
    name : "task",
    initialState: {
        isLoading: false,
        taskList: [{title:"",
    desc:""}],
        errors: null
    },
   
    extraReducers: {
        [getusertasks.pending]: (state) => {state.isLoading= true },
        [getusertasks.fulfilled]: (state, action) => {
            state.isLoading= false 
  
            state.errors = null
            state.taskList = action.payload.tasks

        },
        [getusertasks.rejected]: (state, action) => {
            state.isLoading= false 
            state.taskList = []
            state.token = null
            state.errors = action.error
        },


        [deletetask.pending]: (state) => {state.isLoading= true },
        [deletetask.fulfilled]: (state, action) => {
            state.isLoading= false 
  
            state.errors = null
            state.taskList = action.payload

        },
        [deletetask.rejected]: (state, action) => {
            state.isLoading= false 
            state.isAuth = false
            state.token = null
            state.errors = action.error
        },
        
    }
})

export default taskSlice.reducer
