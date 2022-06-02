import "../../styles/css/global.css";

import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import PracticeStore  from '../../store/practice/PracticeStore';

import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ThemeContext } from 'styled-components';

import ShowComponents  from '../../components/ShowComponets/ShowComponents';

function About(props: any) {
    const practiceStore = useContext(PracticeStore);
    const { title } = useContext(ThemeContext);
    console.log('title ', title)

    console.log('store ', practiceStore)
    if (!practiceStore) throw Error("Store shouldn't be null");

    useEffect(() => {    
        function fetchAbout(){
            practiceStore.findByPracticeById();        
        }
        fetchAbout();
        // eslint-disable-next-line react-hooks/exhaustive-deps    
      }, []);
    const { t } = useTranslation();
    return (
            <>
            <br/>
            About:  {t('main.header.welcome')}  
            <ShowComponents case={practiceStore.practice.length > 0}>
                <Card title="" className={title === 'dark' ? 'card-dark mb-4' : 'base-card-ligth'}>
                    <DataTable value={practiceStore.practice} responsiveLayout="scroll"
                               paginator rows={10} emptyMessage="No customers found"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column field="name" header="Name"></Column>
                        <Column field="owner.displayName" header="owner"></Column>
                        <Column field="creationDate" header="creationDate"></Column>
                    </DataTable>
                </Card>
            </ShowComponents>
            </>
        );
}

export default observer(About)
