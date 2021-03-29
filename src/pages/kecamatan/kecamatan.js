import React, {Component} from 'react'
import {deleteKecamatan, listKecamatan} from './api-kecamatan'
import { TableKecamatan } from './kecamatan-component';
import AddEditForm from './addEditForm'

import { listCity } from '../city/api-city'



export default class Kecamatan extends Component {

    // 1. declarasikan Kecamatan[] state
    state = {
        kecamatan : [],
        city : [],
        dataEditRow : null,
        isModalShow : false
    }


    refresh = () => {
        // re-renders the component
        this.setState({});
      };


    // 3. call showListKecamatan to fill Kecamatan[] on first time render
    componentDidMount() {
        this.showListKecamatan();
        this.showListCity();

    }

    onRefreshTable =()=>{
        this.refresh()
        this.showListKecamatan();
        this.showListCity();
        console.log('table kecamatan-city direfresh')
        
    }

    // 2.panggil listKecamatan dari api-Kecamatan, kemudian isi Kecamatan[] state dengan data dari listKecamatan
    showListKecamatan = async () => {
        await listKecamatan().then(data => {
            this.setState({
                kecamatan: data
            })
        })
    }

    showListCity = async () => {
        await listCity().then(data => {
            this.setState({
                city: data
            })
        })
    }




    onShowModal = (value) => {
        this.setState({
            isModalShow: value
        })
        this.refresh()

        
    }

    onEditRow = (value)=>{

        this.setState({
            dataEditRow : value
        })
        this.onShowModal(true);
        this.onRefreshTable();
    }

    onDeleteRow = (value)=>{
        deleteKecamatan(value).then(response => {
            console.log(response);

            this.onRefreshTable();
        }).catch(function (error) {
            console.log(error);
        });;

    }

 





    render() {
  
            const { kecamatan , isModalShow, dataEditRow, city } = this.state;
            return (
                <div>
                    <TableKecamatan kecamatan = {kecamatan.sort((a, b) => a.kec_id - b.kec_id)}
                        city = {city}

                        setShowModal = {this.onShowModal}
                        setDelete = {this.onDeleteRow}
                        setEdit = {this.onEditRow}
                        setRefreshTable = {this.onRefreshTable}
                            
                    ></TableKecamatan>
                    {
                        (isModalShow ? (
                            <AddEditForm
                            setShowModal = {this.onShowModal}
                            setRefreshTable = {this.onRefreshTable}
                            Kecamatan = {dataEditRow}
                            city = {city}

                            />) : null)
                    }
                </div>
            )
    }
}
