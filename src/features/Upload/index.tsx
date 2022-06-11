import "../../styles/css/global.css";

import { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import BucketStore  from '../../store/buckets/BucketStore';
import { ThemeContext } from 'styled-components';
import { useLocation } from "react-router-dom";
import { LocationState } from "../../shared/type/LocationState";

function Upload(props: any) {
    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);
    const  location  = useLocation();
    const { id, bucket } = location.state as LocationState;
    console.log('title ', title)
    console.log('state ', id)
    console.log('state ', bucket)
    

    console.log('store ', bucketStore)
    if (!bucketStore) throw Error("Store shouldn't be null");

    useEffect(() => {    
        function fetchAbout(){
            bucketStore.findByBuckets();        
        }
        fetchAbout();
        // eslint-disable-next-line react-hooks/exhaustive-deps    
      }, []);
    const { t } = useTranslation();
    return (
            <>
            <br/>
            Upload:  {t('main.header.welcome')}  
            </>
        );
}

export default observer(Upload)
