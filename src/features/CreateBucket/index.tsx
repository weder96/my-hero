import "../../styles/css/global.css";

import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useFormik } from "formik";

function CreateBucket(props: any) {
    const { t } = useTranslation();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit(values) {
            // This will run when the form is submitted
        }
    });
    return (
        <>
            <br />
            Create Bucket:  {t('main.header.welcome')}
            <div className="App">
                <h1>Contact Us</h1>
                <form className="baseForm" onSubmit={formik.handleSubmit} noValidate>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="email formField"
                        value={formik.values.email} // We also bind our email value
                        onChange={formik.handleChange} // And, we bind our "onChange" event.
                    />
                </form>
            </div>
        </>
    );
}

export default observer(CreateBucket)
