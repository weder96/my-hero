import "../../styles/css/global.css";

import { observer } from "mobx-react";
import { useTranslation } from 'react-i18next';

function CreateBucket(props: any) {
    const { t } = useTranslation();
    return (
            <>
            <br/>
            Create Bucket:  {t('main.header.welcome')}  
            </>
        );
}

export default observer(CreateBucket)
