import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h3 className="display-3">Project quan ly thanh vien bang React JS
          </h3>
                    <p className="lead">voi du lieu JSON</p>
                    <hr className="my-2" />
                </div>
            </div>
        );
    }
}

export default Header;