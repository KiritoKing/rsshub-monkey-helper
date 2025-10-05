/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

render(
  () => <App />,
  (() => {
    const app = document.createElement('div');
    // 彻底不占位，不遮挡页面，所有交互交给内部按钮
    app.style.position = 'fixed';
    app.style.zIndex = '10000';
    app.style.pointerEvents = 'none';
    app.style.width = '0';
    app.style.height = '0';
    app.style.top = '0';
    app.style.left = '0';
    document.body.append(app);
    return app;
  })()
);
