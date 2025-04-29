import "./App.css";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";
import EmployeeListComponent from "./Components/EmployeeListComponent";
import { BrowserRouter,Route,Routes } from "react-router-dom";

import Helloworld from "./Helloworld";
import AddEmployeeComponent from "./Components/AddEmployeeComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>

          {/* http://localhost:3000 */}
          <Route path="/" element={<EmployeeListComponent />}></Route>  

          {/* http://localhost:3000/employees */}
          <Route path="/employees" element={<EmployeeListComponent />}></Route> 
           
           {/* http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>

           {/* http://localhost:3000/update-employee/1 */}
           <Route path='/update-employee/:id' element={<AddEmployeeComponent/>}></Route>
        </Routes>
    
        <FooterComponent />
      </BrowserRouter>
    </>
  );

  // return (
  //   <>
  //       <HeaderComponent />
  //       <EmployeeListComponent />
  //       <FooterComponent />
  //   </>
  // );
}

export default App;
