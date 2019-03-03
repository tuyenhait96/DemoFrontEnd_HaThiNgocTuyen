import React, { Component } from 'react';
import { noteData } from './components/firebaseConnect';
import NoteItem from './NoteItem';

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFirebase: []
        }
    }
    // thuc hien truoc khi render
    componentWillMount() {
        // lay du lieu
        noteData.on('value', notes => {
            var arraData = []
            notes.forEach(element => {
                const key = element.key
                const noteTitle = element.val().noteTitle
                const noteContent = element.val().noteContent
                // console.log(key)
                arraData.push({
                    key: key,
                    noteTitle: noteTitle,
                    noteContent: noteContent,
                })
            })
            this.setState({
                dataFirebase: arraData
            });
            // console.log(noteData.val())
            // console.log(arraData)
        })
    }
    getData = () => {
        if(this.state.dataFirebase){
            return this.state.dataFirebase.map((value, key) => {
                // console.log(value.key)
                return (
                    <NoteItem
                    key = {key}
                    i = {key}
                    noteTitle = {value.noteTitle}
                    noteContent = {value.noteContent}
                    note = {value}
                    />
                )
            })
        }   
    }
    render() {
        return (                    
            <div className="col">
                <div id="noteList" role="tablist" aria-multiselectable="true">
                    {this.getData()}
                </div>
            </div>
        );
    }
}

export default NoteList;