// import { useState } from 'react';
import swal from 'sweetalert';


export const TableKodepos = props => {
    return (
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-gray-800">List kodepos</h3>
                            <button onClick={() => props.setRefreshTable()}>refresh</button>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button onClick= {() => props.setShowModal(true) }
                                className="px-6 bg-pink-600 hover:bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                                type="button">Add kodepos</button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">kodepos Id</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">kodepos Kecamatan Id</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Kecamatan Name</th>
                                <th className="text-center px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                // props.kodepos.length > 0 ?
                                //     props.kodepos.map((kodepos, index) => {
                                //         return (<tr key={kodepos.id} >
                                            
                                            
                                //             <td className="text-center" key="{kodepos}">{kodepos.kodepos}</td>
                                //             <td className="text-center" key="{kodepos_kec_id}">{kodepos.kodepos_kec_id}</td>

                                //             <td className="text-center">
                                //                 <button onClick= {() => {
                                //                     props.setEdit(kodepos)
                                //                 }}
                                //                     className="text-white bg-green-500 border border-solid border-gray-300 mt-1 hover:bg-green-800 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                //                     Edit
                                //     </button>

                                props.kecamatan.length > 0 ?
                                props.kecamatan.map(kecamatan => {
                                    return kecamatan.kodepos.map((kodepos, index) => {
                                        // return console.log(city)
                                        return (<tr key={index} >
                                           
                                           <td className="text-center" key="{kodepos}">{kodepos.kodepos}</td>
                                           <td className="text-center" key="{kodepos_kec_id}">{kodepos.kodepos_kec_id}</td>
                                           <td className="text-center uppercase" key="{kodepos_kec_id}">{kecamatan.kec_name}</td>


                                           <td className="text-center">
                                               <button onClick= {() => {
                                                   props.setEdit(kodepos)
                                               }}
                                                   className="text-white bg-green-500 border border-solid border-gray-300 mt-1 hover:bg-green-800 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                   Edit
                                   </button>
                                    
                                        
                                     
                                    

                                                <button onClick = { () => {

                                                    swal({
                                                        title: `Are you sure want to DELETE ${kodepos.kodepos}?`,
                                                        text: "Once deleted, you will not be able to recover this record!",
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                      })
                                                      .then((willDelete) => {
                                                        if (willDelete) {
                                                          swal(`Poof! ${kodepos.kodepos} has been deleted!`, {
                                                            icon: "success",
                                                          });
                                                          props.setDelete(kodepos.kodepos);
                                                        } else {
                                                          swal({
                                                            title: `${kodepos.kodepos} is safe!`,
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