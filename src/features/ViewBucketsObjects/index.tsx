import "../../styles/css/global.css";

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';


import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ThemeContext } from 'styled-components';

import Link from '@material-ui/core/Link';

import BucketStore  from '../../store/buckets/BucketStore';
import ShowComponents  from '../../components/ShowComponets/ShowComponents';

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { LocationStateObjects } from "../../shared/type/LocationStateObjects";

function ViewBucketsObjects(props: any) {
    let navigate = useNavigate();
    const [selectedObjects, setSelectedObjects] = useState(null);
    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);
    const  location  = useLocation();
    const { id, bucket, key } = location.state as LocationStateObjects;
    console.log('title ', title)
    console.log('state bucket', bucket)
    console.log('state objects', id)
    console.log('state key', key)
    if (!bucketStore) throw Error("Store shouldn't be null");


    const handleClickUpload = (event: any) => {
        event.preventDefault();                
        navigate("/s3/upload/"+bucket,  { state: { id: 8 , bucket: bucket } })
    }

    const nameBodyTemplate = (rowData: any) => {
        return(
            <>
            <Link onClick={(e) => handleClickLinkList(e, rowData.key)}>{rowData.key}</Link>
            </> 
        );
   }

   const handleClickLinkList = (event: any, bucket: string) => {
    event.preventDefault();                
    navigate("/s3/buckets/"+bucket+"/objects", { state: { id: 7, bucket: bucket } })
   }

   const nameTypeBodyTemplate = (rowData: any) => {
    let type = rowData.key.split(".");
    return(
        <>
        <label className="dark-font">{type[1]}</label>
        </> 
    );
   }

   const nameLastModifyBodyTemplate = (rowData: any) => {
    return(
        <>
        <label className="dark-font"> {rowData.lastModified} </label>
        </> 
    );
   }

   const sizeBodyTemplate = (rowData: any) => {
    let value = (Number(rowData.size) / 1024).toFixed(1);
    return ( <> <label className="dark-font"> {value} KB </label></>);
   }

   const storageClassBodyTemplate = (rowData: any) => {
    return(
        <>
        <label className="dark-font"> {rowData.storageClass} </label>
        </> 
    );
   }


   useEffect(() => {    
    function fetchBucketsByName(){
        bucketStore.findObjectsByName(bucket);        
    }
    fetchBucketsByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);
   
   const verifyFolderByObject = (files: any) => {
    let objects: any = [] 
    files.forEach((file: any) => {
        let keys = file.key.split("/");
        

        if(veryfyFileContainsKey(file, key)){
            let obj = {
                "bucketName": file.bucketName ,
                "key": keys[1],
                "size": file.size ,
                "lastModified": file.lastModified ,
                "storageClass": file.storageClass,
                "owner": file.owner,
                "etag": file.etag
            }
            if(!veryfyObjectsContainsKey(objects, keys[1])){
                objects.push(obj);
            }
       }

    });
    return objects;
   }

   const veryfyFileContainsKey = (file: any, key: string) : boolean => {
      return file.key.includes(key);
   }


   const veryfyObjectsContainsKey = (objects: any, key: string) : boolean => {
    let valid = false;   
    if(objects.length > 0){
        return objects.filter((elem: any) => elem.key === key).length > 0;
    }
    return valid;
   }

    const { t } = useTranslation();
    return (
        <React.Fragment>
            <br/>
            <h2>{key}</h2> info <br/><br/>
            ViewBuckets:  {t('main.header.welcome')}  

            <Button label="Upload ..." onClick={handleClickUpload}/>
            <br/>
            <ShowComponents case={bucketStore.objects.length > 0}>
                <Card title="" className={title === 'dark' ? 'card-dark mb-4' : 'base-card-ligth'}>
                    <DataTable value={verifyFolderByObject(bucketStore.objects)} 
                               selection={selectedObjects}
                               onSelectionChange={(e) => setSelectedObjects(e.value)}
                                dataKey="name" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} buckets"
                                responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column header="Name" body={nameBodyTemplate} ></Column>
                        <Column header="Type"  body={nameTypeBodyTemplate}></Column>
                        <Column header="Last Modify"  body={nameLastModifyBodyTemplate}></Column>
                        <Column header="Size" body={sizeBodyTemplate} ></Column>
                        <Column header="Storage Class" body={storageClassBodyTemplate}></Column>
                    </DataTable>
                </Card>
            </ShowComponents>
        </React.Fragment>
        );
}

export default observer(ViewBucketsObjects)
