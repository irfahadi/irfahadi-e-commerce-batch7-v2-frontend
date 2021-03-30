import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Sidebar from "./sidebar";
import { apiAdvertising } from '../../config/apiUrl';
import {TableAdvertising} from './tableAdvertising'
import AddEditForm from './AddEditForm'

export default function Advertising() {
  const [Adv, setAdv] = useState([])
  const [isModalShow, setisModalShow] = useState(false)
  const [dataEditRow, setdataEditRow] = useState(null)
  
  useEffect(() => {
    fetchAdv()
  }, [])

  async function fetchAdv(){
    return await axios({
      url: `${apiAdvertising}/packageType/`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setAdv(res.data)
      })
      .catch((err) => console.error(err));
  }

  const onModalShow = (value)=> setisModalShow(value)

  const onEditRow = (value) => {
    setdataEditRow(value);
    setisModalShow(true)
  }

  const onDeleteRow = async (value) =>{
    return await axios({
      url: `${apiAdvertising}/packageType/${value}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => 
        fetchAdv()
      )
      .catch((err) => console.error(err));
  }
  


    return (
      <div className="flex flex-wrap">
        <Sidebar />
        <div className="w-full md:w-9/12">
          <TableAdvertising adv={Adv}
          setShowModal = {onModalShow}
          seteDelete = {onDeleteRow}
          setEdit = {onEditRow}
          fetchAdv = {fetchAdv}
          />
          {
            isModalShow && <AddEditForm 
            setShowModal={onModalShow} 
            dataRow = {dataEditRow}
            fetchAdv = {fetchAdv}
        />
          }
        </div>
      </div>
    );
}
