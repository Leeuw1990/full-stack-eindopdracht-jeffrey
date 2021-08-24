import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styles from "./ChangeModal.module.css";
import Button from "../Buttons/Button";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import InputField from "../InputField/InputField";

function ChangeModal({ openChangeModal, setOpenChangeModal }) {
    const [successMessage, toggleSuccessMessage] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let history = useHistory();
  const { user } = useContext(AuthContext);
  console.log(user);

  async function changeData(updateData) {
    try {
      await axios.patch(
        `http://localhost:8080/api/users/user/${user.username}/details/update`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toggleSuccessMessage(true);
        setTimeout(() => {
            history.push("/");
        }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  return openChangeModal ? (
    <div className={styles.modal}>
      <form className={styles.changeForm} onSubmit={handleSubmit(changeData)}>
        <h2>Gebruiker gegevens:</h2>
        <h3>
          <strong>Voornaam:</strong>
          {user && user.firstName}
        </h3>
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
        <h3>
          <strong>Achternaam:</strong>
          {user && user.lastName}
        </h3>
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
        <h3>
          <strong>Gebruikersnaam:</strong>
          {user && user.username}
        </h3>
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
        <h3>
          <strong>Email:</strong>
          {user && user.email}
        </h3>
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
          {successMessage === true && (
              <p>
                  Wijzigen gelukt! U wordt uitgelogd.
              </p>
          )}
      </form>
      <div className={styles.buttonGoBack}>
        <Button
          type="button"
          name="close"
          title="Profiel"
          onclick={() => setOpenChangeModal((prev) => !prev)}
        />
      </div>
    </div>
  ) : null;
}

export default ChangeModal;
