const useEditingitem = (setData, data) => {
  const toggleItem = (arr, id, propName) => {
    return arr.map((el) => {
      if (el.id === id) {
        return { ...el, [propName]: !el[propName] };
      }
      return el;
    });
  };

  const onToggleEditing = (id) => {
    setData((prevTodoData) => toggleItem(prevTodoData, id, 'editing'));
  };

  const onToggleCompleted = (id) => {
    setData((prevTodoData) => toggleItem(prevTodoData, id, 'completed'));
  };

  const handleKeyDown = () => {
    const editingItem = data.find((item) => item.editing === true);
    if (typeof editingItem === 'object') {
      onToggleEditing(editingItem.id);
    }
  };

  const editItem = (id, text) => {
    setData((prevTodoData) => {
      const newArray = prevTodoData.map((el) => {
        if (el.id === id) {
          return { ...el, label: text, editing: !el.editing };
        }
        return el;
      });
      return newArray;
    });
  };

  return { onToggleCompleted, onToggleEditing, handleKeyDown, editItem };
};

export default useEditingitem;
