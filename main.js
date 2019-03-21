const leaveController = require('./Components/controllers/LeaveController');

// changes 123
const result = leaveController.getEmployeeLeaves("d:\\kamal\\data.txt");
result.then((data) => console.log(data));