/* React functional component with a few common syntax and logical issues. Here are the corrections:
Issues & Fixes
Spread Operator: In const updatedElement = [...item, newElement];, the variable item is an array. Using the spread operator here is correct for creating a new array, but ensure the state name is plural (e.g., items) for clarity.
Key Prop Syntax: On the <li> tag, the template literal is missing the opening backtick. It should be:
key={
{index}}``.
Mapping Return: The item.map function is missing a return statement or needs to use an implicit return (parentheses instead of curly braces).
State Hook: The useState hook is initialized with an array ['First Element'], which is correct for a list.
Corrected Code Snippet
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState(['First Element']);
  console.log('items: ' + items);

  const onClickHandler = () => {
    const newElement = 'new element';
    // Актуальность данных: React обновляет состояние
    // не мгновенно, а очередями (батчинг). Если ты
    // вызовешь setItems несколько раз подряд, обычный метод
    // (через items) может использовать «старое» значение массива,
    // так как переменная items внутри функции не меняется до следующего рендера
    // Асинхронность: Функциональный подход гарантирует, что
    // ты всегда получаешь самую свежую версию стейта (prevItems)
    // прямо в момент обновления
    // Functional update is safer when based on previous state
    setItems(prevItems => [...prevItems, newElement]);
    // // 2 Когда использовать: Только если новое состояние вообще
    // // не зависит от предыдущего (например, ты просто загружаешь
    // // данные с сервера и полностью перезаписываешь список).
    // const updatedElement = [...items, newElement];
    // setItems(updatedElement);
    // // Пример с «зависанием» состояния:
    // //  когда обновления происходят «пачкой» (batching) или
    // // внутри асинхронного кода.
    // setItems([...items, 'new 1']);
    // setItems([...items, 'new 2']);
    // setItems([...items, 'new 3']); // В итоге добавится только 'new 3'
    // // Тот же пример, но «безопасный»
    // setItems(prev => [...prev, 'new 1']);
    // setItems(prev => [...prev, 'new 2']);
    // setItems(prev => [...prev, 'new 3']);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {items.map((element, index) => (
            <li key={`${element}-${index}`}>
              {element} {index}
            </li>
          ))}
        </ul>
        <button onClick={onClickHandler}>Add new element</button>
      </header>
    </div>
  );
}

export default App;
