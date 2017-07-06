import React, { Component } from 'react';
import $ from 'jquery'; 

    const incomingurl = window.location.href;
    const incomingurlIndex = incomingurl.indexOf('?'); 
    const urlParams = incomingurl.slice(incomingurlIndex + 1)









function keyPress(e){
    const keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      let newState = this.state.list.slice();
      const input = document.getElementById("listInput");
      newState.push(input.value);
      this.setState({list: newState});
      input.value = '';
      $.post('http://localhost:3000/editData?' + urlParams, {name: urlParams, list: newState}, data => {
        console.log('got back add post');
      });
    }
}

function deleteItem(i) {
  let newState = this.state.list.slice();
  newState.splice(i, 1);
  this.setState({list: newState});
  $.post('http://localhost:3000/editData?' + urlParams, {name: urlParams, list: newState}, data => {
    console.log('got back delete post');
  });
}


class App extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = deleteItem.bind(this);
    this.getData = this.getData.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      list: []
    };
    this.getData();
  }

  getData() {
    $.getJSON('http://localhost:3000/getData?' + urlParams, data => {
        console.log('setting state');
        this.setState({list: data});
    });
  }


  render() {

    const listElements = this.state.list.map((content, i) => (
      <li key = {i} className="listItem">{content}<button className="destroy" id="destroy" onClick={() => this.deleteItem(i)}></button></li>
    ));




  return (
      <div>
      <h1 id="shopList">Shopping List</h1>
      <input type="text" placeholder="Add an item" id="listInput" onKeyPress={keyPress.bind(this)}/>
      <ul id="list">
        {listElements}
      </ul>
      <a href="http://localhost:3000/logout" id="logout">Log Out</a>  
      </div>
    );
  }
}





export default App;
