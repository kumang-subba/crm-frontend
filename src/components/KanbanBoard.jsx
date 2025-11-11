import { createContext, useContext, useState } from "react";
import Board from "./Board";
import axiosInstance from "../lib/axiosInstance";
import { useNotificationContext } from "../providers/NotificationProvider";
import KanbanHeading from "./KanbanHeading";

const KanbanContext = createContext();

export const useKanbanContext = () => useContext(KanbanContext);

export const KanbanBoard = ({ title, data, boardId, isDemo = false }) => {
  const [kanBanData, setKanbanData] = useState(data);
  const { addNotification } = useNotificationContext();

  const handleAddColumn = async (payload) => {
    try {
      let newCol;
      if (!isDemo) {
        const { data } = await axiosInstance.post("/column/create", { ...payload, boardId });
        newCol = data.data;
      } else {
        newCol = { ...payload, leads: [], id: crypto.randomUUID() };
      }
      setKanbanData((prev) => [...prev, newCol]);
      addNotification("Column added successfully", "success");
    } catch (error) {
      console.error(error);
      addNotification("Could not add column at this moment. Please try again", "error");
    }
  };

  const handleDeleteColumn = async (id) => {
    try {
      if (!isDemo) {
        await axiosInstance.delete(`/column/${id}`);
      }
      setKanbanData((prev) => prev.filter((col) => col.id !== id));
      addNotification("Column has been successfully deleted", "success");
    } catch (error) {
      console.error(error);
      addNotification("Could not delete column at this moment. Please try again", "error");
    }
  };

  const handleUpdateColumn = (data, columnId) => {
    const updatedKanBanData = [...kanBanData];
    const colToEdit = updatedKanBanData.find((col) => col.id === columnId);
    colToEdit.name = data.name;
    colToEdit.description = data.description;
    setKanbanData(updatedKanBanData);
    if (!isDemo) {
      axiosInstance
        .put(`/column/${columnId}`, data)
        .then(() => addNotification("Column updated successfully", "success"))
        .catch(() => addNotification("There was an error in the server. Please try again", "error"));
    }
  };

  const handleDrag = (e) => {
    const columns = getColumns();
    clearColumnHighlights(columns);
    const currColumn = getColumnInCursor(e, columns);
    highlightColumn(currColumn);
    clearIndicatorHighlights();
    if (currColumn) {
      const currColIndicators = getCurrColIndicators(currColumn);
      highlightIndicator(e, currColIndicators);
    }
  };

  const handleDeleteCard = async (cardId, columnId) => {
    if (!isDemo) {
      await axiosInstance.delete(`/column/${columnId}/lead/${cardId}`);
    }
    setKanbanData((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          let isRemoved = false;
          const filteredLeads = [];
          for (let i = 0; i < col.leads.length; i++) {
            if (isRemoved) {
              let ordereredCard = { ...col.leads[i], order: col.leads[i].order - 1 };
              filteredLeads.push(ordereredCard);
              continue;
            }
            if (col.leads[i].id == cardId) {
              isRemoved = true;
              continue;
            }
            filteredLeads.push(col.leads[i]);
          }
          return {
            ...col,
            leads: filteredLeads,
          };
        }
        return col;
      }),
    );
  };

  const handleDragEnd = (e, card) => {
    const columns = getColumns();
    const currHoverColumn = getColumnInCursor(e, columns);
    highlightColumn(currHoverColumn);
    if (!currHoverColumn) {
      return false;
    }
    const targetColumnId = currHoverColumn.dataset.columnid;
    const currentColumnId = card.column;
    const currColIndicators = getCurrColIndicators(currHoverColumn);
    highlightIndicator(e, currColIndicators);
    const cardId = card.id;
    const { element } = getNearestIndicator(e, currColIndicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let updatedKanbanData = [...kanBanData];
      let removed = false;
      let inserted = false;
      let targetOrder;
      for (let i = 0; i < updatedKanbanData.length; i++) {
        if (removed && inserted) {
          break;
        }
        if (updatedKanbanData[i].id !== card.column && updatedKanbanData[i].id !== targetColumnId) {
          continue;
        }
        let updatedLeads = [...updatedKanbanData[i].leads];
        if (updatedKanbanData[i].id === card.column) {
          let leadFound = false;
          for (let lind = 0; lind < updatedLeads.length; lind++) {
            if (leadFound) {
              updatedLeads[lind].order -= 1;
              let temp = updatedLeads[lind];
              updatedLeads[lind] = updatedLeads[lind - 1];
              updatedLeads[lind - 1] = temp;
              continue;
            }
            if (updatedLeads[lind].id === card.id) {
              leadFound = true;
            }
          }
          updatedLeads.pop();
          removed = true;
        }
        if (updatedKanbanData[i].id === targetColumnId) {
          if (before === "-1") {
            targetOrder = updatedLeads.length;
            updatedLeads.push({ ...card, order: targetOrder, column: targetColumnId });
          } else {
            let targetInd;
            for (let lind = 0; lind < updatedLeads.length; lind++) {
              if (targetOrder) {
                updatedLeads[lind].order += 1;
                continue;
              }
              if (updatedLeads[lind].id === before) {
                targetInd = lind;
                targetOrder = updatedLeads[lind].order;
                updatedLeads[lind].order += 1;
              }
            }
            updatedLeads.splice(targetInd, 0, { ...card, order: targetOrder, column: targetColumnId });
          }
        }
        updatedKanbanData[i].leads = updatedLeads;
      }
      setKanbanData(updatedKanbanData);
      if (!isDemo) {
        axiosInstance.put(`/column/${currentColumnId}/lead/${card.id}/move`, { targetColumnId, targetOrder });
      }
    }
    clearColumnHighlights(columns);
    clearIndicatorHighlights();
  };

  const handleAddCard = async (card, columnId) => {
    const column = kanBanData.find((col) => col.id === columnId);
    if (!column) return;
    const payload = {
      name: card.name,
      order: column.leads.length,
    };
    let newLead;
    if (isDemo) {
      newLead = { ...payload, id: crypto.randomUUID() };
    } else {
      const { data } = await axiosInstance.post(`/column/${columnId}/lead/create`, payload);
      newLead = data.data;
    }
    setKanbanData((prev) =>
      prev.map((col) => {
        if (col.id == columnId) {
          return { ...col, leads: [...col.leads, newLead] };
        }
        return col;
      }),
    );
  };

  const clearIndicatorHighlights = () => {
    const indicators = getAllIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e, indicators) => {
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );
    return el;
  };

  const clearColumnHighlights = (columns) => {
    columns.forEach((el) => {
      el.classList.remove("bg-slate-400/80");
      el.classList.add("bg-stone-300");
    });
  };

  const highlightColumn = (col) => {
    if (col) {
      col.classList.add("bg-slate-400/80");
      col.classList.remove("bg-stone-300");
    }
  };

  const getColumnInCursor = (e, columns) => {
    let targetCol;
    for (const col of columns) {
      const el = col.getBoundingClientRect();
      if (
        e.clientX >= el.left &&
        e.clientX <= el.left + el.width &&
        e.clientY >= el.top &&
        e.clientY <= el.top + el.height
      ) {
        targetCol = col;
      }
    }
    return targetCol;
  };

  const getAllIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-indicator="${title}"]`));
  };

  const getCurrColIndicators = (colEl) => {
    return Array.from(colEl.querySelectorAll(`[data-indicator="${title}"]`));
  };

  const getColumns = () => {
    return Array.from(document.querySelectorAll(`[data-column="${title}"]`));
  };

  return (
    <KanbanContext.Provider
      value={{
        title,
        handleDrag,
        handleDragEnd,
        handleAddCard,
        kanBanData,
        handleDeleteCard,
        handleUpdateColumn,
        boardId,
        handleAddColumn,
        handleDeleteColumn,
      }}
    >
      <div className="w-full text-black rounded-md px-10 my-10">
        <KanbanHeading />
        <Board />
      </div>
    </KanbanContext.Provider>
  );
};
