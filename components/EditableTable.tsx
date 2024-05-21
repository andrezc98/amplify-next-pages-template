import { useState, useEffect, ChangeEvent } from 'react';
import { API } from '@aws-amplify/api';

interface TableRow {
  [key: string]: string;
}

const EditableTable: React.FC = () => {
  const [data, setData] = useState<TableRow[]>([]);
  const [editedData, setEditedData] = useState<{ [key: string]: string }>({});
  const [schema, setSchema] = useState<string>('');
  const [table, setTable] = useState<string>('');

  useEffect(() => {
    if (schema && table) {
      fetchData();
    }
  }, [schema, table]);

  const fetchData = async () => {
    const response = await API.get('yourApiName', `/yourEndpoint/${schema}/${table}`);
    setData(response);
  };

  const handleEdit = (rowIndex: number, columnName: string, value: string) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = value;
    setData(updatedData);
    setEditedData({
      ...editedData,
      [`${rowIndex}-${columnName}`]: value,
    });
  };

  const saveChanges = async () => {
    await API.post('yourApiName', '/yourEndpoint/save', {
      body: { data: editedData },
    });
    alert('Changes saved!');
    fetchData();
  };

  return (
    <div>
      <div>
        <label>
          Schema:
          <input type="text" value={schema} onChange={(e: ChangeEvent<HTMLInputElement>) => setSchema(e.target.value)} />
        </label>
        <label>
          Table:
          <input type="text" value={table} onChange={(e: ChangeEvent<HTMLInputElement>) => setTable(e.target.value)} />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((columnName) => (
                <td key={columnName}>
                  <input
                    type="text"
                    value={row[columnName]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleEdit(rowIndex, columnName, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
};

export default EditableTable;
