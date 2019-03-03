import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteItem extends Component {
  twoActionButton = () => {
    this.props.changeEditStaus() // action 1
    //ham lay noi dung truyen vao trong store, de store update vao du lieu -- action 2
    // console.log(this.props.note)
    this.props.getEditData(this.props.note)
  }

  deleteData = ()=> {
    this.props.getDeleteData(this.props.note.key)
    this.props.alertOn('Xoa mon ' + this.props.note.noteTitle + ' thanh cong', 'warning')
  } 
    render() {
        return (
            <div className="card">
                <div className="card-header" role="tab" id="note1">
                    <h5 className="mb-0">
                        <a data-toggle="collapse" data-parent="#noteList" href={'#number' + this.props.i} aria-expanded="true" aria-controls="noteContent2">
                        {this.props.noteTitle} </a>
                    </h5>
                    <div className='btn-group float-right'>
                        <button className='btn btn-outline-info' onClick={() => this.deleteData()}>Xoa</button>
                        <button className='btn btn-outline-info' onClick = { () => this.twoActionButton()}>Sua</button>
                    </div>
                </div>
                <div id={'number' + this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
                    <div className="card-body">
                        {this.props.noteContent}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // khong can them cung duoc nhung ma trong cong thuc co state thi phia thuc hien
    // isEdit: state.isEdit
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditStaus: () => {
      dispatch({type: 'CHANGE_EDIT_STATUS'})
    },
    alertOn: (AlertContent, AlertStatus) => {
      dispatch({type: 'ALERT_ON', AlertContent, AlertStatus})
    },
    getEditData: (editObject) => {
      dispatch({
        type: 'GET_EDIT_DATA',
        editObject
      })
    },

    getDeleteData: (deleteId) => {
      dispatch({
        type: 'DELETE',
        deleteId
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteItem)