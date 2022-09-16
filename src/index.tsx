import { createRoot } from 'react-dom/client';

import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);
