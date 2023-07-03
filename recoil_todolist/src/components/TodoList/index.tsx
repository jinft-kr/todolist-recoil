import { useRecoilState } from "recoil";

import { TodoItemTypes, todosState } from "../../recoil/todo";
import { useCallback } from "react";
import TodoItem from "./TodoItem";

const TodoList = ()  =>  {
    const [todos, setTodos] = useRecoilState<TodoItemTypes[]>(todosState);

    const onComplete = useCallback((id: number): void => {
      setTodos(todos.map((todo: TodoItemTypes) => {
        // 매개변수로 받은 id와 같은 객체만 완료상태 업데이트
        return todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo;
      }));
    }, [setTodos, todos]);
      
    const onDelete = useCallback((id: number) => {
      // 매개변수로 받은 id와 동일하지 않는 객체들만 필터링
      setTodos(todos.filter((todo: TodoItemTypes) => todo.id !== id));
    }, [setTodos, todos]);

    return (
      <div>
      {
        todos.length > 0 
        ? todos.map((todo: TodoItemTypes) => {
          const { id, contents, isCompleted } = todo;

          return (
            <TodoItem
              key={id}
              id={id}
              contents={contents}
              isCompleted={isCompleted}
              onComplete={onComplete}
              onDelete={onDelete}
              todos={todos}
              setTodos={setTodos}
            />
          );
        }) 
        : <div>Todo가 없습니다. 자유롭게 추가해보세요!</div>
      }
      </div>
    )
}
export default TodoList;