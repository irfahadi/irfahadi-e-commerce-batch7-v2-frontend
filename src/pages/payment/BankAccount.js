import { GetBankAccount, CreateBankAccount, UpdateBankAccount, DeleteBankAccount } from './api/index'
import { useState, useEffect } from 'react'
import AddBankAccountModal from './BankAccountModal'
import { useBanks } from './api/index'

const BankAccount = () => {
  let banks = useBanks({})
  let [editForm, setEditForm] = useState(false)
  let [bankAccount, setBankAccount] = useState([])
  let [dataFormBankAccount, setDataFormBankAccount] = useState({})
  let [refresh, setRefresh] = useState(false)
  let acco_id = localStorage.getItem("dataAccountId")
  let [errorApi, setErrorApi] = useState("")
  let [modal, setModal] = useState(false)

  useEffect(() => {
    fetchData()
  }, [refresh])

  let fetchData = async () => {
    try {
      let getBankAccount = await GetBankAccount(acco_id)
      setBankAccount(getBankAccount)
    } catch (err) {
      if (err === -4073) {
        setBankAccount([])
        setErrorApi("Server in trouble")
      } else {
        setBankAccount([])
        setErrorApi("Belum ada akun bank")
      }
    }
  };

  const onDelete = async (x) => {
    console.log(x.target.value)
    try {
      await DeleteBankAccount(x.target.value)
      setRefresh(!refresh)      
    } catch (error) {
      console.log(error)
    }

  }

  const onCreateBankAccount = async () => {
    if (editForm) {
      await UpdateBankAccount(dataFormBankAccount)
      setRefresh(!refresh)
    } else {
      await CreateBankAccount(dataFormBankAccount)
      setRefresh(!refresh)
    }
  }

  const onEdit = (x) => {
    try {
      bankAccount.map((data) => {
        if (Number(x.target.value) === data.bacc_id) {
          setDataFormBankAccount(data)
        }
      })
      setEditForm(true)
      setModal(true)      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="grid max-w-full mx-auto text-center border border-primary rounded-md overflow-hidden text-white">
        <table>
          <thead>
            <tr className="bg-primary ">
              <th className="w-1/4 font-extralight">Bank</th>
              <th className="w-1/4 font-extralight" >Pemilik</th>
              <th className="w-1/4 font-extralight">No Rek</th>
              <th className="w-1/4"></th>
            </tr>
          </thead>
          <tbody>
            {
              bankAccount == undefined ?
                <tr key="error" className="text-gray-700"><td>{errorApi}</td></tr>
                :
                bankAccount.map((x) => {
                  return (
                    <tr className="text-black" key={x.bacc_id}>
                      <td>{x.bank.bank_name}</td>
                      <td>{x.bacc_owner}</td>
                      <td>{x.bacc_acc_number}</td>
                      <td>
                        <button value={x.bacc_id} className="mx-2 outline-none w-3/12 h-2/6 bg-primary text-white rounded-md" onClick={onDelete}>
                          Delete
                        </button>
                        <button value={x.bacc_id} onClick={onEdit} className="outline-none w-3/12 h-2/6 bg-primary rounded-md text-white">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>

      <button onClick={() => { setModal(true) }} className=" focus:border-primary focus:outline-white font-medium max-w-lg px-3 p-1 bg-primary rounded-lg mt-2 text-white">Add Bank Account</button>
      {
        modal ?
          <AddBankAccountModal
            onCreateBankAccount={onCreateBankAccount}
            acco_id={acco_id}
            modal={modal}
            banks={banks.data}
            setModal={setModal}
            setDataFormBankAccount={setDataFormBankAccount}
            dataFormBankAccount={dataFormBankAccount}
            editForm={editForm}
            setEditForm={setEditForm}
          />
          : null
      }
    </>
  )
}

export default BankAccount;
