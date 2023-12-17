import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NewTaskModal from "./NewTaskModal";
import EditTaskModal from "./EditTaskModal";

import { useSocket } from "../hooks/useSocket";
import { updateTasksList, deleteTask } from "../redux/slices/tasksSlice";
import TaskCard from "./TaskCard";
import { fetchAllTasks } from "../services";
import Spinner from "./Spinner";

const Task = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openNewTaskModal = () => setShowNewTaskModal(true);
  const closeNewTaskModal = () => setShowNewTaskModal(false);

  const { loading: tasksLoading, list: tasksList } = useSelector(
    (s) => s.tasks
  );

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    socket?.emit("delete_task", id);
  };

  const closeEditTaskModal = () => {
    setSelectedTask(null);
    setShowEditTaskModal(false);
  };

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  useEffect(() => {
    socket?.on("tasks", (data) => {
      dispatch(updateTasksList(data));
    });
  }, [socket]);

  if (tasksLoading) {
    return <Spinner />;
  }

  return (
    <main className="m-4">
      <button
        className="bg-transparent text-blue-700 font-semibold py-2 px-4 border rounded"
        onClick={openNewTaskModal}
      >
        Add New Task
      </button>

      <section className="mt-6 flex flex-wrap gap-2">
        {tasksList.length > 0 ? (
          tasksList.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <h1 className="w-full text-lg md:text-2xl text-center text-black relative top-[200px]">
            No task has been added. Please proceed to create a new task.
          </h1>
        )}
      </section>

      <NewTaskModal
        isVisible={showNewTaskModal}
        closeNewTaskModal={closeNewTaskModal}
      />

      <EditTaskModal
        isVisible={showEditTaskModal}
        closeEditTaskModal={closeEditTaskModal}
        selectedTask={selectedTask}
      />
    </main>
  );
};

export default Task;
