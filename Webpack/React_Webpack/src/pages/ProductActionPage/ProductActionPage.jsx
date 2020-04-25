import React, { Component } from "react";
import callApi from "../../utils/callApi";
import { Link } from "react-router-dom";
import {
  apiAddProduct,
  apiGetEditProduct,
  apiGetUpdateProduct,
} from "../../action";
import { connect } from "react-redux";

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPrice: "",
      txtStatus: "",
      id: "",
    };
  }

  onChange = (e) => {
    let { name, type } = e.target;
    let value = type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { txtName, txtPrice, txtStatus, id } = this.state;
    let { history, match } = this.props;
    let product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: txtStatus,
    };
    if (id) {
      //update
      // callApi(`products/${id}`, "PUT", {
      //   name: txtName,
      //   price: txtPrice,
      //   status: txtStatus,
      // }).then((res) => {
      //   history.goBack();
      // });
      this.props.apiGetUpdateProduct(product);
      history.goBack();
    } else {
      // callApi("products", "POST", {
      //   name: txtName,
      //   price: txtPrice,
      //   status: txtStatus,
      // }).then((res) => {
      //   console.log(res);
      //   history.goBack();
      //   // history.push("/");
      // });
      this.props.apiAddProduct(product);
      history.goBack();
    }
  };

  componentDidMount() {
    console.log("componentDidMount");

    const { match } = this.props;
    if (match) {
      const { id } = match.params;
      // console.log(id, match);
      // callApi(`products/${id}`, "GET", null).then((res) => {
      //   console.log(res);
      //   let { data } = res;
      //   this.setState({
      //     id: data.id,
      //     txtName: data.name,
      //     txtPrice: data.price,
      //     txtStatus: data.status,
      //   });
      // });
      this.props.apiGetEditProduct(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    //mapstatse trên store tuyền cho props lúc này prop thay đổi nên có
    if (nextProps && nextProps.itemEdittingReducer) {
      let { itemEdittingReducer } = nextProps;
      this.setState({
        id: itemEdittingReducer.id,
        txtName: itemEdittingReducer.name,
        txtPrice: itemEdittingReducer.price,
        txtStatus: itemEdittingReducer.status,
      });
    }
  }
  render() {
    let { txtName, txtPrice, txtStatus } = this.state;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <form onSubmit={this.onSubmit}>
          <legend>Form title</legend>
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="txtStatus"
                value={txtStatus}
                checked={txtStatus}
                onChange={this.onChange}
              />
              Còn hàng
            </label>
          </div>
          <Link className="btn btn-danger mr-5" to="/products-list">
            Trở lại
          </Link>
          <button type="submit" className="btn btn-primary">
            Lưu lại
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    itemEdittingReducer: state.itemEdittingReducer,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    apiAddProduct: (products) => {
      dispatch(apiAddProduct(products));
    },
    apiGetEditProduct: (id) => {
      dispatch(apiGetEditProduct(id));
    },
    apiGetUpdateProduct: (products) => {
      dispatch(apiGetUpdateProduct(products));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
