// import React, { useState } from 'react';
// import styles from './UploadButton.module.css'
//
//
//
// // Stappen plan photo grid//
// // 1.
//
// // sortable grid methode!!!!
// // https://codesandbox.io/s/react-sortable-hoc-grid-example-65zi6
// // Sortable grid HOC tutorial, with sort functions.
// //https://www.youtube.com/watch?v=eNfxN9RbYGI
//
// function UploadButton() {
//
//     const [selectedImage, setSelectedImage] = useState([])
//
//     function imageHandleChange(e) {
//         // console.log('Laat dit fotos zien??????????', e.target.files)
//         if(e.target.files) {
//             const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
//             console.log(fileArray)
//             setSelectedImage((prevImages)=>prevImages.concat(fileArray))
//             Array.from(e.target.files).map(
//                 (file)=>URL.revokeObjectURL(file)
//             )
//         }
//     }
//
//     function renderPhotos(source) {
//         return source.map((photo)=> {
//             return <img src={photo} key={photo}/>
//         })
//     }
//
//     return(
//         <div>
//             <div >
//                 <div className='result'>
//                     {renderPhotos(selectedImage)}
//                 </div>
//
//                 <input hidden type='file' name='upload' multiple id='file' onChange={imageHandleChange}/>
//                 <label htmlFor='file' className={styles.uploadButtonStyle}>Add Photo</label>
//                 {/*<div>*/}
//                 {/*    <label htmlFor='file' className='label'>*/}
//                 {/*        <i className='iconUpload'>add photo</i>*/}
//                 {/*    </label>*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     );
// }
//
// export default UploadButton;

