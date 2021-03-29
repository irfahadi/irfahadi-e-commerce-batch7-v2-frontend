export const numberWithCommas = (n) => {
    try {
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
    } catch (error) {
        console.log(error)
    }

}