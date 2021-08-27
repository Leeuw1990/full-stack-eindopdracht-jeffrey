import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import AdminChangeModal from "../../Components/UserChangeModal/AdminChangeModal";
import Button from "../../Components/Buttons/Button";
import { Link } from "react-router-dom";
import AdminService from "../../service/AdminService";

function Admin() {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await AdminService.getUsers()
        setUserData(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className={styles.overAllSize}>
      <div className={styles.admin}>
        <h2>Admin Dashboard</h2>
        <div className={styles.scroll}>
          {userData.length > 0 &&
            userData.map((users, index) => {
              return (
                <div
                  key={index}
                  className={styles.userDetail}
                  onClick={() => {
                    setActiveObject({ users, index });
                    setOpenModal(true);
                  }}
                >
                  <ul>
                    {users.id && <li>User id: {users.id}</li>}
                    {users.username && <li>Username: {users.username}</li>}
                    {users.firstName && <li>Firstname: {users.firstName}</li>}
                    {users.lastName && <li>Lastname: {users.lastName}</li>}
                    {users.email && <li>E-mail: {users.email}</li>}
                  </ul>
                </div>
              );
            })}
        </div>
        {openModal ? (
          <AdminChangeModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            activeObject={activeObject}
            setUserData={setUserData}
          />
        ) : null}
        <Link to="/profile">
          <Button type="button" name="toList" title="Profile" />
        </Link>
      </div>
    </div>
  );
}

export default Admin;
