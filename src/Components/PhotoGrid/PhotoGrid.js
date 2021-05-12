// import React from "react";
// import ReactDOM from "react-dom";
// import UploadButton from "../UploadButton/UploadButton";
// import {
//     SortableContainer,
//     SortableElement,
//     SortableHandle
// } from "react-sortable-hoc";
// import arrayMove from "array-move";
// import style from './PhotoGrid.module.css';
//
// // To DO lijst!!!
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Elementen in container zo programmeren dat ze in de container blijven.[X]
// // functie aan toevoegen dat ik de elementen kan markeren ( Bijvoorbeeld: Duimpje omhoog of omlaag )[]
// // Functie upload knop koppelen aan de HOC grid elementen, dat het element een foto is.[]
// // Functie toevoegen dat ik de elementen kan verwijderen.[]
// // Functie toevoegen dat de comments, shopname en price aangepast kunnen worden.[]
//
// const Handle = SortableHandle(({ tabIndex }) => (
//     <div className={style.handle} tabIndex={tabIndex}>
//         {/*<svg viewBox="0 0 50 50">*/}
//             {/*<path*/}
//             {/*    d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"*/}
//             {/*    color="#000"*/}
//             {/*/>*/}
//         {/*</svg>*/}
//     </div>
// ));
//
// // Hier stond styling. Zie StyledItem in css.
//
//
// const SortableItem = SortableElement(props => {
//     const { value: item } = props;
//     console.log(props);
//     return (
//
//             <div className={style.content}>
//                 {item.caption}
//                 {props.shouldUseDragHandle && <Handle />}
//             </div>
//
//     );
// });
//
// //Hier stond styling, zie StyledContainer in css.
//
//
// const SortableList = SortableContainer(props => {
//     const { items, ...restProps } = props;
//     return (
//         <div className={style.StyledContainer}>
//             {items.map((item, index) => (
//                 <SortableItem
//                     key={`item-${item.id}`}
//                     index={index}
//                     value={item}
//                     {...restProps}
//                 />
//             ))}
//         </div>
//     );
// });
//
// //Hier stond styling. zie Styled in css
//
//
// function PhotoGrid() {
//     const [photos, setPhotos] = React.useState([
//
//         {
//             id: 1,
//             preview:
//                 <UploadButton/>,
//             caption: "test 1",
//             starred: true
//         },
//         {
//             id: 2,
//             preview:
//                 <UploadButton/>,
//             caption: "test 2"
//         },
//         {
//             id: 3,
//             preview:
//                 <UploadButton/>,
//             caption: "test 3"
//         },
//         {
//             id: 4,
//             preview:
//                 <UploadButton/>,
//             caption: "test 4",
//         },
//         {
//             id: 5,
//             preview:
//                 <UploadButton/>,
//             caption: "test 5"
//         },
//         {
//             id: 6,
//             preview:
//                 <UploadButton/>,
//             caption: "test 6"
//         },
//         {
//             id: 7,
//             preview:
//                 <UploadButton/>,
//             caption: "test 7"
//         }
//     ]);
//
//     const onSortEnd = ({ oldIndex, newIndex }) => {
//         setPhotos(arrayMove(photos, oldIndex, newIndex));
//     };
//
//
//
//     return (
//         <div className={style.container}>
//             <SortableList
//                 lockToContainerEdges={true}
//                 shouldUseDragHandle={true}
//                 useDragHandle
//                 axis="xy"
//                 items={photos}
//                 onSortEnd={onSortEnd}
//             />
//         </div>
//     );
// }
//
// export default PhotoGrid;