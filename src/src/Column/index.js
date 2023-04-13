import React from "react";
import { Task } from "../Task/index";
import styles from "./styles.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={styles.column}
        >
          <div {...provided.dragHandleProps} className={styles.column__title}>
            {column.title}
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.column__list}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
