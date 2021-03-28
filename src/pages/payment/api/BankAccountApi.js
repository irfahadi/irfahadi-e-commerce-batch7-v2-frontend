import axios from 'axios'
import {apiPayment} from '../../../config/apiUrl'

const bankAccountApi = apiPayment+"/bankAccount"

const GetBankAccount = async (acco_id) => {
  const getBankAccountApi = bankAccountApi+"/"+acco_id
  let getBankAccount = await axios.get(getBankAccountApi)
  console.log(getBankAccount)
  if(getBankAccount.data.length > 0){
    return getBankAccount.data //Ada data, return datanya
  }else if (getBankAccount.data.length < 1){
    throw "no data"
  }else if (getBankAccount.data.original.errno == -4073 ) { //Apabila data.original undefined, maka ini sama saja dengan throw error
    throw getBankAccount.data.original.errno //Apabila data.ogirinal ada, maka throw kode error-nya
      }
  }

const CreateBankAccount = (newBankAccount) => {
  console.log(newBankAccount)
  const data = {
    bacc_owner : newBankAccount.bacc_owner,
    bacc_acc_number: newBankAccount.bacc_acc_number,
    bacc_saldo: 0,
    bacc_acco_id: newBankAccount.bacc_acco_id,
    bacc_bank_id: newBankAccount.bacc_bank_id
  }
    let created = axios.post(bankAccountApi,data).then((result) => {
      console.log(result);
      return result
    }).catch((err) => {
      console.log(err);
      return err
    })
    return created
  }

const UpdateBankAccount = (bankAccount) => {
  let createNewBankAccountApi = bankAccountApi+"/"+bankAccount.bacc_id
  const data = {
    bacc_owner : bankAccount.bacc_owner,
    bacc_acc_number: bankAccount.bacc_acc_number,
    bacc_saldo: 0,
    bacc_acco_id: bankAccount.bacc_acco_id,
    bacc_bank_id: bankAccount.bacc_bank_id
  }
  
    axios.put(createNewBankAccountApi,data).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  }

const DeleteBankAccount = async (bacc_id) => {
  const deleteBankAccount = bankAccountApi+"/"+bacc_id
  let result = await axios.delete(deleteBankAccount)
  console.log(result.data.toString());
  return result.data.toString();
}

export {GetBankAccount,CreateBankAccount,DeleteBankAccount,UpdateBankAccount}