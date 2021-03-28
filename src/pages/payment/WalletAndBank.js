import { useEffect, useState } from "react"
import MyWallet from './MyWallet'
import BankAccount from './BankAccount'

const WalletAndBank = () => {
    const [selectedNav, setSelectedNav] = useState('MyWallet')
    const [showWallet, setShowWallet] = useState()
    const [showBankAccount, setShowBankAccount] = useState()

    useEffect(() => {
        switch (selectedNav) {
            case "MyWallet":
                setShowBankAccount(false)
                setShowWallet(true)
                break;
            case "BankAccounts":
                setShowWallet(false)
                setShowBankAccount(true)
                break;
            default:
                break;
        }
    }, [selectedNav])

    const onHandleClick = (e) => {
        setSelectedNav(e.target.value)
    }

    return (
        <>
            <div class="mt-10 mb-10 min-w-full h-full max-h-full max-w-screen flex bg-white">
                <aside
                    class="flex flex-col items-center bg-white border rounded-md border-primary text-text_primary shadow max-h-full">
                    <button
                        value="MyWallet"
                        defaultValue="MyWallet"
                        onClick={onHandleClick}
                        class="h-12 px-6 flex justify-items-start items-center w-full focus:outline-none focus:bg-gray-100 focus:bg-opacity-80 font-extralight">
                        <img className="w-8 h-8 mr-2" src="wallet-icon.png" />
                                My Wallet
                            </button>
                    <button
                        value="BankAccounts"
                        defaultValue="BankAccounts"
                        onClick={onHandleClick}
                        class="h-12 px-6 flex justify-items-start items-center w-full focus:outline-none focus:bg-gray-100 focus:bg-opacity-50 text-text_primary font-extralight">
                        <img className="w-8 h-8 mr-2" src="bank-icon.png" />
                                Bank Account
                            </button>
                </aside>
                {
                    showWallet ?
                        <div className="px-4 py-4 flex-grow">
                            <MyWallet />
                        </div>
                        :
                        showBankAccount ?
                            <div className="px-4 py-4 flex-grow">
                                <BankAccount />
                            </div>
                            : null
                }
            </div>
        </>
    )
}

export default WalletAndBank