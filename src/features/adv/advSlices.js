import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const acco_id = localStorage.getItem("productAccount")

export const fetchAdv = createAsyncThunk(
  "adv/fetchAdv",
  async () => {
    let data = []
    try {
      data = await axios.get(
        `https://advertising-model.herokuapp.com/api/orderAdvertising/`
      )
      // .then(async(res) => console.log(res.json()) );  
    } catch (error) {
      console.log(error)
    }
    // console.log(data)
    return data;
  }
);

const advSlice = createSlice({
  name: "adv",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    clickAdv(state,action){
      // console.log(state.entities)
      // console.log(action)
      const {prod_id, entities} = action.payload
      // console.log(action)
      entities.map(adv=> {
        return adv.order_advertising_products.map(x=>{
          console.log(x.orap_prod_id+"="+prod_id)
          if(x.orap_prod_id==prod_id){  
            const pack = Number(adv.orad_pack_name.substring(0,3))
            const data = {
              orap_current_duration: x.orap_current_duration-1,
              orap_current_amount: x.orap_current_amount-pack
            }
            return axios.put(`https://advertising-model.herokuapp.com/api/orderAdvertisingProduct/click/${x.orap_id}`,data)
          }
        })
      })    
    },
    // contactInitFirst(state, action) {
    //   state.initialState.entities = action.payload;
    // },
    // contactAdded(state, action) {
    //   state.push(action.payload);
    // },
    // contactUpdated(state, action) {
    //   const { id, firstName, lastName, age, photo } = action.payload;
    //   const exitingContact = state.find(
    //     (contact) => contact.id === id
    //   );
    //   if (exitingContact) {
    //     exitingContact.firstName = firstName;
    //     exitingContact.lastName = lastName;
    //     exitingContact.age = age;
    //     exitingContact.photo = photo;
    //   }
    // },
    // contactDelete(state, action) {
    //   const { id } = action.payload;
    //   const existingUser = state.find(
    //     (contact) => contact.id === id
    //   );
    //   if (existingUser) {
    //     return state.filter((contact) => contact.id !== id);
    //   }
    // },
  },
  extraReducers: {
    [fetchAdv.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAdv.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.entities = data;
      state.loading = false;
    },
    [fetchAdv.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  clickAdv
} = advSlice.actions;

export default advSlice.reducer;
