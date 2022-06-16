import "../../styles/css/global.css";

import React, { useContext } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { observer } from "mobx-react";
import {useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Link from '@material-ui/core/Link';

import { ThemeContext } from 'styled-components';

const BreadCrumbDemo = (props: any) => {
    let navigate = useNavigate();
    const { title } = useContext(ThemeContext);

    console.log('title :', title)

    const { listScope, active } = props;
    const handleClickLink = (event: any, url: string) => {
        event.preventDefault();                
        navigate(url)
    }

    return (
        <div className={title === 'dark' ? 'breadcrumbs-dark ml-2' : 'breadcrumbs ml-2'}>              
            <Breadcrumbs aria-label="breadcrumb">
                { listScope.map((item: any, i: number) => 
                    <div key={i}> 
                        <Link color="inherit" className="tamFixed cursor-link" onClick={(e) => handleClickLink(e, item.link)}>{item.label}</Link>                                   
                    </div>
                )}
                <Typography className="tamFixed">{active.title || active}</Typography>
            </Breadcrumbs>
        </div>    
    );
}
export default observer(BreadCrumbDemo);
