import React, { Component } from 'react';

class AddUser extends Component {
    // day data ra state
    constructor(props) {
        super(props)
        this.state = {
            id: '', 
            name: '',
            tel: '',
            permission: ''
        }
        
    }
    
    // constructor(props, context) {
    //     super(props, context);
    //     this.state = {
    //         trangThaiEdit: true
    //     }
    // }

    // showButton = () => {
    //     if (this.state.trangThaiEdit === true) {
    //         return <div className="btn btn-block btn-outline-secondary">Close</div>
    //     } else {
    //         return <div className="btn btn-block btn-outline-danger">Add new</div>
    //     }
    // }

    // changeStatus = () => {
    //     this.setState({
    //         trangThaiEdit: !this.state.trangThaiEdit
    //     });
    // }
    isChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value
        });

        // package to item
        // let item = {}
        // test thoi
        // item.id = this.state.id
        // item.name = this.state.name
        // item.tel = this.state.tel
        // item.permission = this.state.permission
        // console.log(item)
    }
    kiemtraForm = () => {
        if (this.props.showFormData === true) {
            return (
                <div className="col">
                    <form>
                        <div className="card border-info mb-3 mt-2">
                            <div className="card-header">Add User</div>
                            <div className="card-body text-dark">
                                <div className="form-group">
                                    <input type="text" name='name' className="form-control" placeholder="Username" onChange={(event) => this.isChange(event)} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Phone" name='tel' onChange={(event) => this.isChange(event)} />
                                </div>
                                <div className="form-group">
                                    <select className="custom-select" required name='permission' onChange={(event) => this.isChange(event)} >
                                        <option value={1}>Admin</option>
                                        <option value={2}>Moderator</option>
                                        <option value={3}>Normal</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type='reset' className="btn btn-block btn-primary" onClick={() => this.props.add(this.state.name, this.state.tel, this.state.permission)} placeholder='Add User'/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
    render() {
        // console.log(this.props.showFormData);
        // console.log(this.state);
        
        return (
            <div>
                {/* {this.showButton()} */}
                {this.kiemtraForm()}
            </div>
        );
    }
}

export default AddUser;