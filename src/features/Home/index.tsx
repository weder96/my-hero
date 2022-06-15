import React from "react";
import { observer } from "mobx-react";
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

import Buckets from "../Buckets";
import toastStore from '../../store/toast/ToastStore'
import messageStore from '../../store/messages/MessageStore'
import ShowComponents  from '../../components/ShowComponets/ShowComponents';
import { Grid } from "@material-ui/core";


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
    
    return (
        <>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                Home:  {t('main.page.section.languages.title')}
                    <ShowComponents case={arr.length > 0}>
                        <Buckets />    
                    </ShowComponents>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Button onClick={showSuccess} label="Success" className="p-button-success mr-2" />  
                    <Button onClick={showInfo}    label="Info" className="p-button-info mr-2"/>
                    <Button onClick={showWarn}    label="Warn" className="p-button-warning mr-2" />
                    <Button onClick={showError}   label="Error" className="p-button-danger mr-2"/>
                </Grid>
                <Grid item xs={8} md={8}>
                    <Button onClick={showSuccessMessagePlain} label="Message Plain Success" className="p-button-success mr-2" /> 
                    <Button onClick={showSuccessInfoPlain} label="Message Plain Info" className="p-button-info mr-2" /> 
                    <Button onClick={showSuccessWarnPlain} label="Message Plain Warn" className="p-button-warning mr-2" /> 
                    <Button onClick={showSuccessErrorPlain} label="Message Plain Error" className="p-button-danger mr-2" />        
                </Grid>
            </Grid>    
                 
            <br/><br/>
              
        </>
    );
}

export default observer(Home)
