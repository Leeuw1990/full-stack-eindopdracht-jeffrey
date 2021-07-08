import React ,{useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from './ListForm.module.css'
import axios from "axios";
import InputField from "../InputField/InputField";

function ListForm() {

    const [loading, toggleLoading] = useState(false);
    const { handleSubmit,register, formState:{errors} } = useForm({
        mode: "onSubmit"
    });

    async function postData(data) {
                toggleLoading(true);
        try {
            await axios.post('http://localhost:8080/api/productlist', data, {
                headers: {  "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

        } catch (e) {
            console.error(e)
        }
                toggleLoading(false);
    }


    return(
        <div>
            <form onSubmit={handleSubmit(postData)}>
                    <InputField
                        type="text"
                        onChange={postData}
                        name="listName"
                        placeholder="Create list"
                        fieldRef={register("listName",
                            {
                                required: {
                                    value: false,
                                    message: "Invoer nodig",
                                }
                            }
                        )}
                        errors={errors}
                    />
                <button type='submit' name='listName' className={styles.addListButton} >Create list!</button>
                {loading === true && <p>Lijst toegevoegd!</p>}
            </form>
        </div>
    );
}

export default ListForm;







