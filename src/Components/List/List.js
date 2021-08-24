import React, { useState, useEffect } from "react";
import styles from "./List.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import ProductListService from "../../service/ProductListService";

function List() {
  const [listsData, setListsdata] = useState([]);
  const history = useHistory();

  const [loading, toggleLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ProductListService.getData()
        setListsdata(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  async function postData(data) {
    toggleLoading(true);
    try {
      await ProductListService.postData(data)
      const response = await ProductListService.getData()
      setListsdata(response.data);
    } catch (e) {
      console.error(e);
    }
    toggleLoading(false);
  }

  async function deleteData(listId) {
    try {
      await ProductListService.deleteData(listId)
      const deleteList = listsData.filter((result) => result.id !== listId);
      setListsdata(deleteList);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.infiniteScroll}>
        {listsData.length > 0 &&
          listsData.map((name, index) => (
            <div key={index}>
              <div className={styles.icon}>
                <div
                  className={styles.listText}
                  key={index}
                  onClick={() => history.push(`/product/${name.id}`)}
                >
                  {name.listName}
                </div>
                <div onClick={() => deleteData(name.id)} className="deleteIcon">
                  Remove
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <form onSubmit={handleSubmit(postData)}>
          <InputField
            type="text"
            onChange={postData}
            name="listName"
            placeholder="Create list"
            fieldRef={register("listName", {
              required: {
                value: false,
                message: "Invoer nodig",
              },
            })}
            errors={errors}
          />
          <button
            type="submit"
            name="listName"
            className={styles.addListButton}
          >
            Create list!
          </button>
          {loading === true && <p>Lijst toegevoegd!</p>}
        </form>
      </div>
    </div>
  );
}

export default List;
