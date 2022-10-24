import * as serviceWorker from './serviceWorker';
import './index.scss';
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
serviceWorker.unregister();