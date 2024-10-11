import TaskModel from "../Models/TaskModel.js";


// Addtask
const Addtask = async (req, res) => {
    try {
        const { title, description, dueDate, status, createdBy, assignedmanager, updatedby } = req.body;


        // Validate title
        if (!title) {
            return res.json({ success: false, Message: 'Title field is required' });
        }

        // Validate description
        if (!description) {
            return res.json({ success: false, Message: 'description field is required' });
        }

        // Validate dueDate
        if (!dueDate) {
            return res.json({ success: false, Message: 'dueDate field is required' });
        }

        // Validate status
        if (!status) {
            return res.json({ success: false, Message: 'status field is required' });
        }

        // Validate createdBy
        if (!createdBy) {
            return res.json({ success: false, Message: 'createdBy id is required' });
        }

        // Create new task
        const newTask = new TaskModel({
            title,
            description,
            dueDate,
            status,
            createdBy,
            assignedmanager,
            updatedby,
        });

        // Save user to database
        const task = await newTask.save();
        return res.json({ success: true, task });
    } catch (error) {
        console.log(error);
        res.json({ success: false, Message: 'Error occurred' });
    }
};

// Updatetask
const Updatetask = async (req, res) => {
    try {
        const { id } = req.params; // Get the task ID from the URL parameter
        const { title, description, dueDate, status, assignedmanager, updatedBy } = req.body; // Data to update

        // Find the task by ID and update it
        const task = await TaskModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                dueDate,
                status,
                assignedmanager,
                updatedBy,
            },
            { new: true } // This returns the updated task
        );

        // Check if the task was found
        if (!task) {
            return res.status(404).json({ success: false, Message: 'Task not found' });
        }

        // Return the updated task
        return res.status(200).json({ success: true, message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, Message: 'Error occurred while updating task' });
    }
};
// Deletetask
const Deletetask = async (req, res) => {
    try {
        const taskId = req.params.id; // Extract task ID from route parameters
        const userId = req.user._id;  // The logged-in user's ID (from middleware)

        // Find the task by its ID
        const task = await TaskModel.findById(taskId);

        // If the task doesn't exist, return 404
        if (!task) {
            return res.status(404).json({ success: false, Message: 'Task not found' });
        }

        // Ensure that the logged-in user is the creator of the task
        // if (task.createdBy.toString() !== userId.toString()) {
        //     return res.status(403).json({ success: false, Message: 'You are not authorized to delete this task' });
        // }

        // Delete the task
        await TaskModel.findByIdAndDelete(taskId);

        // Respond with a success message
        return res.status(200).json({ success: true, Message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, Message: 'Internal server error' });
    }
};
// Gettasks
const Gettasks = async (req, res) => {
    try {
        // Assuming you have a middleware that verifies the token and sets req.user
        const userId = req.user.id; // Get the logged-in user's ID
        console.log(userId)

        // Query to find tasks where the logged-in user is the creator
        const tasks = await TaskModel.find({ createdBy: userId });

        // If no tasks are found, return 404
        if (!tasks || tasks.length === 0) {
            return res.json({ success: false, message: 'No tasks found for this user' });
        }

        // Return the tasks created by the user
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const GetManagertasks = async (req, res) => {
    try {
        // Assuming you have a middleware that verifies the token and sets req.user
        const id = req.params.id; // Get the logged-in user's ID
        console.log(id)

        // Query to find tasks where the logged-in user is the creator
        const tasks = await TaskModel.find({ createdBy: id });


        // If no tasks are found, return 404
        if (!tasks || tasks.length === 0) {
            return res.json({ success: false, message: 'No tasks found for this user' });
        }

        // Delete the task
        await TaskModel.findByIdAndDelete(taskId);

        // Return the tasks created by the user
        return res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const GetUsertasksAndDlt = async (req, res) => {
    try {
        // Assuming you have a middleware that verifies the token and sets req.user
        const id = req.params.id; // Get the logged-in user's ID
        console.log(id)
        // Query to find tasks where the logged-in user is the creator
        const tasks = await TaskModel.find({ createdBy: id });
         // If no tasks are found, return 404
         if (!tasks || tasks.length === 0) {
            return res.json({ success: false, message: 'No tasks found for this user' });
        }
        // Check if the task exists and belongs to the logged-in user
         await TaskModel.deleteMany({ createdBy: id });


        // Return the tasks created by the user
        return res.json({ success: true, tasks, message: 'User tasks deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const GetAlltasks = async (req, res) => {
    try {

        // Query to find tasks where the logged-in user is the creator
        const tasks = await TaskModel.find({});

        // If no tasks are found, return 404
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ success: false, message: 'No tasks found for this user' });
        }

        // Return the tasks created by the user
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
export { Addtask, Updatetask, Deletetask, Gettasks, GetAlltasks, GetManagertasks, GetUsertasksAndDlt }