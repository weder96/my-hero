import "../../styles/css/global.css";

import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { observer } from "mobx-react";

const BreadCrumbDemo = () => {
    const items = [
        {label: 'S3'},
        {label: 'Buckets'}
    ];

    const home = { icon: 'pi pi-home', url: '/' }

    return (
        <div>
            <BreadCrumb model={items} home={home} />
        </div>
    );
}
export default observer(BreadCrumbDemo);
