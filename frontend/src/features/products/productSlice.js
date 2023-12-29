import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'


const initialState = {
    products: [],
     isError : false ,
    isSuccess : false ,
    isLoading : false ,
    message : ''
}


export const getProducts = createAsyncThunk( 'products/getProducts' , async ( _,thunkAPI) => {
    try {
        return await productService.getProducts()
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const getProduct = createAsyncThunk( 'products/getProduct' , async (id,thunkAPI) => {
    try {
        return await productService.getProduct(id)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const createProduct = createAsyncThunk( 'products/createProduct' , async (product,thunkAPI) => {
    try {
        return await productService.createProduct(product)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const updateProduct = createAsyncThunk( 'products/updateProduct' , async (product,thunkAPI) => {
    try {
        return await productService.updateProduct(product.id,product)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const deleteProduct = createAsyncThunk( 'products/deleteProduct' , async (id,thunkAPI) => {
    try {
        return await productService.deleteProduct(id)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset : (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })

        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(getProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })  
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(createProduct.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products.push(action.payload)
        })

        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(updateProduct.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product)
        })

        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(deleteProduct.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = state.products.filter(product => product.id !== action.payload.id)
        })

        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    }
})

export const {reset} = productSlice.actions

export default productSlice.reducer