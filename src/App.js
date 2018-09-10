import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem'
import loadingGif from './loading.gif'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      newTodo:'',
      editing:false,
      editingIndex:null,
      notification:null,
      todos:[],
      loading:true
    };

this.apiUrl='https://5b966e9852764b001413bc7c.mockapi.io';

     this.handlechange=this.handlechange.bind(this);
    this.addTodo=this.addTodo.bind(this);
    this.deleteTodo=this.deleteTodo.bind(this);
    this.updateTodo=this.updateTodo.bind(this);
    
    this.alert=this.alert.bind(this);
  }
  

async componentDidMount(){
  const response=await axios.get(`${this.apiUrl}/todos`);
  
  setTimeout(()=>{
    this.setState({
      todos:response.data,
      loading:false
    });
  },1000);
}



  handlechange(event) {
    this.setState({
      newTodo:event.target.value
    });
   }

  
   async addTodo(){
    
    const response= await axios.post(`${this.apiUrl}/todos`,{
      name:this.state.newTodo
    });
    this.setState({
      todos:this.state.todos.concat(response.data),
      newTodo:''
    });
    this.alert('Todo added successfully!')
  }
 async deleteTodo(index){
const todos=this.state.todos;
const todo=todos[index];
await axios.delete(`${this.apiUrl}/todos/${todo.id}`)
delete todos[index];
this.setState({
  todos
});
this.alert('Todo deleted successfully!')
  }
  editTodo(index){
    const todo=this.state.todos[index];
this.setState({
  editing:true,
  newTodo:todo.name,
  editingIndex:index
});
  }
 async updateTodo(){
const todo=this.state.todos[this.state.editingIndex];
const response=await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
  name:this.state.newTodo
});

const todos=this.state.todos;
todos[this.state.editingIndex]=response.data;
this.setState({
  todos,
  editing:false,
  editingIndex:null,
  newTodo:''
});
this.alert('Todo Updated successfully!')
  }
  alert(notification){
this.setState({
  notification
});
setTimeout(()=>{
  this.setState({
    notification:null
  });
},2000);
  }
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD REACT</h1>
        </header>
        <div className="container">
        {
          this.state.notification &&
          <div className="alert alert-success my-4">
        <p className="text-center">{this.state.notification}</p>
        </div>
        }
        <input type="text" name="todo" className="form-control my-4" placeholder="Add a new todo" onChange={this.handlechange} value={this.state.newTodo}/>
        <button className="btn-success form-control mb-4" onClick={this.state.editing?this.updateTodo:this.addTodo} disabled={this.state.newTodo.length<5}>{this.state.editing?'Update Todo' : 'Add Todo'}</button>
        {
          this.state.loading && <img src={loadingGif} alt=""/>
        }
           {
             (!this.state.editing || this.state.loading) && 
             <ul className="list-group">
           
             {this.state.todos.map((item,index)=>{
               return <ListItem
               key={item.id}
               item={item}
               editTodo={()=>{this.editTodo(index)}}
               deleteTodo={()=>{this.deleteTodo(index)}}
               />
             })}
           </ul>
           }
        </div>
      </div>
    );
  }
}

export default App;
