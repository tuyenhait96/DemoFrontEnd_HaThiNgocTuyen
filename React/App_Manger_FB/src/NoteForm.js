import { connect } from 'react-redux';
import React, { Component } from 'react';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        // lu du lieu state o day da roi truyen sang form sau
        this.state = {
            noteTitle: '',
            noteContent: '',
            id: ''
        }
    }


    componentWillMount() {
        if (this.props.editItem) {
            this.setState({
                noteTitle: this.props.editItem.noteTitle,
                noteContent: this.props.editItem.noteContent,
                id: this.props.editItem.key
            });
        }
    }


    isChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        });
    }
    // dung react js
    //  addData = (title, content) => {
    //     var item = {}
    //     item.noteTitle = title
    //     item.noteContent = content
    //     // gui item tren app de app xu li
    //     // console.log(item)
    //     // this.props.getData(item)
    //     alert('Them du lieu ' + JSON.stringify(item) + 'thanh cong')
    //     this.props.addDataStore() //su dung reducer trong store // dispatch AA_DATA
    // } 

    // dung redux  
    addData = (title, content) => {
        if (this.state.id) { // edit case
            var editObject = {}
            editObject.id = this.state.id
            editObject.noteContent = this.state.noteContent
            editObject.noteTitle = this.state.noteTitle

            this.props.editDataStore(editObject)
            // console.log('Dang sua du lieu')
            this.props.changeEditStatus()// tat form
            this.props.alertOn('Sua thanh cong', 'success')
        } else { // them moi
            var item = {}
            item.noteTitle = title
            item.noteContent = content
            this.props.addDataStore(item) //su dung reducer trong store // dispatch AA_DATA
            this.props.alertOn('Them moi thanh cong', 'danger')
        }
    }
    printTitle = () => {
        if(this.props.addStatus) {
            return <h3>ADD NEW CONTENT</h3>
        }else{
            return <h3>EDIT CONTENT</h3>
        }
    }
    render() {
        // console.log(this.props.editItem.key)
        return (
            <div className="col-4">
                {/* <h3>ADD NEW CONTENT</h3> */}
                {this.printTitle()}
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Title Note</label>
                        <input defaultValue={this.props.editItem.noteTitle} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle" placeholder="Title Note" />
                        <small id="helpIdNoteTitle" className="form-text text-muted">Fill Title Here</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Content Note</label>
                        <textarea defaultValue={this.props.editItem.noteContent} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteContent" id="noteContent" aria-describedby="helpIdNoteTitle" placeholder="Content Note" />
                        <small id="helpIdNoteTitle" className="form-text text-muted">Fill Content Here</small>
                    </div>
                    <button type="reset" onClick={() => this.addData(this.state.noteTitle, this.state.noteContent)} className="btn btn-secondary btn-block">Save</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
        addStatus: state.isAdd
    }
}
// this,props.testThoi: gia tri lay trong store
const mapDispatchToProps = (dispatch, ownProps) => {
    // dispatch: thu thi cai gi (thuoc tinh)
    return {
        // dung react
        //  addDataStore: () => {
        //     dispatch({type: 'ADD_DATA'})
        // }     
        // dung redux  
        addDataStore: (getItem) => {
            dispatch({ type: 'ADD_DATA', getItem })
        },

        editDataStore: (getItem) => {
            dispatch({ type: 'EDIT', getItem })
        },

        changeEditStatus: () => {
            dispatch({
                type: 'CHANGE_EDIT_STATUS',
            })
        },
        
        alertOn: (AlertContent,AlertStatus ) => {
            dispatch({
                type: 'ALERT_ON', AlertContent, AlertStatus
            })
        },
        
        alertOff: () => {
            dispatch({
                type: 'ALERT_OFF',
            })
        },
    }
}

//this.props.addDataStore()
export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);