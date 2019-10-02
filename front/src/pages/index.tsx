import React, { useEffect } from "react";
import api, { User, NewUserData, Post } from "../api";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UsersTable from "../components/Sequelize/UsersTable";
import PostsList from "../components/Sequelize/PostsList";

const App: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [nameQuery, setNameQuery] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0)

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const getUsers = async () => {
    const users = await api.getUsers(
      selectedTab === 0 ? 'sequelize' : '',
      nameQuery,
      page * rowsPerPage,
      rowsPerPage
    );
    setTotalCount(users.count);
    return setUsers(users.rows);
  };

  const createNewUser = async (type: string, data: NewUserData) => {
    const newUser = await api.createUser(type, data);
    setUsers([...users, newUser]);
  };

  const getPosts = async (type: string, authorID: number) => {
    const posts = await api.getPosts(type, authorID);
    setPosts(posts);
  };

  const handleSearchButton = async () => {
    await getUsers();
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Sequelize" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <>
          <UsersTable
            users={users}
            totalCount={totalCount}
            type="sequelize"
            createNewUser={createNewUser}
            getPostsByID={getPosts}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            nameQuery={nameQuery}
            setNameQuery={setNameQuery}
            handleSearchButton={handleSearchButton}
          />
          <PostsList posts={posts} />
        </>
      )}
    </div>
  );
};

export default App;
