import React, { useState } from "react";
import styles from "./AdminChangeModal.module.css";
import Button from "../Buttons/Button";
import axios from "axios";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import AdminService from "../../service/AdminService";

function AdminChangeModal({
  openModal,
  setOpenModal,
  activeObject,
  setUserData,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
    const [successMessage, toggleSuccessMessage] = useState(false);

  async function userChangeData(updateData) {
    try {
      await axios.patch(
        `http://localhost:8080/api/users/user/${activeObject.users.username}/details/update`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toggleSuccessMessage(true)
        const response = await AdminService.getUsers()
      setUserData(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  return openModal ? (
    <div className={styles.userModal}>
      <form
        className={styles.userChangeForm}
        onSubmit={handleSubmit(userChangeData)}
      >
        <h2>Gebruikersgegevens:</h2>
        {activeObject.users.firstName && <p>{activeObject.users.firstName}</p>}
        <InputField
          type="text"
          name="changeName"
          placeholder="Wijzig voornaam"
          fieldRef={register("firstName", {
            required: {
              value: false,
            },
          })}
          errors={errors}
        />
        {activeObject.users.lastName && <p>{activeObject.users.lastName}</p>}
        <InputField
          type="text"
          name="lastName"
          placeholder="Wijig achternaam"
          fieldRef={register("lastName", {
            required: {
              value: false,
            },
          })}
          errors={errors}
        />
        {activeObject.users.username && <p>{activeObject.users.username}</p>}
        <InputField
          type="text"
          name="changeUsername"
          placeholder="Wijzig gebruikersnaam"
          fieldRef={register("username", {
            required: {
              value: false,
            },
          })}
          errors={errors}
        />
        {activeObject.users.email && <p>{activeObject.users.email}</p>}
        <InputField
          type="text"
          name="email"
          placeholder="Wijzig e-mail"
          fieldRef={register("email", {
            required: {
              value: false,
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "E-mailadres voldoet niet aan de vereiste karakters.",
            },
          })}
          errors={errors}
        />
        <Button type="submit" name="save" title="Opslaan" />
        <Button
          type="button"
          name="close"
          title="Admin Dashboard"
          onclick={() => setOpenModal((prev) => !prev)}
        />
          {successMessage === true && (
              <p>
                  Wijzigen gelukt!
              </p>
          )}
      </form>
    </div>
  ) : null;
}

export default AdminChangeModal;
