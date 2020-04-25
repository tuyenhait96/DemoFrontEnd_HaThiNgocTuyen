import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  onDelete = (id) => {
    if (window.confirm("Do you want to delete ?")) {
      console.log("id", id);
      //eslint-disable-line
      this.props.onDelete(id);
    }
  };

  render() {
    const { products, index } = this.props;
    let statusName = products.status ? "Còn hàng" : "Hết hàng";
    let statusClass = products.status ? "warning" : "default";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{products.id}</td>
        <td>{products.name}</td>
        <td>{products.price}</td>
        <td>
          <span className={`label label-${statusClass}`}>{statusName}</span>
        </td>
        <td>
          <Link
            to={`/products/${products.id}/edit`}
            className="btn btn-success mr-2"
          >
            Sửa
          </Link>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.onDelete(products.id)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
