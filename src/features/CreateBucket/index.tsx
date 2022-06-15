import "../../styles/css/global.css";

import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import toastStore from "../../store/toast/ToastStore";
import BucketStore from "../../store/buckets/BucketStore";
import { autorun } from "mobx";
import { useNavigate } from "react-router-dom";



function CreateBucket(props: any) {
    const { t } = useTranslation();
    const [value1, setValue1] = useState('');
    const bucketStore = useContext(BucketStore);

    let navigate = useNavigate();

    const goPageInitial = (e: any) => {
        e.preventDefault();
        navigate("/")
    }
    
    const saveNameBucket = (e: any) => {
            e.preventDefault();
            console.log('value1 ', value1);
            bucketStore.createBucket(value1);
    }


    useEffect(() => {
        function loadCreateBuckets () {
            autorun(() => {
                console.log("bucketStore.isCreate: ", bucketStore.isCreate);
                {
                    setValue1('');
                    bucketStore.setIsCreate(false);
                    let successMessage = "Bucket Criado com Sucesso " + bucketStore.nameCreated;
                    toastStore.exibirMensagensSucesso([successMessage])
                }
            });
        }

        if(bucketStore.isCreate === true)
            loadCreateBuckets(); // eslint-disable-next-line
      }, [bucketStore.isCreate]);

    return (
        <>
                <h1>{t('main.bucket.create')}</h1>
                <form className="baseForm" noValidate>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputText
                                name="bucket"
                                id="bucket"
                                className="bucket formField"
                                value={value1} // We also bind our email value
                                onChange={(e) => setValue1(e.target.value)} // And, we bind our "onChange" event. 
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Button type="button" label="Cancel" icon="pi pi-check" className="p-button-secondary" onClick={(e)=> goPageInitial(e)}/>
                            <Button type="submit" label="Create Bucket" icon="pi pi-check" onClick={(e) => saveNameBucket(e)} />
                        </Grid>
                    </Grid>
                </form>
        </>
    );
}

export default observer(CreateBucket)
