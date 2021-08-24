import styles from "./Product.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Buttons/Button";
import ProductUploadService from "../../service/ProductService";
import ProductModal from "../../Components/ProductModal/ProductModal";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

function Product() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [errorMessage, toggleErrorMessage] = useState(false);
  const [message, toggleMessage] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  function selectFile(event) {
    setSelectedFiles(event.target.files);
  }

  async function uploadImage() {
    const currentFile = selectedFiles[0];
    try {
      await ProductUploadService.upload(currentFile);
      toggleMessage(true);
      const allFiles = await ProductUploadService.getFiles();
      setUploadedFiles(allFiles.data);
    } catch (e) {
      toggleErrorMessage(true);
    }
  }

  useEffect(() => {
    ProductUploadService.getFiles().then((response) => {
      setUploadedFiles(response.data);
    });
  }, []);

  function sortPriceAsc() {
    const products = [...uploadedFiles].sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    setUploadedFiles(products);
  }

  function sortPriceDesc() {
    const products = [...uploadedFiles].sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    setUploadedFiles(products);
  }

  function sortRatingAsc() {
    const products = [...uploadedFiles].sort((a, b) => {
      if (a.rating < b.rating) {
        return -1;
      }
      return 0;
    });
    setUploadedFiles(products);
  }

  function sortRatingDesc() {
    const products = [...uploadedFiles].sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      return 0;
    });
    setUploadedFiles(products);
  }

  return (
    <div className={styles.overAllSize}>
      <div className={styles.productForm}>
        <div className={styles.modalPosition}>
          <div className={styles.container}>
            {uploadedFiles.length > 0 &&
              uploadedFiles.map((uploadedFile, index) => {
                return (
                  <div className={styles.pictureElement} key={index}>
                    <img
                      className={styles.pictureSize}
                      src={uploadedFile.url}
                      alt="hoi"
                      key={index}
                      onClick={() => {
                        setActiveObject({ index, uploadedFile });
                        setModalClose(true);
                      }}
                    />
                    <div className={styles.picProperties}>
                      <ul>
                        {uploadedFile.rating && (
                          <li>Waardering: {uploadedFile.rating}</li>
                        )}
                        {uploadedFile.price && (
                          <li>Prijs: €{uploadedFile.price}</li>
                        )}
                        {uploadedFile.shopName && (
                          <li>Winkel: {uploadedFile.shopName}</li>
                        )}
                        {uploadedFile.comment && (
                          <li>Opmerkingen: {uploadedFile.comment}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </div>
          {modalClose ? (
            <ProductModal
              oneImage={activeObject}
              object={activeObject}
              modalClose={modalClose}
              setModalClose={setModalClose}
              setUploadedFiles={setUploadedFiles}
              upLoadedFiles={uploadedFiles}
            />
          ) : null}
        </div>

        <div className={styles.buttons}>
          <Link to="/productlist">
            <Button type="button" name="toList" title="My lists" />
          </Link>
          <label className={styles.uploadButtonStyle}>
            <input
              className={styles.inputFile}
              type="file"
              onChange={selectFile}
            />
            Upload
          </label>
          <button className={styles.uploadButtonStyle}
            disabled={!selectedFiles}
            onClick={uploadImage}
          >Confirm</button>
          {message === true && (<p>Uploaded!</p>)}
          {errorMessage === true && (<p>Something went wrong, Try again!</p>)}
        </div>
        <div className={styles.sortButtonsPrice}>
          <p>Price</p>
          <GoTriangleUp
            size="25px"
            color="#707070"
            type="click"
            onClick={sortPriceAsc}
          />
          <GoTriangleDown
            size="25px"
            color="#707070"
            type="click"
            onClick={sortPriceDesc}
          />
        </div>
        <div className={styles.sortButtonsRating}>
          <p>Rating</p>
          <GoTriangleUp
            size="25px"
            color="#707070"
            type="click"
            onClick={sortRatingAsc}
          />
          <GoTriangleDown
            size="25px"
            color="#707070"
            type="click"
            onClick={sortRatingDesc}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
