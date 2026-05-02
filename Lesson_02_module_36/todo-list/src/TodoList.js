export default function TodoList(props) {
  return (
    <div>
      {props.todos.id}
      {': '}
      {props.todos.todo}
    </div>
  );
}
