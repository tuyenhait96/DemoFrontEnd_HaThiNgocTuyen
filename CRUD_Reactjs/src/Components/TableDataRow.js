import React, { Component } from 'react';

class TableDataRow extends Component {
    permissionShow = () => {
        if(this.props.permission === 1){return " Admin "}
        else if(this.props.permission === 2) { return " Moderator "}
        else { return " Normal User "}
    }

    //EditUser : lay ve thong tin nguoi dung
    editClick = () => {
        // lay noi dung nguoi dung
        this.props.editFuncClick()
        // ham thay doi trang thai, an hien save edit
        this.props.changeEditUserStatus()
    }

    deleteButtonClick = (idUser) => {
        // console.log('id phan tu la: ',idUser);
        // truyen id user nay sang qua data, data nhan duoc va in ra
        this.props.deleteButtonClick(idUser)
    }


    render() {
        //props.editFuncClick
        return (
            <tr>
                <td >{this.props.stt+1}</td>
                <td>{this.props.userName}</td>
                <td>{this.props.tel}</td>
                <td>{this.permissionShow()}</td>
                <td>
                    <div className="btn-group">
                        <div className="btn btn-warning edit"><i className="fa fa-edit" onClick={() => this.editClick()}/>Edit</div>
                        {/* table data truyen cho minh nen this.props.id */}
                        <div className="btn btn-dark delete" onClick={(idUser)=>this.deleteButtonClick(this.props.id)}><i className="fa fa-desktop" /> Delete</div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default TableDataRow;