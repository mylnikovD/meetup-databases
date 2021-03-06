import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { User, NewUserData } from "../../api";

type UsersTableProps = {
  users: Array<User>;
  type: string;
  createNewUser: (type: string, data: NewUserData) => void;
  getPostsByID: (type: string, authorID: number) => void;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  nameQuery: string;
  setNameQuery: (value: string) => void;
  totalCount: number;
  handleSearchButton: () => void;
};

export default function UsersTable(props: UsersTableProps) {
  const {
    users,
    getPostsByID,
    type,
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
    nameQuery,
    setNameQuery,
    totalCount,
    handleSearchButton
  } = props;
  const [newUser, setNewUser] = useState<NewUserData>({
    fullname: "",
    email: "",
    age: 0,
    username: "",
    roleID: 2
  });
  const [open, setOpen] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({ ...prevUser, [name!]: value }));
  };

  const createNewUser = () => {
    props.createNewUser(props.type, newUser);
  };

  return (
    <>
      <h2 style={{ marginLeft: "50px" }}>Users</h2>
      <div style={{ display: "flex", padding: "30px", maxHeight: "50px" }}>
        <TextField
          value={nameQuery}
          onChange={e => setNameQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "20px" }}
          onClick={handleSearchButton}
        >
          Search
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} onClick={() => getPostsByID(type, user.id)}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.Role.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[2, 4, 5]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={(e: unknown, number: number) => {
          setPage(number);
        }}
        onChangeRowsPerPage={e => setRowsPerPage(+e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "20px", marginTop: "20px" }}
        onClick={() => setOpen(true)}
      >
        Add new User
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            width: "500px",
            height: "500px",
            backgroundColor: "white",
            margin: "200px auto",
            padding: "50px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <h2>New user data</h2>
          <TextField
            label="Full Name"
            onChange={handleInputChange}
            name="fullname"
            value={newUser.fullname}
          />
          <TextField
            label="User Name"
            onChange={handleInputChange}
            name="username"
            value={newUser.username}
          />
          <TextField
            label="E-mail"
            onChange={handleInputChange}
            name="email"
            value={newUser.email}
          />
          <TextField
            label="Age"
            onChange={handleInputChange}
            name="age"
            type="number"
            value={newUser.age}
          />
          <InputLabel style={{ marginTop: "10px" }} htmlFor="role-simple">
            Role
          </InputLabel>
          <Select
            value={newUser.roleID}
            onChange={handleSelectChange}
            inputProps={{
              name: "roleID",
              id: "role-simple"
            }}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>User</MenuItem>
          </Select>
          <div
            style={{
              justifyContent: "center",
              margin: "20px auto",
              display: "flex"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "20px", marginTop: "20px" }}
              onClick={() => {
                createNewUser();
                setOpen(false);
              }}
            >
              Add new User
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "20px", marginTop: "20px" }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
