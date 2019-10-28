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
  const [totalCount, setTotalCount] = React.useState(0);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPosts([])
    return setSelectedTab(newValue);
  };

  useEffect(() => {
    getUsers(selectedTab, nameQuery, page, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, selectedTab]);

  const getUsers = async (
    selectedTab: number,
    nameQuery: string,
    page: number,
    rowsPerPage: number
  ) => {
    const users = await api.getUsers(
      selectedTab === 0 ? "sequelize" : "bookshelf",
      nameQuery,
      page * rowsPerPage,
      rowsPerPage
    );
    if (selectedTab === 0) {
      setTotalCount(users.count);
      return setUsers(users.rows);
    }
    return setUsers(users)
  };

  const createNewUser = async (type: string, data: NewUserData) => {
    await api.createUser(type, data);
    getUsers(selectedTab, nameQuery, page, rowsPerPage);
  };

  const getPosts = async (type: string, authorID: number) => {
    const posts = await api.getPosts(type, authorID);
    setPosts(posts);
  };

  const editPost = async (type: string, postID: number, value: string) => {
    const updatedPost = await api.editPost(type, postID, value);
    if (!updatedPost) return;
    return setPosts(prevPosts =>
      prevPosts.map(prevPost => {
        if (updatedPost.length) {
          if (prevPost.id === updatedPost[1].id) {
            return updatedPost[1];
          }
          return prevPost;
        } else {
          if (prevPost.id === updatedPost.id) {
            return updatedPost;
          }
          return prevPost;
        }
      })
    );
  };

  const deletePost = async (type: string, postID: number) => {
    const deletedPost = await api.deletePost(type, postID);
    if (!deletedPost) return;
    return setPosts(prevPosts =>
      prevPosts.filter(prevPost => prevPost.id !== postID)
    );
  };

  const handleSearchButton = async () => {
    await getUsers(selectedTab, nameQuery, page, rowsPerPage);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Sequelize" />
          <Tab label="Bookshelf/Knex" />
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
          <PostsList
            posts={posts}
            type="sequelize"
            editPost={editPost}
            deletePost={deletePost}
          />
        </>
      )}
      {selectedTab === 1 && (
        <>
          <UsersTable
            users={users}
            totalCount={totalCount}
            type="bookshelf"
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
          <PostsList
            posts={posts}
            type="bookshelf"
            editPost={editPost}
            deletePost={deletePost}
          />
        </>
      )}
    </div>
  );
};

export default App;
