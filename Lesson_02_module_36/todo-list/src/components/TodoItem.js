import { useState, useEffect, useRef } from 'react';

const TodoItem = ({ item, index, onDelete, onToggle, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const editRef = useRef(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
      // Опционально: переместить курсор в конец текста
      const length = editRef.current.value.length;
      editRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(item.id, editText);
    setIsEditing(false);
  };

  return (
    <li key={item.id} className="todo-list-item">
      {isEditing ? (
        <>
          <input
            ref={editRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
          {index + 1}.
          <div className="todo-item-flex-grow">
            <span
              className={item.completed ? 'item-completed' : ''}
              onClick={() => onToggle(item.id)}
              onDoubleClick={() => setIsEditing(true)}
            >
              {item.text}
            </span>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>x</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
