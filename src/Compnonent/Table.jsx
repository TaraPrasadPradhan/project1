import { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/sanjeevkumar91/056498117cb9a14828276a816090064f/raw/47aa48c4bf6b086468f8d9f5f4af8b7b8f478151/student-data.json');
      
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error("Can't fetch data:", error);
    }
  };
  

  const handleSort = (columnName) => {
    console.log('Sorting column:', columnName);

    if (columnName === sortedColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(columnName);
      setSortOrder('asc');
    }
  };
  
  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (sortedColumn) {
        const columnA = typeof a[sortedColumn] === 'string' ? a[sortedColumn].toUpperCase() : a[sortedColumn];
        const columnB = typeof b[sortedColumn] === 'string' ? b[sortedColumn].toUpperCase() : b[sortedColumn];
        if (columnA < columnB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (columnA > columnB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });
    
    // Log the sorted data to the console
    console.log('Sorted Data:', sortedData);
  }, [data, sortedColumn, sortOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('gender')}>Gender</th>
          <th onClick={() => handleSort('physics')}>Physics</th>
          <th onClick={() => handleSort('maths')}>Maths</th>
          <th onClick={() => handleSort('english')}>English</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => (
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
  );
};

export default Table;
