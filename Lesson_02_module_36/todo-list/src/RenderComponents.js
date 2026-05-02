import TodoList from './TodoList';

const RenderComponents = () => {
  const toDos = [
    { id: 1, todo: 'firstTodo' },
    { id: 2, todo: 'secondTodo' },
    { id: 3, todo: 'thirdTodo' },
    { id: 4, todo: 'fourthTodo' },
  ];

  return (
    <>
      {toDos.map(todo => (
        <TodoList key={todo.id} todos={todo} />
      ))}
    </>
  );
};

export default RenderComponents;
