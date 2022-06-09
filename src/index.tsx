import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/redux';
import { App } from './App';


ReactDOM.render(
    <Provider store={store}>
        <App />,
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
