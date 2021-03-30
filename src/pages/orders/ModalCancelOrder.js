const ModalCancelOrder = (props) => {
    return (
        <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75 " onClick={() => props.setModalCancel(false)}></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform trantition-all sm:my-8 sm:align-middle" role="dialog" aria-modal="true" aria-labelledby="modal-header">
                        <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                                <h1>Apakah Anda Yakin ?</h1>
                                <button onClick={()=>props.onCancel()} className="py-1 mx-1 px-4 bg-primary text-white rounded-lg w-100">Ya</button>
                                <button onClick={()=>props.setModalCancel(false)} className="py-1 mx-1 px-4 bg-primary text-white rounded-lg w-100">Tidak</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export { ModalCancelOrder }