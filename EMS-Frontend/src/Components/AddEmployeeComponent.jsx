// import React, { useState } from "react";
// import { createEmployee } from "../services/EmployeeService";
// import { useNavigate } from "react-router-dom";

// const AddEmployeeComponent = () => {

//     const [employee, setEmployee] = useState({ firstName: "", lastName: "", email: "" });

//     const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "" });

//     const navigator = useNavigate();
  
//     const handleChange = (e) => {
//       setEmployee({ ...employee, [e.target.name]: e.target.value });
//     };

//   /*const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");


//   function handleFirstName(e){
//      setFirstName(e.target.value)
//   }

//   function handleLastName(e){
//     setLastName(e.target.value)
//   }

//   function handleEmail(e){
//     setEmail(e.target.value)
//   }*/

//   function saveEmployee(e){
//     e.preventDefault();
//     console.log(employee)

//     if(formValidation()){

//       createEmployee(employee).then((response) => {
//         console.log(response.data);   
//         navigator('/employees')         
//       } )

//     }

   
//   }

//   function formValidation(){
//     let valid=true;

//     const errorsCopy = {... errors}

//     if(firstName.trim())
//       errorsCopy.firstName='';
//     else{
//       errorsCopy.firstName = 'First name is required';
//       value=false;
//     }

//     if(lastName.trim())
//       errorsCopy.lastName='';
//     else{
//       errorsCopy.firstName = 'Last name is required';
//       value=false;
//     }

//     if(email.trim())
//       errorsCopy.email='';
//     else{
//       errorsCopy.email = 'Email is required';
//       value=false;
//     }

//     setErrors(errorsCopy);
//     return valid;

//   }

//   return(
//   <div className="container"><br></br><br></br>
//     <div className="row">
//       <div className='card col-md-6 offset-md-3'>
//         <h2 className="text-center">Add Employee</h2>
//         <div className="card-body">
//             <form>

//                <div className="form-group mb-2">
//                 <label className="form-label">First Name:</label>
//                 <input type='text' placeholder="Enter Employee First Name" name='firstName' value={employee.firstName} className="form-control" onChange={handleChange}></input>
//                 </div> 

//                 <div className="form-group mb-2">
//                 <label className="form-label">Last Name:</label>
//                 <input type='text' placeholder="Enter Employee Last Name" name='lastName' value={employee.lastName} className="form-control" onChange={handleChange}></input>
//                 </div> 

//                 <div className="form-group mb-2">
//                 <label className="form-label">Email:</label>
//                 <input type='email' placeholder="Enter Employee Email" name='email' value={employee.email} className="form-control" onChange={handleChange}></input>
//                 </div>


//                 <button className="btn btn-dark" onClick={saveEmployee}>Submit</button>

//             </form>
//         </div>
//         </div>  
//     </div>
//     </div>
//   )
// }

// export default AddEmployeeComponent;


import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => setEmployee(response.data))
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(employee);
    if (Object.keys(validationErrors).length === 0) {
      if (id) {
        updateEmployee(id, employee)
          .then(() => navigate("/employees"))
          .catch((error) => console.error("Error updating employee:", error));
      } else {
        createEmployee(employee)
          .then(() => navigate("/employees"))
          .catch((error) => console.error("Error creating employee:", error));
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    const nameRegex = /^[A-Za-z]+$/; // Only alphabets allowed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

    Object.keys(values).forEach((key) => {
      const value = values[key];

      // Ensure value is a string before calling trim
      if (typeof value === "string" && !value.trim()) {
        errors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (values.firstName && !nameRegex.test(values.firstName)) {
      errors.firstName = "First name should contain only alphabets";
    }

    if (values.lastName && !nameRegex.test(values.lastName)) {
      errors.lastName = "Last name should contain only alphabets";
    }

    if (values.email && !emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  function pageTitle() {
    return (
      <h2 className="text-center">{id ? "Update Employee" : "Add Employee"}</h2>
    );
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdateEmployee}>
              {["firstName", "lastName", "email"].map((field) => (
                <div key={field} className="form-group mb-2">
                  <label className="form-label">
                    {field.replace(/([A-Z])/g, " $1")}:
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    placeholder={`Enter Employee ${field.replace(
                      /([A-Z])/g,
                      " $1"
                    )}`}
                    name={field}
                    value={employee[field]}
                    className="form-control"
                    onChange={handleChange}
                  />
                  {errors[field] && (
                    <small className="text-danger">{errors[field]}</small>
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-dark">
                {id ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
 