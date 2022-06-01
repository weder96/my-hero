import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import PracticeStore  from '../../store/practice/PracticeStore';

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
                {
                practiceStore.practice ? practiceStore.practice.map((practice: any, indx: number) => 
                    <div key={indx}>
                       id: {practice.id} <br/>
                       author: {practice.author} <br/>
                       title: {practice.title}<br/><br/>
                    </div> 
                ): []
            }      
            </>
        );
}

export default observer(About)
