import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { Container, HeaderView } from './styles';

interface Props {
    toggleTheme(): void;
    view: string;
}

const HeaderSwitch: React.FC<Props> = ({ toggleTheme, view }) => {
    const { title } = useContext(ThemeContext);

    return (
        <Container>
            <HeaderView>{view}</HeaderView>                                                
        <Switch
            onChange={toggleTheme}
            checked={title === 'dark'}
            handleDiameter={28}
            offColor="#08f"
            onColor="#41b883"
            offHandleColor="#0ff"
            onHandleColor="#08f"
            height={30}
            width={60}
            borderRadius={50}
            activeBoxShadow="0px 0px 1px 2px"
            uncheckedIcon={
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color:"#FFFFFF",                
                paddingRight: 2
                }}
            >
            </div>
            }
            checkedIcon={false}
            uncheckedHandleIcon={
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 18,
                backgroundColor: "#41b883",
                borderRadius: "50%"
                }}
            >
            <i className="fa fa-sun-o" aria-hidden="true"></i>
            </div>
            }
            checkedHandleIcon={
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "#FFFFFF",
                fontSize: 18
                }}
            >
            <i className="fa fa-moon-o" aria-hidden="true"></i>
            </div>
            }
            className="react-switch"
            id="small-radius-switch"
        />
        </Container>
    );
};

export default HeaderSwitch;
