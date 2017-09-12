import React, { PropTypes } from 'react';

const ListItems = (props) => {

  const listElements = props.list.map((content, i) => {
    if (i === props.editing) {
      return <input key = {i} className="listInput" id="editItem" defaultValue={content} onKeyPress={(e) => props.edit(e,i)} autoFocus></input>
    } else {
      return <li key = {i} className="listItem" onDoubleClick={() => props.dblClick(i)}>{content}<button className="destroy" id="destroy" onClick={() => props.delete(i)}></button></li>;
    }
  });

  return (
    <div>
      <ul id="list">
        {listElements}
      </ul>
    </div>
  );
};

ListItems.propTypes = {
  list: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  dblClick: PropTypes.func.isRequired, 
  delete: PropTypes.func.isRequired, 
  editing: PropTypes.number.isRequired
};

export default ListItems;