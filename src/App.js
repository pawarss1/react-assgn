import './App.css';
import React, { useState } from 'react';
import List from './List';

function App() {
  const [listOfTasks, setTasks] = useState([]);
  const addListHandler = () => {
    const newObj = {
      name: '',
      taskList: [],
    };
    const tempList = [...listOfTasks];
    tempList.push(newObj);
    setTasks(tempList);
  };
  const handleListChange = (newObj, index) => {
    const tempList = [...listOfTasks];
    tempList[index] = newObj;
    setTasks(tempList);
  };

  const handleListSwap = (newList) => {
    setTasks(newList);
  };
  return (
    <div className="App">
      <List
        listOfTasks={listOfTasks}
        handleListChange={handleListChange}
        handleListSwap={handleListSwap}
      />
      <button onClick={addListHandler}>Add another List</button>
    </div>
  );
}
export default App;
