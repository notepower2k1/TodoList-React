import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import {useState,useCallback,useEffect} from "react";
import {v4} from 'uuid';
const TODO_APP_STORAGE_KEY = 'TODO_APP';
function App() {
  const [todoList,setTodoList] = useState([]); //array
  const [textInput,setTextInput] = useState(""); //array

  useEffect(()=>{
    const storagedTodoList = window.localStorage.getItem(TODO_APP_STORAGE_KEY)
    if(storagedTodoList!=null ){
      setTodoList(JSON.parse(storagedTodoList))
    }
  },[]);

  useEffect(() =>{
    if (todoList.length > 0) window.localStorage.setItem(TODO_APP_STORAGE_KEY,JSON.stringify(todoList));
  },[todoList]);


  const onTextInputChange = useCallback((e) =>{
    setTextInput(e.target.value);
  },[]);

  const onAddButtonClick = useCallback((e) =>{
    //them textInput vao ds todoList
   
    setTodoList([{id:v4(),name:textInput,isdone:0}, ...todoList ]);
    setTextInput("");
  },[textInput,todoList]);


  const onCheckBtnClick = useCallback((id) =>{
// todo.id === id ? {...todo ,isdone:1}:todo 
    setTodoList(prevState => prevState.map((todo) => {
      if (todo.id === id){
        if (todo.isdone === 0){
          return {...todo ,isdone:1}
        }
        if (todo.isdone === 1){
          return {...todo ,isdone:0}
        }
      }
      return todo;
     
    }
      ))
      ;
  },[]);

  const onDeleteBtnClick = useCallback((id) =>{
    // todo.id === id ? {...todo ,isdone:1}:todo 
        const storagedTodoList = window.localStorage.getItem(TODO_APP_STORAGE_KEY)

        var sanitized = '[' + storagedTodoList.replace(/}{/g, '},{') + ']';
        var res = JSON.parse(sanitized);
        var test =  res.pop()    
        const temp = test.find(item => item.id === id);
        test = test.filter(function(item) {
          return item !== temp
        })

        setTodoList(test)
      
        
          
      },[]);
      
  return( 
    <>   
    <h3>Danh sách cần làm</h3>
    <Textfield
     name="add-todo" 
     placeholder="Thêm việc cần làm..." 
    elemAfterInput={
      <Button isDisabled={!textInput} appearance='primary' onClick={onAddButtonClick} >Thêm</Button>
    } 
    value = {textInput}
    onChange= {onTextInputChange}
    ></Textfield>
    <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} onDeleteBtnClick={onDeleteBtnClick}/>
    </>
  )
  
}

export default App;
