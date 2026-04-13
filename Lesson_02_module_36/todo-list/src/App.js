import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const mainInputRef = useRef(null);
  const editInputRef = useRef(null);
  const [input, setInput] = useState('');
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('todo_items');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState(''); // temporary text for input
  const totalCount = items.length;
  const completedCount = items.filter(item => item.completed).length;

  useEffect(() => {
    localStorage.setItem('todo_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const onClickHandler = () => {
    if (!input) return;
    const newItem = {
      // id: crypto.randomUUID(),
      id: Date.now(),
      text: input,
      completed: false,
    };
    setItems(prevItems => [...prevItems, newItem]);
    setInput('');
    mainInputRef.current.focus();
  };

  const onChangeHandler = e => {
    const value = e.target.value;
    setInput(value);
  };

  const deleteHandler = idToDelete => {
    setItems(prevItems => prevItems.filter(item => item.id !== idToDelete));
  };

  const toggleComplete = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const toggleAllComplete = () => {
    setItems(prevItems =>
      prevItems.map(item =>
        completedCount === totalCount
          ? { ...item, completed: !item.completed }
          : !item.completed
            ? { ...item, completed: !item.completed }
            : item,
      ),
    );
  };

  const deleteCompletedHandler = () => {
    setItems(prevItems => prevItems.filter(item => !item.completed));
  };

  const startEdit = item => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = id => {
    if (!editText.trim()) {
      deleteHandler(id);
      setEditingId(null);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, text: editText } : item,
      ),
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>TODO list</h2>
        <input
          ref={mainInputRef}
          onChange={onChangeHandler}
          value={input}
          placeholder="new task"
          autoFocus
          onKeyDown={e => e.key === 'Enter' && onClickHandler()}
        ></input>
        <h3>Total {totalCount}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={item.id}>
              {editingId === item.id ? (
                // EDIT MODE
                // <InputEdit />
                <>
                  <input
                    ref={editInputRef}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEdit(item.id);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                  ></input>
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                // NORMAL MODE
                <>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                  ></input>
                  <span
                    className={item.completed ? 'item-completed' : ''}
                    onClick={() => toggleComplete(item.id)}
                    onDoubleClick={() => startEdit(item)}
                  >
                    {item.text} {index + 1} {'   '}
                  </span>
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button onClick={() => deleteHandler(item.id)}>x</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <button onClick={onClickHandler}>Add new task</button>
        <div className="stats">
          {totalCount > 0 ? (
            <p>
              Completed {completedCount} of {totalCount}
            </p>
          ) : (
            <p>The list is empty. Add a task!</p>
          )}
        </div>
        {totalCount > 1 && (
          <button onClick={toggleAllComplete}>
            {completedCount === totalCount
              ? `Cancel all (${totalCount})`
              : `Complete all (${totalCount})`}
          </button>
        )}
        {completedCount > 0 && (
          <button onClick={deleteCompletedHandler}>
            Delete completed ({completedCount})
          </button>
        )}
      </header>
    </div>
  );
}

export default App;

// localstorage, editing functions and autoFocus partially using AI
// https://share.google/aimode/9kmyIPh2tHC7emVxj
// refactoring
// https://share.google/aimode/CJWUjDs7qWWsSjkfe
