const TaskCard = ({ task, handleEditTask, handleDeleteTask }) => {
  const lastUpdatedAt = new Date(task.lastUpdatedAt).toLocaleString();

  return (
    <div className="w-full md:w-[366px] mb-4 border-2 border-black-600 p-4 flex flex-col justify-between ">
      <h2 className="text-lg font-medium text-gray-800">{task.title}</h2>
      <div className="flex justify-between items-end mt-2">
        <div className="flex flex-col">
          <p className="text-sm md:text-md text-gray-500">
            - {task.author.name}
          </p>
          <p className="text-sm text-gray-500">Updated At: </p>
          <p className="text-sm text-gray-500">{lastUpdatedAt}</p>
        </div>

        <div className="flex">
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 mr-2"
            onClick={() => handleEditTask(task)}
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            onClick={() => handleDeleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
