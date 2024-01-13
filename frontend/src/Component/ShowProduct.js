import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addProduct, getProduct, putProduct, removeProduct } from '../Slice/ProductSlice';

function ShowProduct() {
    const url = "http://localhost:5000/api/product"

    const [product, setProduct] = useState({ _id: '', name: '', price: '', img: '', rating: '' })
    const [btn, setBtn] = useState('save')
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    function editProduct(el) {
        setProduct({
            _id: el._id,
            name: el.name,
            price: el.price,
            img: el.img,
            rating: el.rating
        });
        // navigate('/updateproduct', {state:el})
        setBtn('Update')
    }

    function deleteProduct(_id) {
        dispatch(removeProduct(_id))
    }
    
    // handle Change
    function handleChange(e) {
        setProduct({...product,[e.target.name]: e.target.value})
    }

    // hande Submit
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(product, "Product Data");
        if (product._id) {
            dispatch(putProduct(product))
        } else {
        dispatch(addProduct({name: product.name, price: product.price, img: product.img, rating: product.rating}))
        }
        cls()
    }

    function cls() {
        setProduct({_id: '',name: '', price: '', img: '', rating: ''})
    }

    return (
        <div className="container">
        <div className="row">
        <div className="col-md-12  d-flex justify-content-end align-itmes-center my-3">
        <button onClick={()=>{
            localStorage.clear()
            navigate('/login')
        }} className="btn btn-danger">
        logout
        </button>
        </div>
        </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <h1 className='text-center'>Add Product</h1>
                    </div>
                    <div className="row">

                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <input onChange={handleChange} type="text" name='name' placeholder='Enter product name' value={product.name} className='form-control my-2' />

                                <input onChange={handleChange} type="text" name='price' placeholder='Enter product price' value={product.price} className='form-control my-2' />

                                <input onChange={handleChange} type="text" name='img' placeholder='Enter product image url' value={product.img}  className='form-control my-2' />

                                <input onChange={handleChange} type="text" name='rating' placeholder='Enter product rating' value={product.rating} className='form-control my-2' />

                                <input type="submit" value={btn} className='btn btn-dark' />
                            </form>
                        </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Image</th>
                                <th>Product Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((el) => (
                                <tr key={el._id}>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td><img src={el.img} alt='' style={{ width: 7 + 'rem', height: 7 + 'rem' }} /></td>
                                    <td>{el.rating}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => {
                                            editProduct(el)
                                        }}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => {
                                            deleteProduct(el._id)
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table></div>
            </div>

        </div>
    )
}

export default ShowProduct