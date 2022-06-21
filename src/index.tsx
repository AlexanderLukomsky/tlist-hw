import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { App } from './App/App';
import { Provider } from 'react-redux';
import { store } from './store/store';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
