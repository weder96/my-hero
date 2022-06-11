import "../../styles/css/global.css";

import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import BucketStore  from '../../store/buckets/BucketStore';
import { ThemeContext } from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { LocationState } from "../../shared/type/LocationState";

function ViewBuckets(props: any) {
    let navigate = useNavigate();
    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);
    const  location  = useLocation();
    const { id, bucket } = location.state as LocationState;
    console.log('title ', title)
    console.log('state ', id)
    console.log('state ', bucket)
    console.log('store ', bucketStore)
    if (!bucketStore) throw Error("Store shouldn't be null");


    const handleClickUpload = (event: any) => {
        event.preventDefault();                
        navigate("/s3/upload/"+bucket,  { state: { id: 8 , bucket: bucket } })
    }

    useEffect(() => {    
        function fetchAbout(){
            bucketStore.findByBuckets();        
        }
        fetchAbout();
        // eslint-disable-next-line react-hooks/exhaustive-deps    
      }, []);
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <br/>
            <h2>{bucket}</h2> info <br/><br/>
            ViewBuckets:  {t('main.header.welcome')}  

            <Button label="pload" onClick={handleClickUpload}/>
        </React.Fragment>
        );
}

export default observer(ViewBuckets)
