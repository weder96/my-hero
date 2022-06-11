import "../../styles/css/global.css";

import { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

import { useContext } from "react";
import PracticeStore  from '../../store/practice/PracticeStore';
import { ThemeContext } from 'styled-components';

function Upload(props: any) {
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
            Upload:  {t('main.header.welcome')}  
            </>
        );
}

export default observer(Upload)
