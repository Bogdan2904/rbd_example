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

    if (type === "section") {
      let newSections = Array.from(state.sections);
      let orderedSection = { ...newSections[source.index] };
      newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, orderedSection);
      setState({
        ...state,
        sections: newSections,
      });
      return;
    }

    const start = state.sections.find((item) => item.id === source.droppableId);
    const finish = state.sections.find(
      (item) => item.id === destination.droppableId
    );

    if (start === finish) {
      const newItems = Array.from(start.items);
      const orderedItem = { ...newItems[source.index] };
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, orderedItem);

      const newSection = {
        ...start,
        items: newItems,
      };

      const sectionIndex = state.sections.findIndex(
        (item) => item.id === start.id
      );

      let newSections = [...state.sections];
      newSections[sectionIndex] = newSection;

      setState({
        ...state,
        sections: newSections,
      });

      return;
    }

    let startItems = Array.from(start.items);
    let orderedItem = { ...startItems[source.index] };
    startItems.splice(source.index, 1);

    let finishItems = Array.from(finish.items);
    finishItems.splice(destination.index, 0, orderedItem);

    const startsectionIndex = state.sections.findIndex(
      (item) => item.id === start.id
    );
    const finishsectionIndex = state.sections.findIndex(
      (item) => item.id === finish.id
    );

    setState((prev) => {
      let state = { ...prev };
      prev.sections[startsectionIndex].items = startItems;
      prev.sections[finishsectionIndex].items = finishItems;
      return state;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" type="section">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.mainContainer}
          >
            {state.sections.map((column, index) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={column.items}
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
