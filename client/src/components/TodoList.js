import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList({todos, onCheck, onDelete}) {
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={onDelete({id: todo.id})}>
                <DeleteIcon />
              </IconButton>  
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={onCheck({id: todo.id, state: todo.isCompleted})} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.isCompleted}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': todo.id }}
                />
              </ListItemIcon>
              <ListItemText id={todo.id} primary={todo.TaskName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
