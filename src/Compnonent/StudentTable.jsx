import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      
      setLoading(true);
      
      
      setTimeout(async () => {
        try {
          const response = await axios.get('https://gist.githubusercontent.com/sanjeevkumar91/056498117cb9a14828276a816090064f/47aa48c4bf6b086468f8d9f5f4af8b7b8f478151/student-data.json');
          setStudents(response.data);
          setLoading(false); 
        } catch (error) {
          console.error("Can't fetch data:", error);
          setLoading(false);
        }
      }, 1000); 
    };

    fetchDataWithDelay();
  }, []);

  // paginate students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Physics</th>
                <th>Maths</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.physics}</td>
                  <td>{student.maths}</td>
                  <td>{student.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
       
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>{`${indexOfFirstStudent + 1} - ${Math.min(indexOfLastStudent, students.length)} of ${students.length}`}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastStudent >= students.length}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
