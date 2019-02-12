const fileApi = require('../../Services/file-api');

/**
 * @param {path}
 * @return {Promise}
 */
async function getEmployeeLeaves(path) {
  try {

    const records = await _getEmpData(path);

    // Populate response by
    // 1. Retrieve records from file
    // 2. Mark total leaves to zero in case no leaves are taken by Employee
    // 3. Sort result alphabetical order by employee name.
    const empList = records
      .map((emp) => {
        return {
          name: emp.eName,
          total: emp.leaves ? emp.leaves.length : 0
        }
      })
      .sort((first, second) => first.name > second.name ? 1 : -1);
    return empList;

  } catch (err) {
    // Return error as friendly message, full error can also be logged to some Source at this step.
    return `<<Process Interrupted>> \r\n${err}`;
  }
}

/**
 * @param {path}
 * @return {Promise}
 */
async function _getEmpData(path) {
  const records = await _readData(path);

  // Throw error in case file doesn't has records to process
  _checkEmptyFile(records);

  // Populate result after
  // 1. Removing comments
  // 2. Removing duplicates in dates i.e. same date is found more than once for same employee 
  const result = records
    .filter((emp) => emp.indexOf('//'))
    .map((emp) => {
      const result = emp.split(' ');
      return {
        eName: result[0],
        leaves: [...new Set(result.slice(1, result.length))]
      }
    });
  return result;
}

/**
 * @param {path}
 * @return {Promise}
 */
async function _readData(path) {
  const result = await fileApi.readFileContents(path);
  return result;
}

/**
 * @param {Array}
 * @return {Promise}
 */
function _checkEmptyFile(r) {
  // Throw Exceptions in case of
  // 1. No File
  // 2. No records in file i.e length is zero
  // 3. Only spaces are found in file
  if (!r || r.length === 0 || (r.length === 1 && !r[0].trim())) {
    throw new Error('No Records Found!!');
  }
}

module.exports = { getEmployeeLeaves };