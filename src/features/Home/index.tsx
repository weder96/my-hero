import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';
import ShowComponents  from '../../components/ShowComponets/ShowComponents';
import About from "../About";
import HeaderSwitch from "../../components/Header";


function Home(props: any) {
    const { t } = useTranslation();
    let arr =[1,2]
    return (
        <>
            <HeaderSwitch toggleTheme={props.toggleTheme} view={props.view}/>
            Home:  {t('main.page.section.languages.title')}
            <ShowComponents case={arr.length > 0}>
                <About />            
            </ShowComponents>
        </>
    );
}

export default observer(Home)
