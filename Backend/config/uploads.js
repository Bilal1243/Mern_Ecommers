import pkg from 'cloudinary'
const { v2: cloudinary } = pkg


import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


cloudinary.config({
    cloud_name: 'du25wfdfx',
    api_key: '541732522315577',
    api_secret: 'bdc-nH49WmcM_qWVsClAN8-GyEM'
})


const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Ecommers_Products',
        format: () => 'png',
        public_id: Date.now,
    }
})

const productParser = multer({ storage: productStorage })


export { productParser }