import { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';

export default function Todo() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('todo_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todo_items', JSON.stringify(items));
  }, [items]);

  const addItem = text => {
    setItems([...items, { id: Date.now(), text, completed: false }]);
  };

  const deleteItem = id => setItems(items.filter(i => i.id !== id));

  const toggleItem = id => {
    setItems(prevItems =>
      prevItems.map(i => (i.id === id ? { ...i, completed: !i.completed } : i)),
    );
  };

  const saveEdit = (id, newText) => {
    if (!newText.trim()) return deleteItem(id);
    setItems(items.map(i => (i.id === id ? { ...i, text: newText } : i)));
  };

  const toggleAll = () => {
    const allDone = items.length === items.filter(i => i.completed).length;
    setItems(items.map(i => ({ ...i, completed: !allDone })));
  };

  return (
    <div className="todo-container">
      <h2>TODO list</h2>
      <TodoInput onAdd={addItem} />
      <h3>Total {items.length}</h3>
      <ul>
        {items.map((item, index) => (
          <TodoItem
            key={item.id}
            item={item}
            index={index}
            onDelete={deleteItem}
            onToggle={toggleItem}
            onSave={saveEdit}
          />
        ))}
      </ul>
      <TodoStats
        total={items.length}
        completed={items.filter(i => i.completed).length}
        onToggleAll={toggleAll}
        onDeleteCompleted={() => setItems(items.filter(i => !i.completed))}
      />
    </div>
  );
}
