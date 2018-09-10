import React from 'react';

const ListItem=(props)=>{
    return <li  className="list-group-item">
    <button className="btn-sm mr-4 btn-primary btn" onClick={props.editTodo}><i className="fa fa-edit"></i></button>
   {props.item.name}
   <button className="btn-sm ml-4 btn-danger btn" onClick={props.deleteTodo}><i className="fa fa-trash"></i></button>
   </li>
}
export default ListItem;