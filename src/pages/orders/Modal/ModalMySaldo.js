import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiOrder } from "../../../config/apiUrl";
import { GetWallet } from "../../payment/api/GetWallet";
// import { numberWithCommas } from "../../../utils/utils";

function ModalMySaldo({ setModal, dataFormOrderArrival }) {
  const userId = localStorage.getItem("dataAccountId");
  const [wallet, setWallet] = useState([]);

  const onCancelEdit = () => {
    setModal(false);
  };

  useEffect(() => {
    fetchWallet();
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .then((result) => {
        if (result) {
          console.log(result.data);
          setModal(false);
        }
        console.log(result.data);
        return 0;
      })
      .catch((err) => err.message);
  };

  const fetchWallet = async () => {
    try {
      let walletData = await GetWallet(userId);
      setWallet(walletData);
    } catch (error) {}
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <div className="flex items-center justify-end p-6  rounded-b">
                {/* <span class="fas fa-wallet text-pink-500 text-xl" />
                <span class="ml-2 font-semibold text-xl text-pink-500">
                  My Wallet
                </span>
                <span class="float-left text-base font-semibold text-pink-400">
                  ID Account
                </span>

                <div class="float-right text-base font-semibold text-pink-700">
                  {wallet[0]?.wale_acco_id}
                </div> */}

                <div class="float-left text-base font-semibold text-pink-400">
                  ID Wallet
                </div> 
                <div class="float-right text-base font-semibold text-pink-700">
                  {wallet[0]?.wale_id}
                </div>

                <div class="float-left text-base font-semibold text-pink-400">
                  Balance
                </div>
                <div class="float-right text-base font-semibold text-pink-700">
                  {wallet[0]?.wale_saldo}
                </div>
              </div>
              <button
                onClick={() => this.props.setShowModal(false)}
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-gray-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="flex-auto px-4 lg:px-10 py-6 pt-0">
              <form>
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    onClick={onCancelEdit}
                    type="button"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    TopUp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default ModalMySaldo;
