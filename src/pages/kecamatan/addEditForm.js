import React, { Component } from 'react';
import { create, updateKecamatan } from './api-kecamatan';
import swal from 'sweetalert';

export default class AddEditForm extends Component {

    state = {
        kecamatanId: null,
        kecamatanName: '',
        kecamatanCityId: null,
        isEdit: false
    }

    refresh = () => {
        // re-renders the component
        this.setState({});
    };


    componentDidMount() {

        console.log(this.props)
        if (this.props.Kecamatan !== null) {
            this.setState({
                kecamatanId: this.props.Kecamatan.kec_id,
                kecamatanName: this.props.Kecamatan.kec_name,
                kecamatanCityId: this.props.Kecamatan.kec_city_id,

                isEdit: true
            })

        }

    }




    handleOnChange = e => {
        const { target: { value, name } } = e;
        this.setState({
            [name]: value
        })
    }


    handleOnSubmit = async e => {
        e.preventDefault();
        const kecamatan = {
            kec_id: this.state.kecamatanId,
            kec_name: this.state.kecamatanName,
            kec_city_id: this.state.kecamatanCityId

        };

        if (!this.state.isEdit) {
            await create(kecamatan).then(response => {
                console.log(response);
                swal(`${kecamatan.kec_name}`, "berhasil ditambahkan!", "success");

            }).catch(function (error) {
                console.log(error);
                swal(`error`, "gagal tambah data!", "error");

            });;
        } else {
            await updateKecamatan(kecamatan).then(response => {
                console.log(response);
                swal(`${kecamatan.kec_name}`, "berhasil diubah!", "success");

            }).catch(function (error) {
                console.log(error);
                swal(`error`, "gagal ubah data!", "error");

            });;
        }



        // jika ada udah sukses or error then, close modal
        // lalu refresh table 
        this.props.setRefreshTable();
        this.props.setShowModal(false);
        

    }

    render() {
        const { kecamatanId, kecamatanName, kecamatanCityId, updateKecamatan } = this.state;

        return (

            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                                    Add Edit kecamatan
                                </h6>
                                <button onClick={() => this.props.setRefreshTable()}
                                className="p-1 mt-10 -ml-20 bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <img className=" w-6 h-6" src="refresh.svg"></img>
                                </button>
                                <button onClick={() => this.props.setShowModal(false)}
                                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                                >
                                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={this.handleOnSubmit}>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-full px-4">
                                            <div className="relative w-full mb-3">
                                                {/* <label
                                                    className="text-center block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    kecamatan Id
                                             </label> */}
                                                <input disabled
                                                    type="text"
                                                    type="hidden"
                                                    name="kecamatanId"
                                                    value={kecamatanId}
                                                    onChange={this.handleOnChange}
                                                    className="px-3 py-3 text-center placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"

                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    kecamatan Name
                                            </label>
                                                <input required
                                                    type="text"
                                                    name="kecamatanName"
                                                    value={kecamatanName}
                                                    onChange={this.handleOnChange}
                                                    className="px-3 py-3 placeholder-gray-400   focus:ring-2 focus:ring-blue-600 bg-white rounded  shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"

                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    city name
                                            </label>
                                                <select className="w-full border border-gray-300 py-2 px-2 bg-white  focus:ring-2 focus:ring-blue-600 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2" name="kecamatanCityId" value={kecamatanCityId} onChange={this.handleOnChange}>
                                                    <option>silakan pilih city</option>
                                                    {
                                                        this.props.city.map((e) => {

                                                            return (<option value={e.city_id}>{e.city_id} - {e.city_name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                        <button onClick={() => this.props.setShowModal(false)
                                        }


                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >




                                            Close
                                </button>
                                        <button onClick={() => this.props.setRefreshTable()}
                                            className="bg-pink-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-pink-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Save Changes
                                </button>
                                    </div>
                                </form>


                            </div>

                        </div>

                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>

        )
    }
}