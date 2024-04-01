import  { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentGrid.css'; 

const StudentGrid = () => {
  const [students, setStudents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormValues, setCreateFormValues] = useState({
    name: '',
    gender: '',
    physics: '',
    maths: '',
    english: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/sanjeevkumar91/056498117cb9a14828276a816090064f/raw/47aa48c4bf6b086468f8d9f5f4af8b7b8f478151/student-data.json');
      setStudents(response.data);
      
      setCreateFormValues({
        name: '',
        gender: '',
        physics: '',
        maths: '',
        english: ''
      });
    } catch (error) {
      console.error("Can't fetch data:", error);
    }
  };

  const handleCreateFormChange = (e) => {
    setCreateFormValues({
      ...createFormValues,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateFormSubmit = (e) => {
    e.preventDefault();
   
    setStudents([...students, createFormValues]);
    
    setCreateFormValues({
      name: '',
      gender: '',
      physics: '',
      maths: '',
      english: ''
    });
    
    setShowCreateForm(false);
  };

  const handleEditFormSubmit = (editedStudent) => {
    
    const index = students.findIndex(student => student.name === editedStudent.name);
    
    const updatedStudents = [...students];
   
    updatedStudents[index] = editedStudent;
    
    setStudents(updatedStudents);
  };

  const handleDelete = (studentToDelete) => {
    
    const updatedStudents = students.filter(student => student.name !== studentToDelete.name);
    
    setStudents(updatedStudents);
  };

  return (
    <div className="student-grid">
      <button onClick={() => setShowCreateForm(true)}>Create</button>
      {showCreateForm && (
        <div className="create-form">
          <h2>Add New Student</h2>
          <form onSubmit={handleCreateFormSubmit}>
            <input type="text" name="name" value={createFormValues.name} onChange={handleCreateFormChange} placeholder="Name" />
            <input type="text" name="gender" value={createFormValues.gender} onChange={handleCreateFormChange} placeholder="Gender" />
            <input type="number" name="physics" value={createFormValues.physics} onChange={handleCreateFormChange} placeholder="Physics" />
            <input type="number" name="maths" value={createFormValues.maths} onChange={handleCreateFormChange} placeholder="Maths" />
            <input type="number" name="english" value={createFormValues.english} onChange={handleCreateFormChange} placeholder="English" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <div className="student-tiles">
        {Array.isArray(students) && students.map((student, index) => (
          <div key={index} className="student-tile">
            <div>Name: {student.name}</div>
            <div>Gender: {student.gender}</div>
            <div>Physics: {student.physics}</div>
            <div>Maths: {student.maths}</div>
            <div>English: {student.english}</div>
            <button onClick={() => console.log('Edit clicked for', student)}>Edit</button>
            <button onClick={() => handleDelete(student)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentGrid;
