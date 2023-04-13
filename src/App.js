import { useState } from "react";
import initialData from "./src/contants";
import { Column } from "./src/Column/index";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./styles.module.scss";

function App() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      let newColumns = Array.from(state.columns);
      let orderedColumn = { ...newColumns[source.index] };
      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, orderedColumn);
      setState({
        ...state,
        columns: newColumns,
      });
      return;
    }

    const start = state.columns.find((item) => item.id === source.droppableId);
    const finish = state.columns.find(
      (item) => item.id === destination.droppableId
    );

    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      const orderedTask = { ...newTasks[source.index] };
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, orderedTask);

      const newColumn = {
        ...start,
        tasks: newTasks,
      };

      const columnIndex = state.columns.findIndex(
        (item) => item.id === start.id
      );

      let newColumns = [...state.columns];
      newColumns[columnIndex] = newColumn;

      setState({
        ...state,
        columns: newColumns,
      });

      return;
    }

    let startTasks = Array.from(start.tasks);
    let orderedTask = { ...startTasks[source.index] };
    startTasks.splice(source.index, 1);

    let finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, orderedTask);

    const startColumnIndex = state.columns.findIndex(
      (item) => item.id === start.id
    );
    const finishColumnIndex = state.columns.findIndex(
      (item) => item.id === finish.id
    );

    setState((prev) => {
      let state = { ...prev };
      prev.columns[startColumnIndex].tasks = startTasks;
      prev.columns[finishColumnIndex].tasks = finishTasks;
      return state;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.mainContainer}
          >
            {state.columns.map((column, index) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={column.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
