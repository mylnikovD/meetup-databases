import React, { useEffect } from 'react';
import api, { User, NewUserData } from '../api';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UsersTable from '../components/Sequelize/UsersTable';

const App: React.FC = () => {
  
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };


  useEffect(() => {
    const getUsers = async () => {
      const users = await api.getUsers();
      return setUsers(users)
    }
    getUsers()
  }, [])

  const createNewUser = async (type: string, data: NewUserData) => {
    const newUser = await api.createUser(type, data)
    setUsers([...users, newUser])
  }
  
  
  return (
    <div className="App">
       <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab label="Sequelize" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <UsersTable users={users} type="sequelize" createNewUser={createNewUser} />
      )}
    </div>
  );
}

export default App;