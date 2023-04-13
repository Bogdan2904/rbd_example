import React from "react";
import styles from "./styles.module.scss";
import { Draggable } from "react-beautiful-dnd";

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.task}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
