// import { useState } from 'react';
import axios from 'axios'
export const TableUsers = props => {
    return (
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            {/* <center className="font-bold text-3xl capitalize">Selamat Datang {localStorage.getItem('dataUserName')}</center> */}
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="uppercase font-semibold text-base text-gray-800">List Users</h3>
                        </div>
                        
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="text-center px-6 px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Users Id</th>
                                <th className="text-center px-6 px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Users Name</th>
                                <th className="text-center px-6 px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Users Email</th>
                                <th className="text-center px-6 px-6 bg-pink-600 text-white font-bold align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                // props.users.data ?
                                //     props.users.map((users, index) => {
                                //          (<tr key={props.users.id} >
                                props.users.length > 0 ?
                                    props.users.map((users, index) => {
                                        return (<tr key={users.id} >
                                            <td className="text-center">{users.user_id}</td>
                                            <td className="text-center">{users.user_name}</td>
                                            <td className="text-center">{users.user_email}</td>
                                            {/* <td className="text-center">{props.users.user_id}</td>
                                            <td className="text-center">{props.users.user_email}</td> */}
                                            {/* <td className="text-center">{localStorage.getItem('dataUserId')}</td>
                                            <td className="text-center">{localStorage.getItem('dataUserEmail')}</td>
                                            <td className="text-center">{localStorage.getItem('dataUserPass')}</td> */}
                                            <td className="text-center">
                                                <button onClick= {() => {
props.setEdit(users)
                                                }}
                                                    className="text-gray-600 bg-transparent border border-solid border-gray-300 hover:bg-gray-600 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Edit
                                    </button>
                                                <button onClick = { () => {
                                                    if (window.confirm("apakah anda yakin ingin menghapus data ini?")) {
                                                        props.setDelete(users.user_id);
                                                      }
                                                }}
                                                    className="text-gray-600 bg-transparent border border-solid border-gray-300 hover:bg-gray-600 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Delete
                                    </button>
                                            </td>
                                        </tr>)
                                    }
                                    )
                                     :
                                    <tr>
                                        <td colSpan={3}>No Records Found.</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* ===============PAGINATION======================= */}
            <div className="py-2">
  <nav className="block">
    <ul className="flex pl-0 rounded list-none flex-wrap">
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          <i className="fas fa-chevron-left -ml-px"></i>
        </a>
      </li>
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 text-white bg-pink-500">
          1
        </a>
      </li>
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          2
        </a>
      </li>
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          3
        </a>
      </li>
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          4
        </a>
      </li>
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          5
        </a>
      </li>
      <li>
        <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
          <i className="fas fa-chevron-right -mr-px"></i>
        </a>
      </li>
    </ul>
  </nav>
</div>
                {/* =======================END PAGINATION=============
===== */}
        </div>
    )
}
