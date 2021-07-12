import React, { useState } from 'react';
import './App.css';
import ListItem from './ListItem';

function List(props) {
  const dragStartHandler = (evt, sourceIndex) => {
    evt.dataTransfer.setData('sourceIndex', sourceIndex);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (evt, currentIndex) => {
    let sourceIndex = evt.dataTransfer.getData('sourceIndex');
    const tempList = [...props.listOfTasks];
    const temp = tempList[currentIndex];
    tempList[currentIndex] = tempList[sourceIndex];
    tempList[sourceIndex] = temp;
    props.handleListSwap(tempList);
  };

  return props.listOfTasks.map((task, index) => (
    <div draggable onDragOver={onDragOver} onDrop={(evt) => onDrop(evt, index)}>
      <ListItem
        task={task}
        index={index}
        handleListChange={props.handleListChange}
        dragStartHandler={dragStartHandler}
        listOfTasks={props.listOfTasks}
      />
    </div>
  ));
}

export default List;
