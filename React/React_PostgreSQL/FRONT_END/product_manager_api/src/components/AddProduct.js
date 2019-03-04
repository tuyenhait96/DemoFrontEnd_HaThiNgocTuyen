import React, { Component } from 'react';
import axios from 'axios'
const addProductAction = (product_name, product_price, image) => 
    // lay cac gia tri truoc
    (axios.post('/add', {product_name, product_price, image})
    .then(resp => resp.data))

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_price: '',
            image: '',
        }
    }

    isChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(value, name)
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        // console.log(JSON.stringify(this.state))
        // addProductAction(this.state.product_name, this.state.product_price, this.state.image)
        var {product_name, product_price, image } = this.state
        addProductAction(product_name, product_price, image).then(resp => {
            console.log(resp)
        })
    }
    
    render() {
        return (
            <div className="container">
                
            </div>

        );
    }
}

export default AddProduct;