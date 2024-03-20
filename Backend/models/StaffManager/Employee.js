// .Backend/models/StaffManager/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  jobrole: {
    type: String,
  },
  nic: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  accno: {
    type: Number,
  },
  bankname: {
    type: String,
  },
  qualifications: {
    type: String,
  },
  joineddate: {
    type: String,
  },
  salary: {
    type: Number,
  },

  allowance: {
    type: Number,
  },

  epfe: {
    type: Number,
  },

  epfr: {
    type: Number,
  },

  etf: {
    type: Number,
  },

  netsalary: {
    type: Number,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
