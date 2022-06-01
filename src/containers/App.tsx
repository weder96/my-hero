import '../containers/App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { I18nextProvider } from 'react-i18next';
import i18n from '../_translate/i18n/i18n';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePersistedState from '../utils/usePersistedState';

import dark from '../styles/themes/dark';   
import light from '../styles/themes/light';
import GlobalStyle from '../styles/global';

import Routs from './routers/Routes';
import { Toast } from 'primereact/toast';

import { Messages } from 'primereact/messages';

import toastStore from '../store/toast/ToastStore'
import messageStore from '../store/messages/MessageStore'

const App = () => {

  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <>
     <I18nextProvider i18n={i18n}>  
        <ThemeProvider theme={theme}>
          <div className="App"> 
              <GlobalStyle/> 
              <Messages ref={elem => (messageStore.message = elem)} />
              <Toast ref={el => (toastStore.toast = el)} />
              <Routs  toggleTheme={toggleTheme} />
          </div>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
