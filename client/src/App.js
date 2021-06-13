import './App.css';
import axios from 'axios'
import { useState } from 'react';

function App() {  

  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0)

  const getEmployee = async () => {
    await axios.get(`http://localhost:3001/employees`).then((res) => {
      setEmployees(res.data);
    }, err => console.log(err));
  }

  const addEmployee = async () => {
    await axios.post(`http://localhost:3001/employees`,{
      name: name,
      age: age,
      country:  country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployees([...employees, { name: name, age: age, country: country, position: position, wage: wage}]);
    });
  }

  const updateEmployeeWage = (id) => {
    axios.put(`http://localhost:3001/employees/${id}`, { wage: newWage}).then(response => {
     employees.map(emp => {
       return emp.id === id ? {
          id: emp.id,
          name: emp.name,
          country: emp.country,
          position: emp.position,
          wage: newWage,
       } : emp;
     });
    })
  }

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/employees/${id}`).then(response => {
      setEmployees(employees.filter(x => x.id !== id));
    });
  };
  return (
    <>
        <div className="container">
          <h2>Information Employee</h2>
          <div className="information">
            <form action="">
              
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name: </label>
                <input type="text" className="form-control" placeholder="Enter name ..." 
                onChange={(event) => {
                  setName(event.target.value)
                }} />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age: </label>
                <input type="number" className="form-control" placeholder="Enter age ..." 
                onChange={(event) => {
                  setAge(event.target.value)
                }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country: </label>
                <input type="text" className="form-control" placeholder="Enter country ..." 
                onChange={(event) => {
                  setCountry(event.target.value)
                }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="position" className="form-label">Position: </label>
                <input type="text" className="form-control" placeholder="Enter position ..."
                onChange={(event) => {
                  setPosition(event.target.value)
                }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="wage" className="form-label">Wage: </label>
                <input type="number" className="form-control" placeholder="Enter wage ..." 
                onChange={(event) => {
                  setWage(event.target.value)
                }}
                />
              </div>

              <div className="btn btn-outline-success" onClick={addEmployee}>Add employee</div>
            </form>

            <hr />

            <div className="employees">
              <div className="btn btn-outline-primary" onClick={getEmployee}>Show employees</div>
              <br />
              {
                employees.length > 0 && employees.map((employee, key) => {
                  return (
                    <div key={key} className="employee card">
                      <div className="card-body text-left">
                        <p className="card-text">Name: {employee.name}</p>
                        <p className="card-text">Age: {employee.age}</p>
                        <p className="card-text">Country: {employee.country}</p>
                        <p className="card-text">Position: {employee.position}</p>
                        <p className="card-text">Wage: {employee.wage}</p>
                        <div className="d-flex">
                          <input type="number" className="form-control" 
                          placeholder="15000 ..." style={{width: "300px"}} 
                          onChange={(event) => {
                            setNewWage(event.target.value);
                          }}
                          />
                          <button className="btn btn-warning"
                          onClick={() => updateEmployeeWage(employee.id)}
                          >Update</button>
                          <button className="btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>


          </div>{/**  end infomation */}
        </div>
    </>
  );
}

export default App;
