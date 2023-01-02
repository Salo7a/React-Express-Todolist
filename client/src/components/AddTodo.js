import React, { useState } from "react";
import { FormControl, Container, Button, TextField } from "@mui/material/";
import Add  from "@mui/icons-material/Add";
import axios from 'axios';

export default function AddTodo ({ onAdd }) {
const [TaskName, setTaskName] = useState("");
  const handleChange = (e) => setTaskName(e.target.value);
  const createNewTodo = () => async () =>{
    let userid=123
    console.log(`New ${TaskName}`)
    await axios.post(`http://localhost:4000/todos/${userid}`, {task: TaskName})
    setTaskName("")
    onAdd()
  }
  return (
    <div style={{
        marginBottom: "10px"
    }}>
      <Container maxWidth="sm">
        <form onSubmit={createNewTodo()}>
          <FormControl fullWidth={true}>
            <TextField
              label="What to do?"
              variant="standard"
              onChange={handleChange}
              required={true}
              value={TaskName}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 5 }}
              onClick={createNewTodo()}
            >
              <Add />
              Add
            </Button>
          </FormControl>
        </form>
      </Container>
    </div>
  );
};