const useDeleteItem = (setData) => {
  const deleteItem = (id) => {
    setData((prevTodoData) => prevTodoData.filter((el) => el.id !== id));
  };

  const onClear = () => {
    setData((prevTodoData) => prevTodoData.filter((item) => !item.completed));
  };

  return { deleteItem, onClear };
};

export default useDeleteItem;
