import {noteData} from './components/firebaseConnect';

var redux = require('redux')
const noteInitialState = {
    isEdit: false,
    editItem: {}, // sau khi editObject truyen vo thi cap nhat trong state
    isAdd: false,
    alertShow: false,
    alertContent: '',
    alertStatus: '',
}
const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case 'ADD_DATA':
        // dung react js
        // console.log('Ket noi thanh cong voi addData')

        // dung redux
        // console.log('Ket noi thanh cong voi addData' + action.getItem)
        noteData.push(action.getItem)
        // console.log('Them du lieu ' + JSON.stringify(action.getItem) + 'thanh cong')
            return state    
        
        case 'CHANGE_EDIT_STATUS':
            return {...state, isEdit: !state.isEdit}
        // tact dung tu GET_EDIT_DATA lay editObject(doi tuong duoc truyen vao) truyen vao editItem
        case 'CHANGE_ADD_STATUS':
            return {...state, isAdd: !state.isAdd}
        case 'GET_EDIT_DATA':
        // day item len store, sau do set state lai => return ...state: setstate do
            return {...state, editItem: action.editObject}
        
        case 'EDIT':
        // update du leiu len firebase
        // console.log(action.getItem.id)
        noteData.child(action.getItem.id).update({
            noteTitle: action.getItem.noteTitle,
            noteContent: action.getItem.noteContent
        })
        // console.log('Du lieu can sua ma store nhan duoc la ' + JSON.stringify(action.getItem))
        // console.log('Da cap nhat du lieu' + JSON.stringify(action.getItem) + 'thanh cong')
            return {...state, editItem:{}}
        case 'DELETE':
        //    console.log(action.deleteId)
            noteData.child(action.deleteId).remove()
            // console.log('Da xoa phan tu co id la: ' + action.deleteId)
            return state

            // minh gaá gia tri mac din luon
        case 'ALERT_ON':
            return {...state, alertShow:true, alertContent: action.AlertContent, alertStatus: action.AlertStatus}
            
        case 'ALERT_OFF':
            return {...state, alertShow:false}
        default:
            return state
    }
}
var store1 = redux.createStore(allReducer)
// Ham kiem tr dang ki nhan thong tin theo doi state
store1.subscribe(function() {
    console.log(JSON.stringify(store1.getState()))
})
export default store1;