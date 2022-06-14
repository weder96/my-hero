import "../../styles/css/global.css";

import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

import { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import BucketStore  from '../../store/buckets/BucketStore';
import toastStore  from '../../store/toast/ToastStore';
import { ThemeContext } from 'styled-components';
import { useLocation } from "react-router-dom";
import { LocationState } from "../../shared/type/LocationState";
import { autorun } from "mobx";

function Upload(props: any) {

    const [totalSize, setTotalSize] = useState(0);
    let fileUploadRef : any;

    const onTemplateSelect = (e: any) => {
        let _totalSize = totalSize;
        console.log('onTemplateSelect', e)
        if(e.files.length > 0){
            e.files && [...e.files].forEach((file: any) => {
                _totalSize += file.size;
            });
        }

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e: any) => {
        let _totalSize = 0;
        console.log('onTemplateUpload :', e);
        [...e.files].forEach((file: any) => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        // toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file:any, callback: any) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options: any) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file: any, props: any) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const uploadInvoice = (invoiceFile: any) => {
        console.log('uploadInvoice :', invoiceFile);
        bucketStore.uploadFilesS3(invoiceFile, bucket);
        reactToStuff();
    };

    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};



    const bucketStore = useContext(BucketStore);
    const { title } = useContext(ThemeContext);
    const  location  = useLocation();
    const { id, bucket } = location.state as LocationState;
    console.log('store ', bucketStore, id, title)
    
    if (!bucketStore) throw Error("Store shouldn't be null");

    const reactToStuff = autorun(() => {
        console.log("New Value: ", bucketStore.isMobile);
        if(bucketStore.isMobile === true){
            bucketStore.setIsMobile(false);
            let successMessage = 'Upload Feito!!!';
            toastStore.exibirMensagensSucesso([successMessage])
            clearUploadSend();
        }
    });


    const clearUploadSend = () => {
        console.log('fileUploadRef ', fileUploadRef)
        if(fileUploadRef){
            fileUploadRef.current.clear();
        }
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
            <>
            <br/>
             <h5>Upload:  {t('main.header.welcome')} </h5>
                <FileUpload 
                    ref={(el => fileUploadRef = el)}
                    name="demo[]"
                    multiple 
                    accept="image/*" 
                    maxFileSize={1000000}
                    customUpload={true}
                    uploadHandler={uploadInvoice}
                    onUpload={onTemplateUpload} 
                    onSelect={onTemplateSelect} 
                    onError={onTemplateClear} 
                    onClear={onTemplateClear}
                    headerTemplate={headerTemplate} 
                    itemTemplate={itemTemplate} 
                    emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} 
                    uploadOptions={uploadOptions} 
                    cancelOptions={cancelOptions} 
                /> 
            </>
        );
}

export default observer(Upload)
