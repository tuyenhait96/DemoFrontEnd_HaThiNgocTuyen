import React, { Component } from 'react';
import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';
import DataUser from './Data.json';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showForm: false,
      // data: DataUser,
      data: [],
      searchText: '',
      // true: hien thi, false khong
      editUserStatus: false,
      // day du lieu da co xuong, ta luu qua bien trung gian
      userEditObject: {}
    }
  }

  // truoc khi vao minh phai day du lieu ra xem cycle hoof,
  componentWillMount() {
    // kiem tra co localStorage chua, co thi cap nhat, chua thi tao moi
    // console.log(localStorage.getItem('userData'))
    if(localStorage.getItem('userData') === null) {
      localStorage.setItem('userData', JSON.stringify(DataUser))
    }else {
      var temp = JSON.parse(localStorage.getItem('userData'));
      this.setState({
        data: temp
      });
    }
  }
  
  // Edit
  editUser = (user) => {
    console.log('Okie Edit');
    console.log(user)
    // luu tru user vao trong state
    this.setState({
      userEditObject: user
    });
  }

  changeEditUserStatus = () => {
    this.setState({
      editUserStatus: !this.state.editUserStatus
    });
  }
  getNewUserData = (name, tel, permission) => {
    let item = {}
    item.id = uuidv1()
    item.name = name
    item.tel = tel
    item.permission = permission
    console.log('OK');
    // console.log(name)
    // console.log(tel)
    // console.log(permission)
    let items = this.state.data
    items.push(item)
    // console.log(item)
    console.log(items)
    // minh luu lai data moi nhe
    this.setState({
      data: items
    });
    console.log(this.state.data)

    localStorage.setItem('userData', JSON.stringify(items))
  }
  changeStatus = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  getTextSearch = (dl) => {
    this.setState({
      searchText: dl
    });
    console.log('Du lieu bo nhan duoc la ' + this.state.searchText)
  }
  // thongbao = () => { alert('Ket noi thanh cong')}

  getUserEditInfoApp = (info) => {
    console.log('Okie Edit App' + info);
    this.state.data.forEach((value, key) => {
      console.log(value.name)
      if(value.id === info.id){
        value.name = info.name
        value.tel = info.tel
        value.permission = info.permission
      }
    })
    localStorage.setItem('userData', JSON.stringify(this.state.data))
  } 

  deleteUser = (idUser) => {
    // console.log(idUser)
    var tempData = this.state.data.filter(item => item.id !== idUser)
    this.setState({
      data: tempData
    });
    // day du lieu
    localStorage.setItem('userData',JSON.stringify(tempData))
    // tempData.forEach((value, key) => {
    //   if(value.id === idUser) {
    //     // console.log(value.name)
    //     console.log(key)
    //   }
    // })
  }
  
  render() {
    // console.log(this.state.data)
    // Do localStorage: lu duoi key, value : ma value luu o dang text
    // k the luu object duoi dang text nen chuyen dung stringify
    // localStorage.setItem('userData',JSON.stringify(DataUser))
    // Lay du lieu ve thi phai cover mang nguoc lai => parse

    var ketqua = []
    this.state.data.forEach((item) => {
      if (item.name.indexOf(this.state.searchText) !== -1) {
        ketqua.push(item)
      }
    })
    // console.log(ketqua)
    return (
      <div>
        <Header />
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search 
                // de trung ten userEditObject k sao
                userEditObject={this.state.userEditObject}
                editUserStatus={this.state.editUserStatus}
                changeEditUserStatus={() => this.changeEditUserStatus()}
                checkConnectProps={(dl) => this.getTextSearch(dl)}
                conNect={() => this.changeStatus()} showFormData={this.state.showForm}
                getUserEditInfoApp = {(info) => this.getUserEditInfoApp(info)} />

              <TableData 
                deleteUser = { (idUser) => this.deleteUser(idUser)}
                editFunc={(user) => this.editUser(user)}
                // dataUserProps={this.state.data}
                dataUserProps={ketqua}
                changeEditUserStatus = {()=>this.changeEditUserStatus()}
              />
              <AddUser showFormData={this.state.showForm} add={(name, tel, permission) => this.getNewUserData(name, tel, permission)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
