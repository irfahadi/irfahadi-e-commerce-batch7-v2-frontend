import React, {Component} from 'react'
import {deleteCity, listCity} from './api-city'
import { TableCity } from './city-component';
import AddEditForm from './addEditForm'
import { listProvince } from '../province/api-province'


export default class City extends Component {

    // 1. declarasikan city[] state
    state = {
        city : [],
        province : [],
        dataEditRow : null,
        isModalShow : false,
        flag        : false
    }


    refresh = () => {
        // re-renders the component
        this.setState({});
      };


    // 3. call showListcity to fill city[] on first time render
    componentDidMount() {
        this.showListCity();
        this.showListProvince();


    }

    onRefreshTable =()=>{
        this.refresh()
        this.showListCity();
        this.showListProvince();
        console.log('table city-province direfresh')
    }

    

    // 2.panggil listcity dari api-city, kemudian isi city[] state dengan data dari listcity
    showListCity = () => {
        listCity().then(data => {
            this.setState({
                city: data
            })
        })
    }

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
        deleteCity(value).then(response => {
            console.log(response);
            this.onRefreshTable();
        }).catch(function (error) {
            console.log(error);
        });;
    }

   





    render() {
  
            const { city , isModalShow, dataEditRow, province } = this.state;
            return (
                <div>
                    <TableCity city = {city.sort((a, b) => a.city_id - b.city_id)}
                        province = {province}
                        setShowModal = {this.onShowModal}
                        setDelete = {this.onDeleteRow}
                        setEdit = {this.onEditRow}
                        setRefreshTable = {this.onRefreshTable}
                    ></TableCity>
                    {
                        (isModalShow ? (
                            <AddEditForm
                            setShowModal = {this.onShowModal}
                            setRefreshTable = {this.onRefreshTable}
                            city = {dataEditRow}
                            province = {province}
                            />) : null)
                    }
                </div>
            )
    }
}
