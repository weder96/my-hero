import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import PracticeStore  from '../../store/practice/PracticeStore';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import ShowComponents  from '../../components/ShowComponets/ShowComponents';

function About(props: any) {
    const practiceStore = useContext(PracticeStore);
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
                <div className="card">
                    <DataTable value={practiceStore.practice} responsiveLayout="scroll">
                        <Column field="name" header="Name"></Column>
                        <Column field="owner.displayName" header="owner"></Column>
                        <Column field="creationDate" header="creationDate"></Column>
                    </DataTable>
                </div>
            </ShowComponents>
            </>
        );
}

export default observer(About)
