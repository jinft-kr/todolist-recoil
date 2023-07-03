import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoTitle from "./components/TodoTitle";

function App() {
  return (
    <div className='TodoTemplate'>
      <div className='TodoTemplate-Contents'>
        <TodoTitle />
        <TodoList />
        <TodoInput />
      </div>
    </div>
  );
}

export default App;
