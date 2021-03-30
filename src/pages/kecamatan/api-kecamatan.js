import axios from 'axios'
import { apiUserMaster, apiUserAccount } from '../../config/apiUrl'




const listKecamatan = async () => {
    try {
        let response = await axios.get(`${apiUserAccount}/kecamatan/`)
        return await response.data
    }   catch(err){
        return await err.message
    }
}

//2.createRegion, gunakan variable data untuk di send ke backend
// di backend, jangan lupa pake req.body.data, agar bisa di extract ke tiap attribute
const create = async (kecamatan) => {
    try {
        let response = await axios.post(`${apiUserAccount}/kecamatan/`,{
          data : kecamatan
        })
        return await response.data
      } catch(err) {
        return await err.message
      }
  };
  
  const deleteKecamatan = async (kecamatanId) => {
    try {
        let response = await axios.delete(`${apiUserAccount}/kecamatan/${kecamatanId}`)
        return await response.data
      } catch(err) {
        return await err.message
      }
  };
  
  const updateKecamatan = async (kecamatan) => {
    try {
        let response = await axios.put(`${apiUserAccount}/kecamatan/${kecamatan.kec_id}`,{
          data : kecamatan
        })
        return await response.data
      } catch(err) {
        return await err.message
      }
  };
  

export {listKecamatan, create, deleteKecamatan, updateKecamatan}