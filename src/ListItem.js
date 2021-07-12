import React, { useState } from 'react';
import TaskItem from './TaskItem';

function ListItem(props) {
  const handleNameChange = (evt) => {
    const newObj = { ...props.task };
    newObj.name = evt.target.value;
    props.handleListChange(newObj, props.index);
  };

  const [editNameFlag, setFlag] = useState(false);
  const [addTaskFlag, setAddTaskFlagFlag] = useState(false);
  const [cardName, setCardName] = useState('');

  const dragStartHandler = (evt, cardIndex, tileIndex) => {
    var testjson = { cardIndex: cardIndex, tileIndex: tileIndex };
    evt.dataTransfer.setData('text/plain', JSON.stringify(testjson));
    // evt.dataTransfer.setData('cardIndex', cardIndex);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };
  const editHandler = () => {
    setFlag(true);
  };

  const onDrop = (evt, currentIndex) => {
    evt.stopPropagation();
    const data = evt.dataTransfer.getData('text/plain');
    const obj = JSON.parse(data);
    const sourceCardIndex = obj.cardIndex;
    const tileIndex = obj.tileIndex;
    const text = obj.text;
    if (tileIndex === props.index) {
      const newObj = { ...props.task };
      const tempTaskList = [...newObj.taskList];
      const temp = tempTaskList[sourceCardIndex];
      tempTaskList[sourceCardIndex] = tempTaskList[currentIndex];
      tempTaskList[currentIndex] = temp;
      newObj.taskList = tempTaskList;
      props.handleListChange(newObj, props.index);
    }
    else {
        console.log('out')
        const cardList =[...props.listOfTasks];
        const targetTaskList = cardList[props.index].taskList;
        targetTaskList.push(text);
        const newObj = { ...props.task };
        newObj.taskList = targetTaskList;
    }
  };

  const saveNameHandler = () => {
    setFlag(false);
  };

  const addTaskHandler = () => {
    const newObj = { ...props.task };
    newObj.taskList.push(cardName);
    props.handleListChange(newObj, props.index);
    setCardName('');
    setAddTaskFlagFlag(false);
  };

  return (
    <div
      className="listContainer"
      draggable
      onDragStart={(evt) => props.dragStartHandler(evt, props.index)}
    >
      <input
        placeholder="Milestone Name"
        onChange={handleNameChange}
        disabled={!editNameFlag}
      ></input>
      <button onClick={saveNameHandler}>Save Milteston Name</button>
      <button onClick={editHandler}>Edit</button>
      <h5>{props.task.name}</h5>
      {props.task.taskList.map((task, index) => (
        <div onDragOver={onDragOver} onDrop={(evt) => onDrop(evt, index)}>
          <TaskItem
            task={task}
            cardIndex={index}
            tileIndex={props.index}
            dragStartHandler={dragStartHandler}
          />
        </div>
      ))}
      <button
        onClick={() => setAddTaskFlagFlag((prevFlag) => !prevFlag)}
        disabled={addTaskFlag}
      >
        Add a Card
      </button>
      {addTaskFlag && (
        <>
          <input
            placeholder="Add a Card"
            onChange={(evt) => setCardName(evt.target.value)}
          ></input>
          <button onClick={addTaskHandler}>Save Card</button>
        </>
      )}
    </div>
  );
}

export default ListItem;
