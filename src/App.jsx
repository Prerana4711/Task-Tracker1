import Navbar from "./component/Navbar.jsx";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { HiOutlineSave } from "react-icons/hi";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetolocalstorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));//bcs localstorage will take values  as string
  };

  const toggledFinished = (e) => {
   
    setshowFinished(!showFinished);
  
  };
  const handleEdit = (e, id) => {
    let edit = todos.filter((i) => i.id === id);
    setTodo(edit[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetolocalstorage();
  };

  const handleDelete = (id) => {
    let a = confirm("Are you sure you want to delete this task");
    if (a) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      savetolocalstorage();
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savetolocalstorage();
  };

  const handleonChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    console.log(e, e.target);
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetolocalstorage();
  };
  return (
    <>
     <Navbar/>
     
      <div className=" md:cotainer mx-auto mt-2 home  w-screen rounded-xl    h-screen">
        <div className="addTodo items-center">
          <h2 className="text-2xl  font-extrabold underline hover:text-3xl transition-all duration-500  my-2 ml-4 p-4 text-violet-950">Add Your Tasks Here</h2>
          <input 
            type="text"
            onChange={handleonChange}
            
            value={todo}
            className="cursor-pointer w-2/4 ml-8 b text-xl  rounded-md p-1"
            placeholder="What is your task today?"
          />
          <button
          disabled={todo.length<1}
            className= " p-2 px-6 ml-6   bg-violet-900 text-white disabled:bg-violet-900 hover:bg-blue-700 rounded-lg "
            onClick={handleAdd}
          >
            <HiOutlineSave  className="text-xl"/>
          </button>
        </div>
        <input 
        className=" ml-8 mt-5 text-2xl"
          type="checkbox"
          checked={showFinished}
          onChange={toggledFinished}
          />
        {" "}
        <span className="text-xl text-violet-950 underline font-bold hover:text-2xl transition-all duration-500">Show Finished</span>
        <h2 className="text-2xl text-violet-950 ml-9  mt-4 font-bold">Your Todos 👇🏻</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="mt-24 text-xl justify-self-center underline text-violet-100 ml-8  font-extrabold">No Tasks Remains To Perform 🙂</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={" item md: todo pl-2 flex w-1/2 justify-between  my-2 ml-8 text-xl  text-white  border-2 border-violet-400 shadow-2xl rounded-2xl font-bold bg-slate-400"}
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      type="checkbox"
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      id=""
                     
                    />
                    <div className={item.isCompleted ? "line-through" : ""} >
                      <div >{item.todo}</div>
                    </div>
                  </div>
                  <div className="buttons  flex flex-wrap  ">
                    <button
                      className=" border-4 edit my-1 text-white hover:bg-blue-700 rounded-md pl-3 mx-1 bg-violet-900"
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="edit bg-violet-900 my-1 text-white border-4 border-violet-300 hover:bg-blue-700 rounded-md pl-3  mx-1"
                      onClick={(e) => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
