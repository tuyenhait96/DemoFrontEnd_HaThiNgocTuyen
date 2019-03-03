import React, { Component } from 'react';
import EditUser from './EditUser';

class Search extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tempValue: '',
            userObj: {}
        }
    }

    
    isChange = (event) => {
        console.log(event.target.value)
        this.setState({
            tempValue: event.target.value
        });
        // trong qua trinh minh go tim luon trong bo
        this.props.checkConnectProps(this.state.tempValue)
    }
    showButton = () => {
        if (this.props.showFormData === true) {
            return <div className="btn btn-block btn-outline-secondary" onClick={() => this.props.conNect()}>Close</div>
        } else {
            return <div className="btn btn-block btn-outline-danger" onClick={() => this.props.conNect()}>Add new</div>

        }
    }

    getUserEditInfo = (info) => {
        this.setState({
            userObj:info
        });
        // nhan info truyen luon cho thang app
        this.props.getUserEditInfoApp(info)

    }
    isShowEditForm = () => {
        if(this.props.editUserStatus === true){
            return <EditUser 
                getUserEditInfo = {(info)=>this.getUserEditInfo(info)}
                userEditObject ={this.props.userEditObject}
                changeEditUserStatus={() => this.props.changeEditUserStatus()}/>

        }
    }
    render() {
        return (
            <div className="col-12">
                {this.isShowEditForm()}
                <div className="form-group">
                    <div className="btn-group">
                        <input type="text" className="form-control" style={{ width: '500px' }} placeholder="Search Name"/>
                        {/* dl: this.state.tempValue('')
                         Khong truyen thang phai truyen qua bien trung gian la tempValue, lay gia tri va luu vao tempValue
                          */}
                        <div className="btn btn-info" onClick={(dl) => this.props.checkConnectProps(this.state.tempValue)}>Search</div>
                    </div>
                    <div className="btn-group1 mt-2">
                        {this.showButton()}
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default Search;