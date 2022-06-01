import { withTranslation } from 'react-i18next';
import team_3epn from '../../_assets/imgError/team_3epn.svg';

import Typography from '@material-ui/core/Typography';

import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Error500(props: any) {    
    let navigate = useNavigate();

    const goPageInitial = (e: any) => {
        e.preventDefault();
        navigate("/")
    }

    return (
        <>
            <div id="page-base">   
                <div id="page-base-404">         
                    <img src={team_3epn} alt="" />
                    <div className="text-404">
                    <Typography variant="subtitle1" gutterBottom>Sorry, It's not you. It's us </Typography>
                    </div>
                    <Typography variant="subtitle1" gutterBottom>
                         We're experencing an internal Server Problem
                         Please try again later
                    </Typography>
                    <div className="btn-404">
                        <Button label="Go Back" icon="pi pi-arrow-left" onClick={(e) => goPageInitial(e)} />
                    </div>
                </div>    
            </div>
        </>
    )
}

export default  withTranslation()(Error500)