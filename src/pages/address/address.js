import axios from "axios";
import react from "react";
import React, { useEffect, useState } from "react";
import { apiUserMaster } from '../../config/apiUrl'



// asda

const Address = () => {

  const [alamat, setAddress] = useState([]);

  useEffect(() => {
      axios.get(`${apiUserMaster}/address/`)
      .then(res => {

        setAddress(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  console.log(alamat)

  

    return (
      <>
        <ul>
          {
            alamat.map(address => <li key={address.addr_id}>{address.addr_adress}</li>)
           
          }
        </ul>
      </>
    );
  
}

export default Address