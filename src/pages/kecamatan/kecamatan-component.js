// import { useState } from 'react';
import swal from 'sweetalert';


export const TableKecamatan = props => {
    return (
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="uppercase font-semibold text-base text-gray-800">List kecamatan</h3>
                            <button onClick={() => props.setRefreshTable()}>refresh</button>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button onClick= {() => props.setShowModal(true) }
                                className="px-6 bg-pink-600 hover:bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                                type="button">Add kecamatan</button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">kecamatan Id</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">kecamatan Name</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">city id</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">city name</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                 props.city.length > 0 ?
                                 props.city.map(city => {
                                     return city.kecamatans.map((kecamatan, index) => {
                                         // return console.log(city)
                                         return (<tr key={index} >
                                            
                                            <td className="uppercase text-center" key="{kec_id}">{kecamatan.kec_id}</td>
                                            <td className="uppercase text-center" key="{kec_name}">{kecamatan.kec_name}</td>
                                            <td className="uppercase text-center" key="{kec_city_id}">{kecamatan.kec_city_id}</td>
                                            <td className="uppercase text-center" key="{city_name}">{city.city_name}</td>

                                            <td className="text-center">
                                                <button onClick= {() => {
                                                    props.setEdit(kecamatan)
                                                }}
                                                    className="text-white bg-green-500 border border-solid border-gray-300 mt-1 hover:bg-green-800 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Edit
                                    </button>
                                    
                                        
                                     
                                    

                                                <button onClick = { () => {

                                                    swal({
                                                        title: `Are you sure want to DELETE ${kecamatan.kec_name}?`,
                                                        text: "Once deleted, you will not be able to recover this record!",
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                      })
                                                      .then((willDelete) => {
                                                        if (willDelete) {
                                                          swal(`Poof! ${kecamatan.kec_name} has been deleted!`, {
                                                            icon: "success",
                                                          });
                                                        props.setDelete(kecamatan.kec_id);

                                                        } else {
                                                          swal({
                                                            title: `${kecamatan.kec_name} is safe!`,
                                                          });
                                                        }
                                                      });

                                                
                                                }}
                                                    className="text-white bg-red-500 border border-solid border-gray-300 hover:bg-red-800 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Delete
                                    </button>


                                            </td>
                                        </tr>)
                                     })

                                    }) :
                                    <tr>
                                        <td colSpan={3}>No Records Found.</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}