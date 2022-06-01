import { withTranslation } from 'react-i18next';
import security_o890 from '../../_assets/imgError/security_o890.svg';
import Typography from '@material-ui/core/Typography';

import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Error403(props: any) {    
    let navigate = useNavigate();

    const goPageInitial = (e: any) => {
        e.preventDefault();
        navigate("/")
    }

    return (
        <>
            <div id="page-base">   
                <div id="page-base-404">         
                    <img src={security_o890} alt="" width="40%"/>
                    <div className="text-404">
                        <Typography variant="subtitle1" gutterBottom>We are Sorry...</Typography>
                    </div>
                    <Typography variant="subtitle1" gutterBottom>
                         The page you're trying to access has restricted access
                         Please refer to your system administrator
                    </Typography>
                    <div className="btn-404">
                        <Button label="Go Back" icon="pi pi-arrow-left" onClick={(e) => goPageInitial(e)} />
                    </div>
                </div>    
            </div>
        </>
    )
}

export default  withTranslation()(Error403)