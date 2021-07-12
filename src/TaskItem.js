import React from 'react';

function TaskItem(props) {
  return (
    <div
      className="taskContainer"
      draggable
      onDragStart={(evt) =>
        props.dragStartHandler(evt, props.cardIndex, props.tileIndex)
      }
    >
      {props.task}
    </div>
  );
}

export default TaskItem;
