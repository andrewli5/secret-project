import ReactDOM from 'react-dom/client';
import App from './App';
import { loadUiTheme } from './uiThemePreference';

// Set before the first render so theme-scoped CSS applies from the first frame.
document.documentElement.dataset.uiTheme = loadUiTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
