import CryptoJS from 'crypto-js'

const ImageLoader = (path) =>{
    return process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_BASE_PATH}${path}` : path
}

const Encrypt = (code) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_CODE
    const encJson = CryptoJS.AES.encrypt(JSON.stringify(code), secretKey).toString()
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
}

const Decrypt = (code) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_CODE
    const decData = CryptoJS.enc.Base64.parse(code).toString(CryptoJS.enc.Utf8)
    const bytes = CryptoJS.AES.decrypt(decData, secretKey).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
}

export { ImageLoader , Encrypt , Decrypt }