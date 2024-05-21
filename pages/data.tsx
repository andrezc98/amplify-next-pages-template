import EditableTable from '@/components/EditableTable';
import CustomAuthenticator from '@/components/CustomAuthenticator';

const Data: React.FC = () => {
  return (
    <CustomAuthenticator>
    <div>
      <h1>Editable Table</h1>
      <EditableTable />
    </div>
    </CustomAuthenticator>
  );
};

export default Data;
