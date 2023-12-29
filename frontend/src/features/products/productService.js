import axios from 'axios'

const API_URL = 'http://localhost:3000/api/product/'

const getProducts = async () => {

    const response = await axios.get (API_URL)

    return response.data
}


const getProduct = async (id) => {
    const response = await axios.get (API_URL + id)

    return response.data

}

const createProduct = async (product) => {
    const response = await axios.post (API_URL, product)

    return response.data
}

const updateProduct = async (id, product) => {
    const response = await axios.put (API_URL + id, product)

    return response.data
}

const deleteProduct = async (id) => {
    const response = await axios.delete (API_URL + id)

    return response.data
}


const productService = {
    getProducts
    , getProduct
    , createProduct
    , updateProduct
    , deleteProduct
}

export default productService