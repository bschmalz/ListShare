import React, { Component } from 'react';

const incomingurl = window.location.href;
const incomingurlIndex = incomingurl.indexOf('?'); 
const urlParams = incomingurl.slice(incomingurlIndex + 1)
console.log(urlParams);

function keyPress(e){
    const keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      let newState = this.state.list.slice();
      const input = document.getElementById("listInput");
      newState.push(input.value);
      this.setState({list: newState});
      input.value = '';
    }
}

function deleteItem(i) {
  let newState = this.state.list.slice();
  newState.splice(i, 1);
  this.setState({list: newState});
}


class App extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = deleteItem.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      list: ['one', 'two', 'three']
    };
  }

  // handleClick(row, square) {
  //   let { turn, winner } = this.state;
  //   const { rows } = this.state;
  //   const squareInQuestion = rows[row][square];

  //   if (this.state.winner) return;
  //   if (squareInQuestion) return;

  //   rows[row][square] = turn;
  //   turn = turn === 'X' ? 'O' : 'X';
  //   winner = checkWin(rows);

  //   this.setState({
  //     rows,
  //     turn,
  //     winner,
  //   });
  // }

  render() {

    const listElements = this.state.list.map((content, i) => (
      <li key = {i} className="listItem">{content}<button className="destroy" id="destroy" onClick={() => this.deleteItem(i)}></button></li>
    ));




  return (
      <div>
      <h1>Shopping List</h1>
      <input type="text" placeholder="Add an item" id="listInput" onKeyPress={keyPress.bind(this)}/>
      <ul id="list">
        {listElements}
      </ul>  
      </div>
    );
  }
}





export default App;
