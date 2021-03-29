import axios from 'axios'
import { apiUserMaster, apiUserAccount } from '../../config/apiUrl'





const listCity = async () => {
    try {
        let response = await axios.get(`${apiUserAccount}/city/`)
        return await response.data
    }   catch(err){
        return await err.message
    }
}

//2.createRegion, gunakan variable data untuk di send ke backend
// di backend, jangan lupa pake req.body.data, agar bisa di extract ke tiap attribute
const create = async (city) => {
    try {
        let response = await axios.post(`${apiUserAccount}/city/`,{
          data : city
        })
        return await response.data
      } catch(err) {
        return await err.message
      }
  };
  
  const deleteCity = async (cityId) => {
    try {
        let response = await axios.delete(`${apiUserAccount}/city/${cityId}`)
        return await response.data
      } catch(err) {
        return await err.message
      }
  };
  
  const updateCity = async (city) => {
    try {
        let response = await axios.put(`${apiUserAccount}/city/${city.city_id}`,{
          data : city
        })
        return await response.data
      } catch(err) {
        return await err.message
      }
  };
  

export {listCity, create, deleteCity, updateCity}