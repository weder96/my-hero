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

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { LocationState } from "../../shared/type/LocationState";

import { formatedDate } from "../../utils/utils";
import BreadCrumb from "../../components/BreadCrumb";
import { Grid } from "@material-ui/core";

function ViewBuckets(props: any) {
    let navigate = useNavigate();
    const [selectedObjects, setSelectedObjects] = useState(null);
    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);

    const listScope = [{ 'label': 'Amazon S3', 'link': '/s3/buckets' }, { 'label': 'Buckets', 'link': '/s3/buckets' }] 
    
    
    const  location  = useLocation();
    const { id, bucket } = location.state as LocationState;
    console.log('title ', title)
    console.log('state ', id)
    console.log('state ', bucket)
    const view = bucket;
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

   const handleClickLinkList = (event: any, key: string) => {
    event.preventDefault();       
    let keys = key.replace("%20", " ");
    let keyUrl = key.replace("%20", "+");
    let state = { id: 9,  bucket: bucket, key: keys };         
    navigate("/s3/buckets/"+bucket+"/prefix/"+keyUrl, { state })
   }

   const nameTypeBodyTemplate = (rowData: any) => {
       let isFolder = rowData.key.includes('/');
    return(
        <>
        <label className="dark-font">{isFolder ? 'Folder': 'File'}</label>
        </> 
    );
   }

   const nameLastModifyBodyTemplate = (rowData: any) => {
    return(
        <>
        <label className="dark-font"> {formatedDate(rowData.lastModified)} </label>
        </> 
    );
   }

   const ownerBodyTemplate = (rowData: any) => {
    return ( <> <label className="dark-font"> {rowData.owner} </label></>);
   }

   const storageClassBodyTemplate = (rowData: any) => {
    return(
        <>
        <label className="dark-font"> {rowData.storageClass} </label>
        </> 
    );
   }
   

   const verifyFolderByObject = (files: any) => {
    let objects: any = [] 
    files.forEach((file: any) => {
        let isFolder = file.key.includes('/');
        if(isFolder){
            let key = file.key.split("/");
            let obj = {
                "bucketName": file.bucketName ,
                "key": key[0]+ "/" ,
                "size": file.size ,
                "lastModified": file.lastModified ,
                "storageClass": file.storageClass,
                "owner": file.owner,
                "etag": file.etag
            }
            if(!veryfyObjectsContainsKey(objects, key[0]+"/")){
                objects.push(obj);
            }
        } else{
            let obj = {
                "bucketName": file.bucketName ,
                "key": file.key ,
                "size": file.size ,
                "lastModified": file.lastModified ,
                "storageClass": file.storageClass,
                "owner": file.owner,
                "etag": file.etag
            }
            if(!veryfyObjectsContainsKey(objects, file.key)){
                objects.push(obj);
            }
        }
    });
    return objects;
   }


   const veryfyObjectsContainsKey = (objects: any, key: string) : boolean => {
    let valid = false;   
    if(objects.length > 0){
        return objects.filter((elem: any) => elem.key === key).length > 0;
    }
    return valid;
   }

    useEffect(() => {    
        function fetchBucketsByName(){
            bucketStore.findObjectsByName(bucket);        
        }
        fetchBucketsByName();
        // eslint-disable-next-line react-hooks/exhaustive-deps    
      }, []);
    const { t } = useTranslation();
    return (
        <React.Fragment>
             <BreadCrumb title={view} listScope={listScope} active={view}/>
            <br/>
            <h2>{bucket}</h2> info <br/><br/>
            ViewBuckets:  {t('main.header.welcome')}  
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} className="align-left pl-2">
                    Objects({bucketStore.objects.length})<br />
                    Objects are the fundamental entities stored in Amazon S3. You can use Amazon S3 inventory to get a list of all objects in your bucket. For others to access your objects, you’ll need to explicitly grant them permissions. Learn more     
                </Grid>
                <Grid item xs={12} md={12} className="align-left pl-2">
                    <Button icon="pi pi-spinner" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Copy S3 URI" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Copy URL" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Dowload" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Open" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Delete" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Actions" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Create Folder" icon="pi pi-copy" className="p-button-outlined p-button-secondary mr-1" />
                    <Button label="Upload" icon="pi pi-cloud" onClick={handleClickUpload}/>     
                </Grid>
            </Grid>

            <br/>
            <Card title="" className={title === 'dark' ? 'card-dark mb-4' : 'base-card-ligth'}>
                    <DataTable value={verifyFolderByObject(bucketStore.objects)} 
                               selection={selectedObjects}
                               onSelectionChange={(e) => setSelectedObjects(e.value)}
                                dataKey="name" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Objects"
                                responsiveLayout="scroll"
                                emptyMessage="No Objects found.">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column header="Name" body={nameBodyTemplate} ></Column>
                        <Column header="Type"  body={nameTypeBodyTemplate}></Column>
                        <Column header="Last Modify"  body={nameLastModifyBodyTemplate}></Column>
                        <Column header="Owner" body={ownerBodyTemplate} ></Column>
                        <Column header="Storage Class" body={storageClassBodyTemplate}></Column>
                    </DataTable>
                </Card>
        </React.Fragment>
        );
}

export default observer(ViewBuckets)
