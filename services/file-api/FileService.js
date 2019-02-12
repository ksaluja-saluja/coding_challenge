const fs = require('fs');
const util = require('util');

/**
 * @class FileService
 */
class FileService {

  constructor(){
    this.readFile = util.promisify(fs.readFile);
  }

  /**
 * @param {path}
 * @return {Promise}
 */
  async readFileContents(path) {
    if (fs.existsSync(path)) {
      const file = await this.readFile(path);
      const list = file.toString().split('\r\n');

      return list;

    } else {
      // Throw error in case file not found on provided input path.
      throw new Error('File Not Found!!');
    }
  }

}

module.exports = FileService;