// import { useState } from "react";
// import TodoItem from "./TodoItem";
// import "./TodoList.css";

// const TodoList = ({ todo, onUpdate, onDelete }) => {
//     const [search, setSearch] = useState("");
//     const onChangeSearch = (e) => {
//         setSearch(e.target.value);
//     };
//     const getSearchResult = () => {
//         return search === ""
//         ? todo
//         : todo.filter((it) => 
//             it.content.toLowerCase().includes(search.toLowerCase())
//         );
//     };

//     return (
//         <div className="TodoList">
//             <h4>Todo List 🌱</h4>
//             <input
//             value={search}
//             onChange={onChangeSearch} 
//             className="searchbar" 
//             placeholder="검색어를 입력하세요" 
//             />
//             <input
//             div className="check"
//             type="checkbox"/>완료된 할 일 숨기기
            
//             <div className="list_wrapper">
//                 {getSearchResult().map((it) => (
//                 <TodoItem 
//                     key={it.id} 
//                     {...it} 
//                     onUpdate={onUpdate} 
//                     onDelete={onDelete} />
//                 ))}
//             </div>
//         </div>
//     );
// };
// export default TodoList;























import { useContext, useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { TodoContext } from "../App";
import { TodoStateContext } from "../App";

const TodoList = () => {
    const todo  = useContext(TodoStateContext);
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    
    //주석풀때 여기부터 // const getSearchResult = () => {
    //     return search === ""
    //     ? todo
    //     : todo.filter((it) => 
    //         it.content.toLowerCase().includes(search.toLowerCase())
    //     );
    //여기까지는 여전히 주석처리 해야함 // }; 

    const [Done, setDone] = useState(false);
    const onChangeDone = (e) => {
        setDone(e.target.checked);
    };

    const getSearchResult = () => {
        const getSearch = search === ""
        ? todo
        : todo.filter((it) => 
            it.content.toLowerCase().includes(search.toLowerCase())
        );

        return Done
        ? getSearch.filter((it) => !it.isDone)
        : getSearch;
    };

    const analyzeTodo = useMemo(() => {
        //console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    } ,[todo]);
    const { totalCount, doneCount, notDoneCount }= analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
            </div>
            <input
            value={search}
            onChange={onChangeSearch} 
            className="searchbar" 
            placeholder="검색어를 입력하세요" 
            />
            <input
            div className="check"
            type="checkbox"
            checked={Done}
            onChange={onChangeDone}
            />완료된 할 일 숨기기
            
            
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                <TodoItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

TodoList.defaultProps = {
    todo: [],
};
export default TodoList;

