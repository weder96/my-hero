import axios from 'axios';
import appStore from '../../store/loading/LoadingStore'
import { getToken, logout } from "../auth/AuthService";

const apiLocal = axios.create({
    baseURL: 'http://localhost:9090'
})

apiLocal.interceptors.request.use(function (config) {
    appStore.incrementLoading();
    const token = getToken();    
    if (token) {
      // config.headers['Accept'] = "*/*";
      // config.headers["Access-Control-Allow-Origin"] = "*";  
      // config.headers["Access-Control-Allow-Methods"] = "DELETE, POST, GET, OPTIONS";
      // config.headers["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With";
      //config.headers["Content-type"] = "Application/json";
      // config.headers["Access-Control-Allow-Credentials"] = 'true';
      //config.headers['Authorization'] = `Bearer ${token}`;
    }    
    return config;
  }, function (error) {
    console.log('error request :', error)
    document.body.classList.remove('loading-indicator');    
    return Promise.reject(error);
  });


  apiLocal.interceptors.response.use(function (response) {
    appStore.decrementLoading();
    return response;
  }, function (error) {
    console.log('error response :', error)
    document.body.classList.remove('loading-indicator');    
     if (error.response && error.response.status === 403) {           
     logout();        
     window.location.href = "/login";
    }
    return Promise.reject(error);
  });



export default apiLocal;