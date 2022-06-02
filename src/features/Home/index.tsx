import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';
import ShowComponents  from '../../components/ShowComponets/ShowComponents';
import About from "../About";
import HeaderSwitch from "../../components/Header";
import { Button } from 'primereact/button';

import toastStore from '../../store/toast/ToastStore'
import messageStore from '../../store/messages/MessageStore'


function Home(props: any) {
    const { t } = useTranslation();
    let arr =[1,2]
    
    const showSuccess = () => {
        let successMessage = 'Teste Sucesso';
        toastStore.exibirMensagensSucesso([successMessage])
    }

    const showInfo = () => {
        let successInfo = 'Teste Info';
        toastStore.exibirMensagensInfo([successInfo])
    }

    const showWarn = () => {
        let successWarn = 'Teste Warnning';
        toastStore.exibirMensagensWarn([successWarn])
    }

    const showError = () => {
        let successError = 'Teste Error';
        toastStore.exibirMensagensErro([successError])
    }

    const showSuccessMessagePlain = () => {
        let successMessage = 'Teste Message Plain';
        messageStore.exibirMensagensSucesso([successMessage])
    }

    const showSuccessWarnPlain = () => {
        let successMessage = 'Teste Warn Message Plain';
        messageStore.exibirMensagensWarn([successMessage])
    }

    const showSuccessErrorPlain = () => {
        let successMessage = 'Teste Warn Message Plain';
        messageStore.exibirMensagensErro([successMessage])
    }

    const showSuccessInfoPlain = () => {
        let successMessage = 'Teste Warn Message Plain';
        messageStore.exibirMensagensInfo([successMessage])
    }

    console.log('toggleTheme :', props.toggleTheme)
    return (
        <>
            <HeaderSwitch toggleTheme={props.toggleTheme} view={props.view}/>
            Home:  {t('main.page.section.languages.title')}
            <ShowComponents case={arr.length > 0}>
                <About />    
            </ShowComponents>
            <Button onClick={showSuccess} label="Success" className="p-button-success mr-2" />  
            <Button onClick={showInfo}    label="Info" className="p-button-info mr-2"/>
            <Button onClick={showWarn}    label="Warn" className="p-button-warning mr-2" />
            <Button onClick={showError}   label="Error" className="p-button-danger mr-2"/>     
            <br/><br/>
            <Button onClick={showSuccessMessagePlain} label="Message Plain" className="p-button-success mr-2" /> 
            <Button onClick={showSuccessInfoPlain} label="Message Plain" className="p-button-info mr-2" /> 
            <Button onClick={showSuccessWarnPlain} label="Message Plain" className="p-button-warning mr-2" /> 
            <Button onClick={showSuccessErrorPlain} label="Message Plain" className="p-button-danger mr-2" />  
        </>
    );
}

export default observer(Home)
