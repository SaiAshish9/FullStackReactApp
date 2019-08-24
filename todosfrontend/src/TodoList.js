import React from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
// import Todo from './Todo'
//
// const TodoList = ({ todos, onTodoClick }) => (
//   <ul>
//     {todos.map(todo =>
//       <Todo
//         key={todo.id}
//         {...todo}
//         onClick={() => onTodoClick(todo.id)}
//       />
//     )}
//   </ul>
// )
//
// TodoList.propTypes = {
//   todos: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
//   }).isRequired).isRequired,
//   onTodoClick: PropTypes.func.isRequired
// }
//
const APIURL='/api/todos/';
class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      todos:[]
    }
    this.addTodo=this.addTodo.bind(this);

  }
  componentWillMount(){
this.loadTodos();
  }

loadTodos(){
  fetch(APIURL)
  .then(res=>{
    if(!res.ok){
      if(res.status>=400&&res.status<500){
return res.json().then(data=>{
  let err={errorMessage:data.message};
  throw err;
})

}
else{
  let err={errorMessage:'Try Again Later'};
  throw err;
}
  }
  return res.json();
}).then(todos=>this.setState({todos}));
}

addTodo(val){
  fetch(APIURL,{
    method:'post',
    headers:new Headers({
      'Content-Type':'application/json',
    }),
    body:JSON.stringify({name:val})

  })
  .then(res=>{
    if(!res.ok){
      if(res.status>=400&&res.status<500){
return res.json().then(data=>{
  let err={errorMessage:data.message};
  throw err;
})

}
else{
  let err={errorMessage:'Try Again Later'};
  throw err;
}
  }
  return res.json();
}).then(newTodo=>{
  this.setState({todos:[...this.state.todos,newTodo]})
});

}

deleteTodo(id){
  const deleteUrl=APIURL+id;
  fetch(deleteUrl,{
    method:'delete',
  })
  .then(res=>{
    if(!res.ok){
      if(res.status>=400&&res.status<500){
return res.json().then(data=>{
  let err={errorMessage:data.message};
  throw err;
})

}
else{
  let err={errorMessage:'Try Again Later'};
  throw err;
}
  }
  return res.json();
}).then(()=>{
const filtered=this.state.todos.filter(todo=>todo._id!==id);
  this.setState({todos:filtered})
});
}


toggleTodo(todo){
  const url=APIURL+todo._id;
  fetch(url,{
    method:'put',
    headers:new Headers({
      'Content-Type':'application/json',
    }),
    body:JSON.stringify({completed:!todo.completed})
  })
  .then(res=>{
    if(!res.ok){
      if(res.status>=400&&res.status<500){
return res.json().then(data=>{
  let err={errorMessage:data.message};
  throw err;
})

}
else{
  let err={errorMessage:'Try Again Later'};
  throw err;
}
  }
  return res.json();
}).then(todo=>{
const filtered=this.state.todos.map(t=>
  (t._id===todo._id)?{...t,completed:!t.completed}:t)
  this.setState({todos:filtered})
});
}

  render(){
    const todos=this.state.todos.map(t=>(
      <TodoItem
key={t._id}
{...t}
onDelete={this.deleteTodo.bind(this,t._id)}
onToggle={this.toggleTodo.bind(this,t)}

      />
    ));
    return(
      <div>
      <h1>Todo List!</h1>
      <TodoForm addTodo={this.addTodo}/>
<ul>
      {todos}
</ul>
</div>
    )
  }
}

 export default TodoList
