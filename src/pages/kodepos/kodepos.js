import React, {Component} from 'react'
import {deleteKodepos, listKodepos} from './api-kodepos'
import { TableKodepos } from './kodepos-component';
import AddEditForm from './addEditForm'
import { listKecamatan } from '../kecamatan/api-kecamatan'



export default class Kodepos extends Component {

    // 1. declarasikan Kodepos[] state
    state = {
        kodepos : [],
        kecamatan : [],
        dataEditRow : null,
        isModalShow : false,
        kodepos_id: null
    }


    refresh = () => {
        // re-renders the component
        this.setState({});
      };


    // 3. call showListKodepos to fill Kodepos[] on first time render
    componentDidMount() {
        this.showListKodepos();
        this.showListKecamatan();

    }

    onRefreshTable =()=>{
        this.refresh()
        this.showListKodepos();
        this.showListKecamatan();
        console.log('table kodepos-kecamatan direfresh')

    }




    // 2.panggil listKodepos dari api-Kodepos, kemudian isi Kodepos[] state dengan data dari listKodepos
    showListKodepos = () => {
        listKodepos().then(data => {
            this.setState({
                kodepos: data
            })
        })
    }

    showListKecamatan = () => {
        listKecamatan().then(data => {
            this.setState({
                kecamatan: data
            })
        })
    }



    onShowModal = (value) => {
        this.setState({
            isModalShow: value
        })
        if(value==false){
            this.setState({
                dataEditRow : null
            })
        }
        this.refresh()

        
    }

    onEditRow = (value)=>{

        this.setState({
            dataEditRow : value,
            kodepos_id: value.kodepos
        })
        this.onShowModal(true);
        this.onRefreshTable();
    }

    onDeleteRow = (value)=>{
        deleteKodepos(value).then(response => {
            console.log(response);
            this.onRefreshTable();
        }).catch(function (error) {
            console.log(error);
        });;

    }

    




    render() {
  
            const { kodepos , isModalShow, dataEditRow, kecamatan, kodepos_id} = this.state;
            return (
                <div>
                    <TableKodepos kodepos = {kodepos.sort((a, b) => a.kodepos - b.kodepos)}
                        kecamatan = {kecamatan}
                        setShowModal = {this.onShowModal}
                        setDelete = {this.onDeleteRow}
                        setEdit = {this.onEditRow}
                        setRefreshTable = {this.onRefreshTable}
                    ></TableKodepos>
                    {
                        (isModalShow ? (
                            <AddEditForm
                            setShowModal = {this.onShowModal}
                            setRefreshTable = {this.onRefreshTable}
                            Kodepos = {dataEditRow}
                            kecamatan = {kecamatan}
                            kodepos_id = {kodepos_id}
                            />) : null)
                    }
                </div>
            )
    }
}
