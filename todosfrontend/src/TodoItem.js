import React from 'react'

const TodoItem=({name,completed,onDelete,onToggle})=>(
<li>  <span
style={{
    textDecoration: completed ? 'line-through' : 'none'
  }}
onClick={onToggle}
  >
{name}

</span>
<span style={{position:'relative',left:'20px'}} onClick={onDelete}>X</span>
</li>
);
export default TodoItem;
