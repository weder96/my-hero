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

import { Card } from 'primereact/card';

import BreadCrumb from "../../components/BreadCrumb";
import { ThemeContext } from 'styled-components';



function CreateBucket(props: any) {
    const { t } = useTranslation();
    const [value1, setValue1] = useState('');
    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);

    const listScope = [{ 'label': 'Amazon S3', 'link': '/s3/buckets' }, 
                       { 'label': 'Buckets', 'link': '/s3/buckets' }
                      ] 
    
    const view = "Create Bucket";

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
            <BreadCrumb title={view} listScope={listScope} active={view}/>
            <div className="page">
                <h1>{t('main.bucket.create')}</h1>
                <br/>
                <Card title="General configuration" className={title === 'dark' ? 'base-card-dark align-left' :'base-card align-left'} style={{ width: '50rem', marginBottom: '2em' }}>
                    <form className="baseForm" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label>Name Bucket</label>
                                <br/>
                                <InputText
                                    name="bucket"
                                    id="bucket"
                                    className="bucket formField width-350"
                                    value={value1} // We also bind our email value
                                    onChange={(e) => setValue1(e.target.value)} // And, we bind our "onChange" event. 
                                />
                                <p style={{lineHeight: '1.5'}}>Bucket name must be unique and must not contain spaces or uppercase letters. See rules for bucket naming</p>
                            </Grid>
                            <Grid item xs={12} className="align-right">
                                <Button type="button" label="Cancel" icon="pi pi-check" className="p-button-secondary mr-2" onClick={(e)=> goPageInitial(e)}/>
                                <Button type="submit" label="Create Bucket" icon="pi pi-check" onClick={(e) => saveNameBucket(e)} />
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default observer(CreateBucket)
