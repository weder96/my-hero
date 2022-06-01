import { withTranslation } from 'react-i18next';
import img404 from '../../_assets/imgError/img404.svg';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';


function NotFound(props: any) {    
    let navigate = useNavigate();

    const goPageInitial = (e: any) => {
        e.preventDefault();
        navigate("/")
    }

    return (
        <>
            <div id="page-base">   
                <div id="page-base-404">         
                    <img src={img404} alt="" />
                    <div className="text-404">
                        Oops! We can't find a page you are lookink for
                    </div>
                    <div className="btn-404">
                        <Button label="Go Back" icon="pi pi-arrow-left" onClick={(e) => goPageInitial(e)} />
                    </div>
                </div>    
            </div>
        </>
    )
}

export default  withTranslation()(NotFound)