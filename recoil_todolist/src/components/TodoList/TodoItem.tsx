import React, { useCallback, useState } from 'react';

import { TodoItemTypes } from '../../recoil/todo';

import { SetterOrUpdater } from 'recoil';
import TodoModal from '../TodoModal';

interface PropTypes {
  id: number;
  contents: string;
  isCompleted: boolean;
  
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  
  todos: TodoItemTypes[];
  setTodos: SetterOrUpdater<TodoItemTypes[]>;
}

const TodoItem = ({
  id,
  contents,
  isCompleted,
  onComplete,
  onDelete,
  todos,
  setTodos,
}: PropTypes): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modifyContents, setModifyContents] = useState<string>('');

  const onModify = useCallback((): void => {
    setIsModal(true);
    setModifyContents(contents);
    // 선택한 Todo의 내용을 default value로 지정하는 작업
  }, [contents]);

  const onModifyTodo = useCallback((): void => {
    if (!modifyContents.trim()) {
      return;
    }

    // Todo 업데이트 확인을 눌렀을때 객체 업데이트
    setTodos(todos.map((todo: TodoItemTypes) => {
      return todo.id === id ? { ...todo, contents: modifyContents } : todo;
    }));

    setIsModal(false);
  }, [id, modifyContents, setTodos, todos]);

  return (
    <>
      {       
        isModal &&
        <TodoModal
            setIsModal={setIsModal}
            modifyContents={modifyContents}
            setModifyContents={setModifyContents}
            onModifyTodo={onModifyTodo}
        />
      }
      <div className='TodoItem'>
        <div
          title={contents}
          className={isCompleted ? 'TodoItem-Completed' : ''}
          onClick={() => onComplete(id)}
        >
          {contents}
        </div>

        <div className='TodoItem-Icons'>
          <button className='TodoItem-Icons-Pen' onClick={onModify}>수정</button>
          <button className='TodoItem-Icons-Close' onClick={() => onDelete(id)}>삭제</button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
