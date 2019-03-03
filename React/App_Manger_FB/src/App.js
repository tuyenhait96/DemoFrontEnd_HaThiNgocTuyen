import React, { Component } from 'react';
import Nav from './Nav';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import {noteData} from './components/firebaseConnect';
import { connect } from 'react-redux';
import AlertInfo from './components/AlertInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  addData = (item) => {
    noteData.push(item)
  }

  showForm = () => {
    if(this.props.isEdit) {
      return <NoteForm/>
    }
  }
  render() {
    // noteData.once('value').then(function(snapshot) {
    //   console.log(snapshot.val())
    // })
    return (
     <div>
       <Nav/>
       <AlertInfo/>
       <div className='container'>
         <div className='row'>
           <NoteList/>
           
           {/* <NoteForm getData = {(item) => this.addData(item)}/>  reactjs*/ }
           {this.showForm()} 
         </div>
       </div>
     </div> 
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}

export default connect(mapStateToProps)(App)