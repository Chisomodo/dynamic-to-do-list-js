// Event listener to run the code once the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load any tasks from Local Storage when the page loads
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Event listener for adding tasks
    addButton.addEventListener('click', () => {
        addTask(taskInput.value); // Add the task entered in the input field
    });
    
    // Event listener for pressing the 'Enter' key to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value); // Add task if Enter is pressed
        }
    });
    
    // Function to add a task
    function addTask(taskText, save = true) {
        // Ensure the input is not empty
        if (taskText.trim() === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new li element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a Remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Remove the task when the Remove button is clicked
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove the task from Local Storage
        });

        // Append the Remove button to the li element
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // If save is true, save the task to Local Storage
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save tasks to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText); // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array to Local Storage
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update Local Storage with the new array
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again
    }
});
