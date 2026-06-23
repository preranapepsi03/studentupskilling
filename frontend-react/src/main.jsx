import { render } from 'preact';
import { App } from './app.jsx';
import './index.css'; // <--- MAKE SURE THIS LINE IS EXACTLY HERE!

render(<App />, document.getElementById('app'));