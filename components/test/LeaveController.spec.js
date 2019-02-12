const leaveController = require('../controllers/LeaveController');
const fileService = require('../../Services/file-api');

describe("leave controller test cases", () => {
  let rawData;
  beforeEach(() => {
    rawData = [
      'Ben 20180203 20160302 20170405',
      'Adil 20180203 20160402 20170405',
      'Sam 20180203 20160102 20170405',
      'Rocky 20180203 20130302 20170405',
      'Will 20180102'
    ];
  })

  it("should return list of emp name and total leaves - sort by name", async () => {
    const empList = [
      { name: 'Adil', total: 3 },
      { name: 'Ben', total: 3 },
      { name: 'Rocky', total: 3 },
      { name: 'Sam', total: 3 },
      { name: 'Will', total: 1 }
    ];
    
    spyOn(fileService, 'readFileContents').andReturn(rawData);

    const result = await leaveController.getEmployeeLeaves();
    expect(result).toEqual(empList);

  })

  it("should ignore comments and list of emp name and total leaves", async () => {
    rawData.push('// this is comment');
    
    spyOn(fileService, 'readFileContents').andReturn(rawData);
    
    const result = await leaveController.getEmployeeLeaves();
    expect(result.length).toBe(rawData.length - 1);
  })

  it("should remove duplicate dates in total leaves", async () => {
    rawData.push('Adam 20180202 20180202 20180202 20180204')
    
    spyOn(fileService, 'readFileContents').andReturn(rawData);
    
    const empList = [
      { name: 'Adam', total: 2 },
      { name: 'Adil', total: 3 },
      { name: 'Ben', total: 3 },
      { name: 'Rocky', total: 3 },
      { name: 'Sam', total: 3 },
      { name: 'Will', total: 1 }
    ];

    const result = await leaveController.getEmployeeLeaves();
    expect(result).toEqual(empList);
  })

  it("should throw error if records are not found - empty array", async () => {
    const data = [''];
    
    spyOn(fileService, 'readFileContents').andReturn(data);

    const result = await leaveController.getEmployeeLeaves();
    expect(result).toEqual(new Error());
  })

  it("should throw error if records are not found - only spaces", async () => {
    const data = ['      '];
    
    spyOn(fileService, 'readFileContents').andReturn(data);

    const result = await leaveController.getEmployeeLeaves();
    expect(result).toEqual(new Error());
  })

  it("should throw error if records are not found - undefined", async () => {
    spyOn(fileService, 'readFileContents').andReturn(undefined);

    const result = await leaveController.getEmployeeLeaves();
    expect(result).toEqual(new Error());
  })
})