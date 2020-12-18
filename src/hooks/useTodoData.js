import { useState } from 'react';

const useTodoData = () => {
  const [taskId, setTaskId] = useState(100);
  const [todoData, setTodoData] = useState([
    {
      id: 1,
      label: 'Drink Coffee',
      completed: false,
      editing: false,
      time: new Date(),
      minutesTimer: '01',
      secondsTimer: '30',
    },
    {
      id: 2,
      label: 'Drink Tee',
      completed: false,
      editing: false,
      time: new Date(),
      minutesTimer: '01',
      secondsTimer: '00',
    },
    {
      id: 3,
      label: 'Drink Milk',
      completed: false,
      editing: false,
      time: new Date(),
      minutesTimer: '00',
      secondsTimer: '30',
    },
  ]);

  const addItem = (text, minutes, seconds) => {
    const newTask = {
      id: taskId,
      label: text,
      completed: false,
      editing: false,
      time: new Date(),
      minutesTimer: minutes,
      secondsTimer: seconds,
    };
    setTodoData((prevTodoData) => [...prevTodoData, newTask]);

    setTaskId((prev) => prev + 1);
  };

  return { todoData, setTodoData, addItem };
};

export default useTodoData;
