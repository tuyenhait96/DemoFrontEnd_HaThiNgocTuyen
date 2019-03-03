import React, { Component } from 'react';
import { isFunction } from 'util';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userEditObject.id,
            name: this.props.userEditObject.name,
            tel: this.props.userEditObject.tel,
            permission: this.props.userEditObject.permission
            // bien luu trung gian
            
        }
    }
    //getUserEditInfo
    isChange =(event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        });
    } 

    // lay thong tin cua user , lay thong tin info day vao search
    saveButton = () => {
        var info = {}
        info.id = this.state.id
        info.name = this.state.name
        info.tel = this.state.tel
        info.permission = this.state.permission
        console.log('info' + info)
        this.props.getUserEditInfo(info)
        this.props.changeEditUserStatus() //an form
    }
    render() {
        console.log(this.state)
        return (
            <div className="col-12">
                <form>
                    <div className="card text-white bg-warning mb-3 mt-2">
                        <div className="card-header text-center">Edit User</div>
                        <div className="card-body text-dark">
                            <div className="form-group">
                            {/* defaultValue: gia tri mac dinh */}
                                <input defaultValue={this.props.userEditObject.name} type="text" name='name' className="form-control" placeholder="Username" onChange={(event) => this.isChange(event)} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone" name='tel' 
                                onChange={(event) => this.isChange(event)} defaultValue={this.props.userEditObject.tel} />
                            </div>
                            <div className="form-group">
                            {/* thuong thi select se cho vong lap, n no giup minh luon,  */}
                                <select className="custom-select" required name='permission' onChange={(event) => this.isChange(event)} defaultValue={this.props.userEditObject.permission}>
                                    <option value>Chon quyen admin</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Moderator</option>
                                    <option value={3}>Normal</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type='button' className="btn btn-block btn-primary"
                                       placeholder='Add User'
                                       onClick={ ()=> this.saveButton() } />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditUser;