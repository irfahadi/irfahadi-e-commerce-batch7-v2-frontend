// import { useState } from 'react';
import swal from 'sweetalert';



export const TableCity = props => {
    
    return (
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="uppercase font-semibold text-base text-gray-800">List city</h3>
                            <button onClick={() => props.setRefreshTable()}>refresh</button>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button onClick={() => props.setShowModal(true)}
                                className="px-6 bg-pink-600 hover:bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                                type="button">Add city</button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">city Id</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">city Name</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Province Id</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">province Name</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {


                                props.province.length > 0 ?
                                    props.province.map(province => {
                                        return province.cities.map((city, index) => {
                                            // return console.log(city)
                                            return (<tr key={index} >

                                                <td className="uppercase text-center">{city.city_id}</td>
                                                <td className="uppercase text-center">{city.city_name}</td>
                                                <td className="uppercase text-center">{city.city_prov_id}</td>
                                                <td className="uppercase text-center">{province.prov_name}</td>

                                                <td className="text-center">
                                                    <button onClick={() => {
                                                        props.setEdit(city)
                                                    }}
                                                        className="text-white bg-green-500 border border-solid border-gray-300 mt-1 hover:bg-green-800 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                        Edit
                                    </button>
                                                    <button onClick={() => {
                                                       swal({
                                                        title: `Are you sure want to DELETE ${city.city_name}?`,
                                                        text: "Once deleted, you will not be able to recover this record!",
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                      })
                                                      .then((willDelete) => {
                                                        if (willDelete) {
                                                          swal(`Poof! ${city.city_name} has been deleted!`, {
                                                            icon: "success",
                                                          });
                                                          props.setDelete(city.city_id);
                                                        } else {
                                                          swal({
                                                            title: `${city.city_name} is safe!`,
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