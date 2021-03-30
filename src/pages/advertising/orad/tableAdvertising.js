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
                            <h3 className="font-semibold text-base text-gray-800">Order Advertising</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            {/* <button 
                            onClick= {() => props.setShowModal(true) }
                                className="px-6 bg-button text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left hover:bg-item hover:text-white hover:bg-green-300"
                                type="button">Add</button> */}
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                               <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Order Advertising ID</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold ttext-center">Created On</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Publish On</th>
                                {/* <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Finished On</th> */}
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Bill Amount</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Status</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Pack Name</th>
                            </tr>
                        </thead>
                        <br />
                        <tbody >
                            {
                                props.adv.length > 0 ?
                                    props.adv.map((adv, index) => {
                                        return (<tr key={index} >
                                            <td className="text-center">{adv.orad_id}</td>
                                            <td className="text-center">{adv.orad_created_on}</td>
                                            <td className="text-center">{adv.orad_publish_on}</td>
                                            {/* <td className="text-center">{adv.orad_finished_on}</td> */}
                                            <td className="text-center">{adv.orad_bill_amount}</td>
                                            <td className="text-center">{adv.orad_stat_name}</td>
                                            <td className="text-center">{adv.orad_pack_name}</td>
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