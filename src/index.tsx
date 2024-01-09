import Popup from './popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <Popup />
);
