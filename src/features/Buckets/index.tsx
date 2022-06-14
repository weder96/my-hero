import "../../styles/css/global.css";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import BucketStore  from '../../store/buckets/BucketStore';

import Link from '@material-ui/core/Link';

import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ThemeContext } from 'styled-components';

import ShowComponents  from '../../components/ShowComponets/ShowComponents';
import { Outlet, useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { Button } from "primereact/button";

function Buckets(props: any) {
    let navigate = useNavigate();
    const [selectedProducts, setSelectedProducts] = useState(null);
    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);
    console.log('title ', title)
    console.log('store ', bucketStore)
    if (!bucketStore) throw Error("Store shouldn't be null");

    const handleClickLink = (event: any) => {
        event.preventDefault();                
        navigate("/upload")
    }

    const nameBodyTemplate = (rowData: any) => {
        return(
            <>
            <Link onClick={(e) => handleClickLinkList(e, rowData.name)}>{rowData.name}</Link>
            </> 
        );
   }

   const handleClickLinkList = (event: any, bucket: string) => {
    event.preventDefault();                
    navigate("/s3/buckets/"+bucket+"/objects", { state: { id: 7, bucket: bucket } })
   }

   const handleClickCreateBucket = (event: any) => {
    event.preventDefault();                
    navigate("/s3/create/buckets")
   }
   const nameAwsRegionBodyTemplate = (rowData: any) => {
    return(
        <>
        <label className="dark-font">US East (N. Virginia) us-east-1</label>
        </> 
    );
   }

   const nameAwsAccessBodyTemplate = (rowData: any) => {
    return(
        <>
        <label className="dark-font">Não informado</label>
        </> 
    );
   }

    useEffect(() => {    
        function fetchTickets(){
            bucketStore.findByBuckets();        
        }
        fetchTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps    
      }, []);
    const { t } = useTranslation();
    return (
            <>
            <BreadCrumb />
            <br/>
            Buckets ({bucketStore.buckets.length}) Info <br/>
            Buckets are containers for data stored in S3. Learn more
            <Button icon="pi pi-spinner" className="p-button-outlined p-button-secondary"/>
            <Button label="Copy ARN" icon="pi pi-copy" className="p-button-outlined p-button-secondary" />
            <Button label="Empty" className="p-button-outlined p-button-secondary" />
            <Button label="Delete" className="p-button-outlined p-button-secondary" />
            <Button label="Create Bucket" onClick={handleClickCreateBucket}/>
            <br/>
            <ShowComponents case={bucketStore.buckets.length > 0}>
                <Card title="" className={title === 'dark' ? 'card-dark mb-4' : 'base-card-ligth'}>
                    <DataTable value={bucketStore.buckets} 
                               selection={selectedProducts}
                               onSelectionChange={(e) => setSelectedProducts(e.value)}
                                dataKey="name" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} buckets"
                                responsiveLayout="scroll">
                        <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column header="Name" body={nameBodyTemplate}></Column>
                        <Column header="AWS Region"  body={nameAwsRegionBodyTemplate}></Column>
                        <Column header="Access"  body={nameAwsAccessBodyTemplate}></Column>
                        <Column header="Owner" field="owner.displayName" ></Column>
                        <Column header="Creation Date" field="creationDate"></Column>
                    </DataTable>
                </Card>
            </ShowComponents>
            <Link onClick={(e) => handleClickLink(e)}> Upload </Link>
            About:  {t('main.header.welcome')}  
            <Outlet />
            </>
        );
}

export default observer(Buckets)
