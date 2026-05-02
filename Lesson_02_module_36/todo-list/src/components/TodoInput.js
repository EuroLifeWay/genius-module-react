import { useState, useRef } from 'react';

const TodoInput = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="new task"
        autoFocus
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoInput;
