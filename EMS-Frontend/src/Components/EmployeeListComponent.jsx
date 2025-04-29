import React,{useState} from "react";
import { useEffect } from "react";
import { deleteEmployee, employeesList } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const EmployeeListComponent = () => {


    // In order to hold the response of the REST API from back end we are using saveState(hook)
    // In order to use the states in functional components we will use hooks 


    const [employees,setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() =>{
      getAllEmployees();
    },[])

    function getAllEmployees(){
      employeesList().then((response) => {
        setEmployees(response.data);
     }).catch(error => {
         console.error(error);
 })
    }
    
  /*const dummyData = [
    {
      id: 1,
      firstName: "Bhargav",
      lastName: "Udutha",
      email: "bhargav@gmail.com",
    },
    {
      id: 2,
      firstName: "Bharath",
      lastName: "Udutha",
      email: "bharath@gmail.com",
    },
    {
      id: 3,
      firstName: "Ravi",
      lastName: "Udutha",
      email: "ravi@gmail.com",
    },
  ];*/

function addNewEmployee(){
  navigator('/add-employee')

}

function updateEmployee(id){
  navigator(`/update-employee/${id}`)
}

function removeEmployee(id){
  console.log(id);

  deleteEmployee(id).then((response) => {
     getAllEmployees();
  }).catch((error) => console.error("Error creating employee:", error));
  }


  return <div className="container">
    <h2 className="text-center">List of Employees</h2>
    <button className="btn btn-info" onClick={addNewEmployee}>Add Employee</button>
    <table className="table table-striped table-borded">
        <thead>
            <tr>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th style={{ textAlign: 'center', paddingRight: '50px' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                // dummyData.map(employee => 
                 employees.map(employee =>
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                      <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{marginLeft:'5px'}}>Delete</button>
                      </td>
                 
                </tr>)
            }
            
        </tbody>
    </table>
  </div>;
};

export default EmployeeListComponent;
