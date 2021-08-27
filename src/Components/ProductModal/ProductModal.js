import styles from "./ProductModal.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Buttons/Button";
import InputField from "../InputField/InputField";
import ProductService from "../../service/ProductService";

function ProductModal({
  modalClose,
  setModalClose,
  object,
  setUploadedFiles,
}) {
  const [errorMessage, toggleErrorMessage] = useState(false);
  const [message, toggleMessage] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  async function addData(updateData) {
    try {
      await ProductService.patchFiles(object.uploadedFile.url.slice(-55), updateData)
      ProductService.getFiles().then((response) => {
        setUploadedFiles(response.data);
      });
      toggleMessage(true);
    } catch (e) {
      toggleErrorMessage(true);
    }
  }

  return (
    <div className={styles.modal}>
      {modalClose ? (
        <form className={styles.popupForm} onSubmit={handleSubmit(addData)}>
          <div className={styles.imageFrame}>
            {object && (
              <img
                className={styles.image}
                alt="Product"
                src={object.uploadedFile.url}
              />
            )}
          </div>

          <select className={styles.rating} {...register("rating")}>
            <option value="0">waardering</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <InputField
            type="number"
            step="0.01"
            name="price"
            placeholder="Prijs"
            fieldRef={register("price", {
              required: {
                value: false,
              },
            })}
            errors={errors}
          />
          <InputField
            type="text"
            name="shopName"
            placeholder="Winkel"
            fieldRef={register("shopName", {
              required: {
                value: false,
              },
            })}
            errors={errors}
          />
          <textarea
            {...register("comment")}
            className={styles.commentArea}
            name="comment"
            id="comment"
            cols="20"
            rows="10"
          />
          <Button type="submit" name="save" title="Save" />
          <Button
            type="click"
            name="Close"
            onclick={() => setModalClose((prev) => !prev)}
            title="Close"
          />
          {message && <p>Comments added!</p>}
          {errorMessage && <p>Comments denied!</p>}
        </form>
      ) : null}
    </div>
  );
}

export default ProductModal;
