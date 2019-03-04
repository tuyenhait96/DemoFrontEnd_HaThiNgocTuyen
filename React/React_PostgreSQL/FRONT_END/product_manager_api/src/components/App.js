import React, { Component } from 'react';
import HeadTitle from './HeadTitle';
import Products from './Products';
import axios from 'axios'

const addProductAction = (product_name, product_price, image) => 
    // lay cac gia tri truoc
    (axios.post('/add', {product_name, product_price, image}).then(resp => resp.data))

const getProductData = () =>
  axios.get('/getdata').then(res => res.data)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    if (this.state.data === null) {
      // pending: loi hua dang thuc hien
      //  console.log(getProductData())
      getProductData().then(res => {
        // sau khi co dlieu tra ve no se gan vao data cua posgreSQL
        this.setState({
          data: res,
          product_name: '',
          product_price: '',
          image: '',
        })
      })
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
    var { product_name, product_price, image } = this.state
    var dataTemp = {}
    var item = {}
    item.product_name = product_name
    item.product_price = product_price
    item.image = image
    dataTemp = this.state.data
    if(item.product_name !== ''){
      dataTemp.push(item)
      this.setState({
        data: dataTemp
      });
    }
    addProductAction(product_name, product_price, image).then(resp => {
      console.log(resp)
    })
  }
  printData = () => {
    if (this.state.data !== null) {
      return this.state.data.map((value, key) => (
        <Products
          key={key}
          product_name={value.product_name}
          product_price={value.product_price}
          image={value.image}
        />
      )
      )
    }
  }
  render() {
    console.log(this.state.data)
    // Make a request for a user with a given ID
    axios.get('/getdata')
      .then(function (response) {
        // handle success
        // console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    return (
      <div>
        <HeadTitle />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              <div className='row'>
                {this.printData()}
              </div>
            </div>
            <div className='col-2'>
              <div className="row">
                <div>
                  <form action="">
                    <div className="form-group">
                      <label htmlFor="product_name">Name</label>
                      <input onChange={(e) => this.isChange(e)} type="text" className="form-control" name="product_name" id="product_name" aria-describedby="name_text" placeholder="Input name: " />
                      <small id="name_text" className="form-text text-muted">Input text</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_price">Price</label>
                      <input onChange={(e) => this.isChange(e)} type="text" className="form-control" name="product_price" id="product_price" aria-describedby="name_text" placeholder="Price name: " />
                      <small id="name_text" className="form-text text-muted">Input text</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Link Image</label>
                      <input onChange={(e) => this.isChange(e)} type="text" className="form-control" name="image" id="image" aria-describedby="name_text" placeholder="Input name: " />
                      <small id="name_text" className="form-text text-muted">Input link image</small>
                    </div>
                    <button type="reset" onClick={() => this.handleClick()} className="btn btn-info">Add new</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
