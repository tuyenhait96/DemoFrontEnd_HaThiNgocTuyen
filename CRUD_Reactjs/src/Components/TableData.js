import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {

    deleteButtonClick = (idUser) => {
        // console.log(idUser)
        // deleteUser
        this.props.deleteUser(idUser)
    }
    //Mapping data user
    mappingDataUser = () => 
    // moi value la 1 user 
        this.props.dataUserProps.map((value, key) => (
            // user: value chinh la 1 nguoi
            <TableDataRow
                deleteButtonClick = {(idUser) => this.deleteButtonClick(idUser)}
                editFuncClick = {(user)=>this.props.editFunc(value)}
                key = {key}
                userName = {value.name}
                stt={key}
                tel={value.tel}
                permission = {value.permission}
                id = {value.id}
                // do minh lay tu thang bo nen phai co props
                changeEditUserStatus = {()=>this.props.changeEditUserStatus()} 
            />
        ))
    // Edit User
    // this.props.editfun

    render() {
        // console.log('Table Data: ',this.props.dataUserProps)
        return (
            <div className="col">
                <table className="table table-striped table-inverse table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Authorities</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.mappingDataUser()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableData;