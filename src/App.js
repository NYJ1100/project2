// import { useState, useRef } from 'react';
// import './App.css';
// import Header from './component/Header';
// import TodoEditor from './component/TodoEditor';
// import TodoList from './component/TodoList';

// const mockTodo = [
//   {
//   id: 0,
//   isDone: false,
//   content: "React 공부하기",
//   createdDate: new Date().getTime(),
// },
// {
//   id: 1,
//   isDone: false,
//   content: "빨래 널기",
//   createdDate: new Date().getTime(),
// },
// {
//   id: 2,
//   isDone: false,
//   content: "노래 연습하기",
//   createdDate: new Date().getTime(),
// },
// ];

// function App() {
//   const [todo, setTodo] = useState([mockTodo]);
//   const idRef = useRef(3);
//   const onCreate = (content) => {
//     const newItem = {
//       id: idRef.current,
//       content,
//       isDone: false,
//       createdDate: new Date().getTime(),
//     };
//     setTodo([newItem, ...todo]);
//     idRef.current += 1;
//   };

//   const onUpdate = (targetId) => {
//     setTodo(
//       todo.map((it) =>
//         it.id === targetId ? { ...it, isDone: !it.isDone } : it
//       )
//     ); 
//   };

//   const onDelete = (targetId) => {
//     setTodo(todo.filter((it) => it.id !== targetId));
//   };

//   return (
//     <div className="App">
//     <Header />
//     <TodoEditor onCreate={onCreate} />
//     <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
//     </div>
//   );
// }
// export default App;

// import { useState,useRef } from 'react';
// import './App.css';
// import Header from './component/Header';
// import TodoEditor from './component/TodoEditor';
// import TodoList from './component/TodoList';



// const mockTodo = [
//   {
//     id:0,
//     isDon: false,
//     content: "React 공부하기",
//     createDate: new Date().getTime(),
//   },
//   {
//     id:1,
//     isDon: false,
//     content: "빨래 널기",
//     createDate: new Date().getTime(),
//   },
//   {
//     id:2,
//     isDon: false,
//     content: "노래 연습하기",
//     createDate: new Date().getTime(),
//   },
// ];



// function App() {

//   const idRef = useRef(3); //3
//   const [todo, setTodo] = useState(mockTodo);

//   const onCreate = (content) => {
//     const newItem = {
//       id: idRef.current,
//       content,
//       isDone: false,
//       createDate: new Date().getTime(),
//     };
//     setTodo([newItem, ...todo]);
//     idRef.current += 1;
//   };

//   const onUpdate = (targetId) => {
//     setTodo(
//       todo.map((it) => it.id === targetId ? {...it, isDone: !it.isDone } : it)
//     );
//   };

//   const onDelete = (targetId) => {
//     setTodo(todo.filter((it)=> it.id!== targetId));
//   };

//   return (
//     <div className="App">
//       <Header />
//       <TodoEditor onCreate = {onCreate} />
//       <TodoList todo = {todo} onUpdate={onUpdate} onDelete = {onDelete}/>
//     </div>
//   );
// }

// export default App

// import { useState,useRef } from 'react';
// import './App.css';
// import Header from './component/Header';
// import TodoEditor from './component/TodoEditor';
// import TodoList from './component/TodoList';
// import TestComp from "./component/TestComp";



// const mockTodo = [
//   {
//     id:0,
//     isDone: false,
//     content: "React 공부하기",
//     createDate: new Date().getTime(),
//   },
//   {
//     id:1,
//     isDone: false,
//     content: "빨래 널기",
//     createDate: new Date().getTime(),
//   },
//   {
//     id:2,
//     isDone: false,
//     content: "노래 연습하기",
//     createDate: new Date().getTime(),
//   },
// ];



// function App() {

//   const idRef = useRef(3); //3
//   const [todo, setTodo] = useState(mockTodo);

//   const onCreate = (content) => {
//     const newItem = {
//       id: idRef.current,
//       content,
//       isDone: false,
//       createDate: new Date().getTime(),
//     };
//     setTodo([newItem, ...todo]);
//     idRef.current += 1;
//   };

//   const onUpdate = (targetId) => {
//     setTodo(
//       todo.map((it) => it.id === targetId ? {...it, isDone: !it.isDone } : it)
//     );
//   };

//   const onDelete = (targetId) => {
//     setTodo(todo.filter((it)=> it.id!== targetId));
//   };

//   return (
//     <div className="App">
//       <TestComp />
//       <Header />
//       <TodoEditor onCreate = {onCreate} />
//       <TodoList todo = {todo} onUpdate={onUpdate} onDelete = {onDelete}/>
//     </div>
//   );
// }

// export default App

import React, { useCallback, useMemo, useReducer ,useRef } from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
//import { type } from '@testing-library/user-event/dist/type';

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function reducer(state, action) {
  //상태변화 코드
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId
      ? {
        ...it,
        isDone: !it.isDone,
        }
      : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

const mockTodo = [
  {
    id:0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id:1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id:2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];



function App() {

  // const idRef = useRef(3); //3
  // const [todo, setTodo] = useState(mockTodo);
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    // const newItem = {
    //   id: idRef.current,
    //   content,
    //   isDone: false,
    //   createDate: new Date().getTime(),
    idRef.current += 1;
    };
    // setTodo([newItem, ...todo]);
    // idRef.current += 1;
  

  const onUpdate = useCallback((targetId) => {
    // setTodo(
    //   todo.map((it) => it.id === targetId ? {...it, isDone: !it.isDone } : it)
    //);
    dispatch({
      type: "UPDATE",
      targetId,
    });
  },[]);

  const onDelete = useCallback((targetId) => {
    // setTodo(todo.filter((it)=> it.id!== targetId));
    dispatch({
      type: "DELETE",
      targetId,
    });
  },[]);

  const memorizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memorizedDispatches}>
      <TodoEditor />
      <TodoList />
      </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App