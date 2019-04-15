import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from '@rmwc/theme'
import '@material/theme/dist/mdc.theme.css'
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/button/dist/mdc.button.css';
import '@material/chips/dist/mdc.chips.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';



const pallete = 
    {
        "palette": {
            "primary1Color": "#00e676",
            "primary2Color": "#7cb342",
            "primary3Color": "#689f38",
            "accent2Color": "#43a047",
            "accent1Color": "#dcedc8",
            "accent3Color": "rgba(255, 255, 255, 0.87)",
            "textColor": "#ffebee",
            "secondaryTextColor": "#c5e1a5",
            "alternateTextColor": "#2e7d32",
            "canvasColor": "rgba(0, 0, 0, 0.9)",
            "borderColor": "#000000",
            "disabledColor": "#c8e6c9",
            "pickerHeaderColor": "#4caf50"
        }
    }

ReactDOM.render(
    (
        <ThemeProvider options={{
            primary: '#2ad354',
            secondary:  '#6ac4a5',
            error: '#b00020',
            background: '#fff',
            surface: '#fff',
            onPrimary: 'rgba(255, 255, 255, 1)',
            onSecondary: 'rgba(255, 255, 255, 1)',
            onSurface: 'black',
            onError: '#fff',
            
        
            
          }}>
            <Router basename={process.env.PUBLIC_URL}>
      
                 {console.log('fuck github pages ' + process.env.PUBLIC_URL)}
                    <App />
                </Router>
        </ThemeProvider>
        
     
    )
     , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
