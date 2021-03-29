import React, {Component} from 'react'
import {deleteProvince, listProvince} from './api-province'
import { TableProvince } from './province-component';
import AddEditForm from './addEditForm'



export default class Province extends Component {

    // 1. declarasikan province[] state
    state = {
        province : [],
        dataEditRow : null,
        isModalShow : false
    }


    refresh = () => {
        // re-renders the component
        this.setState({});
      };


    // 3. call showListprovince to fill province[] on first time render
    componentDidMount() {
        this.showListProvince();
    }



    // 2.panggil listprovince dari api-province, kemudian isi province[] state dengan data dari listprovince
    showListProvince = () => {
        listProvince().then(data => {
            this.setState({
                province: data
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
        deleteProvince(value).then(response => {
            console.log(response);

        }).catch(function (error) {
            console.log(error);
        });;

        this.onRefreshTable();
    }

    onRefreshTable =()=>{
        this.refresh()
        this.showListProvince();
        console.log('table province direfresh')
        
    }





    render() {
  
            const { province , isModalShow, dataEditRow } = this.state;
            return (
                <div>
                    <TableProvince province = {province.sort((a, b) => a.prov_id - b.prov_id)}
                        setShowModal = {this.onShowModal}
                        setDelete = {this.onDeleteRow}
                        setEdit = {this.onEditRow}
                        setRefreshTable = {this.onRefreshTable}
                    ></TableProvince>
                    {
                        (isModalShow ? (
                            <AddEditForm
                            setShowModal = {this.onShowModal}
                            setRefreshTable = {this.onRefreshTable}
                            province = {dataEditRow}
                            />) : null)
                    }
                </div>
            )
    }
}
