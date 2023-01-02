import * as React from 'react';
import TodoList from "./components/TodoList";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = React.useState([]);
  async function fetchData() {
    let res = await axios.get("http://localhost:4000/todos/123")
    setTodos(res.data.todos)
 }
  React.useEffect(()=>{ 
    fetchData();
  },[])
  const handleTodoToggle = ({id, state}) => async () => {
    let res = await axios.put(`http://localhost:4000/todo/${id}`, {isCompleted: !state})
    let newTodo = res.data.todo;
    let newTodos =  todos.filter((todo)=>{
      if(todo.id === newTodo.id){
        todo.isCompleted = newTodo.isCompleted
      }
      return todo
    })
    setTodos(newTodos)
  };
  const deleteTodo =  ({id}) => async () =>{
    await axios.delete(`http://localhost:4000/todo/${id}`)
    fetchData();
  }
  return (
    <Container>
      <AddTodo onAdd={fetchData}/>
      <Card variant="outlined" sx={{minWidth: "40%", width: "max-content", margin: "auto", position: "relative",top: "50%"}}>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="black" gutterBottom>
          User's Todo List
        </Typography>
        
      </CardContent>
        <TodoList todos={todos} onCheck ={handleTodoToggle} onDelete={deleteTodo}/>
      </Card>
    </Container>
  );
}

export default App;
