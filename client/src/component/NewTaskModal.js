import { useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";

const NewTaskModal = ({ isVisible, closeNewTaskModal }) => {
  const socket = useSocket();

  const [taskTitle, setTaskTitle] = useState("");
  const [showTaskTitleError, setShowTaskTitleError] = useState(false);

  const loggedInUserName = useSelector((s) => s.user.name);
  const loggedInUserId = useSelector((s) => s.user._id);

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
    setShowTaskTitleError(false);
  };

  const handleCreateTask = () => {
    if (!taskTitle.length) {
      setShowTaskTitleError(true);
      return;
    }

    socket?.emit("create_task", {
      title: taskTitle,
      author: {
        name: loggedInUserName,
        id: loggedInUserId,
      },
    });

    console.log(`Creating task: ${taskTitle}`);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setTaskTitle("");
    closeNewTaskModal();
  };

  if (!isVisible) return <></>;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-medium text-gray-800">New Task</h2>
          <input
            className="mt-2 w-full p-2 border rounded"
            value={taskTitle}
            onChange={handleTaskTitleChange}
            placeholder="Task title"
          />
          {showTaskTitleError && (
            <p className="text-red-600">Please enter task title.</p>
          )}
          <div className="flex justify-end mt-3">
            <button
              className="mr-2 w-full p-2 text-white bg-red-500 rounded-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              className="w-full p-2 text-white bg-blue-500 rounded-md"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
