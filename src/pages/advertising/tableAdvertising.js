export const TableAdvertising = props => {
    const numberWithCommas = (n) => {
        let nString = ""
        let nStringCheck = n.toString()
        let nSLength = nStringCheck.length
        while(nSLength>3){
            nString = nStringCheck.slice(nSLength-3,nSLength) + "." + nString
            nSLength -= 3
        }
        nString = nStringCheck.slice(0,nSLength) + "." + nString
        nString = nString.slice(0,-1)
        return nString
    }

    return (
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-gray-800">Package Advertising</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button 
                            onClick= {() => props.setShowModal(true) }
                                className="px-6 bg-button text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left hover:bg-item hover:text-white hover:bg-green-300"
                                type="button">Add</button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Package Name</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Duration</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Description</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Action</th>
                            </tr>
                        </thead>
                        <br />
                        <tbody >
                            {
                                props.adv.length > 0 ?
                                    props.adv.map((adv, index) => {
                                        return (<tr key={index} >
                                            <td className="text-center">{adv.pack_name}</td>
                                            <td className="text-center">{adv.pack_duration}</td>
                                            <td className="text-center">Rp. {numberWithCommas(adv.pack_amount)}</td>
                                            <td className="text-center">
                                                <button onClick= {() => {
                                                    props.setEdit(adv)
                                                }}
                                                    className="text-gray-600 bg-button border border-solid border-gray-300 hover:bg-green-300 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Edit
                                                </button>
                                                <button onClick = { () => {
                                                    if (window.confirm("apakah anda yakin ingin menghapus data ini?")) {
                                                        props.setDelete(adv.pack_name);
                                                      }
                                                    
                                                }}
                                                    className="text-gray-600 bg-button border border-solid border-gray-300 hover:bg-pink-300 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Delete
                                            </button>
                                            </td>
                                        </tr>)
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