const leaveController = require('./Components/controllers/LeaveController');

const result = leaveController.getEmployeeLeaves("d:\\kamal\\data.txt");
result.then((data) => console.log(data));