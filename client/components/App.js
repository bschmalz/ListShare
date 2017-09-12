import React, { Component } from 'react';
import $ from 'jquery'; 
import ListItems from './ListItems'

// Grabs the URL parameters to get the username
const urlParams = window.location.href.slice(window.location.href.indexOf('?') + 1);

class App extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.getData = this.getData.bind(this);
    this.editData = this.editData.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.dblClick = this.dblClick.bind(this);
    this.state = {
      list: [], 
      editing: -1, 
    }
  }

  // Initial data grab on load
  componentWillMount() {
    this.getData();
  }

  // Deletes an item from the list and removes it from database
  deleteItem(index) {
    let newState = this.state.list.slice();
    newState.splice(index, 1);
    this.setState({list: newState});
    $.post('http://localhost:3000/editData?' + urlParams, {name: urlParams, list: newState}, data => {});
  }

  // This checks keypresses on the input and handles anything when Enter is pressed
  keyPress(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
      let newState = this.state.list.slice();
      const input = document.getElementById("listInput");
      if (input.value === '') return; 
      newState.push(input.value);
      this.setState({list: newState});
      input.value = '';
      $.post('http://localhost:3000/editData?' + urlParams, {name: urlParams, list: newState}, data => {});
    }
  }

  // Similar function as above but this one is specifically for editing items so it has some unique functionality
  // These two functions could be coupled together if needed
  editData(e, index) {
    const keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      const item = document.getElementById('editItem'); 
      const val = item.value;
      if (val === '') return;  
      let newList = this.state.list.slice();
      newList[index] = val; 
      this.setState({list: newList, editing: -1});
      $.post('http://localhost:3000/editData?' + urlParams, {name: urlParams, list: newList}, data => {});
    }
  }

  // Sets a list item to be editable on double click
  dblClick(i) {
    this.setState({editing: i});
  }

  // Gets data from the server/db
  getData() {
    $.getJSON('http://localhost:3000/getData?' + urlParams, data => {
        this.setState({list: data});
    });
  }

  render() {
    return (
      <div>
        <h1 id="shopList">Shopping List</h1>
        <input type="text" placeholder="Add an item" id="listInput" className="listInput" onKeyPress={this.keyPress.bind(this)}/>
        <ListItems editing={this.state.editing} list={this.state.list} delete={this.deleteItem} edit={this.editData} dblClick={this.dblClick}/>
        <a href="http://localhost:3000/logout" id="logout">Log Out</a>  
      </div>
      );
  }
}





export default App;
