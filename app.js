document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.querySelector('input');
  const taskList = document.querySelector('.task-list');
  const numbersDisplay = document.getElementById('numbers');
  const progressBar = document.getElementById('Progress'); // Correct ID

  let tasks = [];

  // Function to render tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');
      if (task.completed) {
        taskItem.classList.add('completed');
      }
      taskItem.textContent = task.text;
      taskItem.addEventListener('click', () => toggleTask(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', e => {
        e.stopPropagation();
        deleteTask(index);
      });

      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    });
    updateStats(); // Update stats and progress bar after rendering tasks
  }

  // Function to update stats and progress bar
  function updateStats() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    // Debugging logs
    console.log('Completed tasks:', completedTasks);
    console.log('Total tasks:', totalTasks);

    numbersDisplay.textContent = `${completedTasks} / ${totalTasks}`;
    const progressPercent =
      totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercent}%`; // Update progress bar width
  }

  // Add task function
  function addTask(text) {
    tasks.push({ text, completed: false });
    renderTasks();
  }

  // Delete task function
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  // Toggle task completion
  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  // Handle form submission
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  });

  // Initial render
  renderTasks();
});
