import React, { Component } from 'react'

export default class Profil extends Component {


    




    render() {
        return (
            <div>
                <center>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-6/12 sm:w-4/12 px-4">
                            
                            <img src="cewe.jpg" alt="..." className="shadow rounded-full max-w-full h-40 align-middle border-none" /> 

                            <div className=" grid grid-cols-1 gap-4 my-2 mt-12 content-center items-center justify-center place-content-center">
                                <p className="justify-center font-semibold">Username : {localStorage.getItem('dataUserName')} </p>
                            </div>
                            <div className=" grid grid-cols-1 gap-4 my-2 content-center items-center justify-center place-content-center">
                                <p className="justify-center font-semibold">Email : {localStorage.getItem('dataUserEmail')} </p>
                            </div>
                            <hr className="border-solid"></hr>
                            <hr className="border-solid"></hr>
                            <hr className="border-solid"></hr>
                            <hr className="border-solid"></hr>
                            <div className=" grid grid-cols-1 gap-4 my-2 content-center items-center justify-center place-content-center">
                                <p className="justify-center font-semibold">Account Id : {localStorage.getItem('dataAccountId')} </p>
                            </div>
                            <div className=" grid grid-cols-1 gap-4 my-2 content-center items-center justify-center place-content-center">
                                <p className="justify-center font-semibold">Shop Name : {localStorage.getItem('dataAccountShopName')} </p>
                            </div><div className=" grid grid-cols-1 gap-4 my-2 content-center items-center justify-center place-content-center">
                                <p className="justify-center font-semibold">Birthdate : {localStorage.getItem('dataAccountBirthdate')} </p>
                            </div><div className=" grid grid-cols-1 gap-4 my-2 content-center items-center justify-center place-content-center">
                                <p className="justify-center font-semibold">Phone Number : {localStorage.getItem('dataAccountPhone')} </p>
                            </div>

                        </div>
                    </div>
                </center>
            </div>

        )
    }
}