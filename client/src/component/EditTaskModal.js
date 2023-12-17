import { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

const EditTaskModal = ({ isVisible, closeEditTaskModal, selectedTask }) => {
  const socket = useSocket();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskTitleError, setShowTaskTitleError] = useState(false);

  const handleTaskTitleChange = (event) => {
    setNewTaskTitle(event.target.value);
    setShowTaskTitleError(false);
  };

  const handleCloseModal = () => {
    closeEditTaskModal();
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.length) {
      setShowTaskTitleError(true);
      return;
    }

    socket?.emit("update_task", {
      id: selectedTask._id,
      updatedTask: { title: newTaskTitle, lastUpdatedAt: Date.now() },
    });

    closeEditTaskModal();
  };

  useEffect(() => {
    if (selectedTask?.title) {
      setNewTaskTitle(selectedTask.title);
    }
  }, [selectedTask?.title]);

  if (!isVisible) return <></>;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-medium text-gray-800">Edit Task</h2>
          <input
            className="mt-2 w-full p-2 border rounded"
            value={newTaskTitle}
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
              onClick={handleSaveTask}
            >
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
