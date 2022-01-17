import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter, Route} from 'react-router-dom/cjs/react-router-dom.min';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([
    {
    id: '1',
    title: 'Estudar Programação',
    completed: false,
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: true,
    },
  ]);

  useEffect(()=> {
    const fetTasks = async() => {
    const {data} = await axios.get(
      "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );
      setTasks(data);
    };
  fetTasks();
    },[]);
  

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) return {...task, completed: !task.completed}
      return task;
    })
    setTasks(newTasks)
  }

  const  handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]

    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) =>{
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks);
  }

  return (
  <BrowserRouter>
    <div className="container">
    <Header />
    <Route component = { () => (
      <>
           <AddTask handleTaskAddition={handleTaskAddition} />
             <Tasks 
               tasks={tasks}  
               handleTaskClick={handleTaskClick} 
               handleTaskDeletion={handleTaskDeletion}
             />
          </>
    )}  path="/" exact />
      <Route path="/:taskTitle" exact component={TaskDetails}/>
    </div>;
  </BrowserRouter>
  );
};
export default App;