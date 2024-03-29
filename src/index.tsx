import * as serviceWorker from './serviceWorker';
import './index.scss';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app/App';
import { store } from './store/store';
import { HashRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);
serviceWorker.unregister();
