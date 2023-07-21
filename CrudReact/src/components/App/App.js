import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomTable from "../CustomTable/CustomTable";
import "./App.css";

const initialValues = {
  userName: "",
  userSurname: "",
  userSalary: "",
};

function App() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleCleanClick = () => setUserData(initialValues);

  // Create
  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (editableUserData.isEdit) {
      const editedData = users;
      editedData.splice(editableUserData.userIndex, 1, userData);
      setUsers(editedData);
      setEditableUserData({
        isEdit: false,
        userIndex: null,
      });
    } else {
      setUsers((prevState) => [...prevState, userData]);
    }
    setUserData(initialValues);
  };

  // Update
  const handleEditClick = (data, index) => {
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

  // Delete
  const handleRemoveClick = (id) => {
    setUsers(users.filter((user, index) => index !== id));
  };

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className="table-data">
          {/* <CustomTable /> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Surname</th>
                <th>User Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.userSurname}</td>
                  <td>{user.userSalary}</td>
                  <td>
                    <div>
                      <button
                        className="edit_action"
                        onClick={() => handleEditClick(user, id)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove_action"
                        onClick={() => handleRemoveClick(id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <input
              type="text"
              placeholder="Write your name"
              value={userData.userName}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Write your surname"
              value={userData.userSurname}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userSurname: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Write your salary"
              value={userData.userSalary}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userSalary: e.target.value,
                }))
              }
            />
            <div className="buttons-wrapper">
              <button type="reset">Clear</button>
              <button disabled={!isFilledFields} type="submit">
                {editableUserData.isEdit ? 'Edit' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
