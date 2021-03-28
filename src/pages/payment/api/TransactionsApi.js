import axios from 'axios'
import { apiPayment } from '../../../config/apiUrl'

const GetTransactions = async (acco_id) => {
    let transactionsApi = apiPayment + "/walletTransaction/" + acco_id
    let result = await axios.get(transactionsApi)
    
    return result
}
export { GetTransactions }