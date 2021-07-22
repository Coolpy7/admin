// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import Web from './components/web';
// import * as serviceWorker from './serviceWorker';
// import { PageContainer } from '@ant-design/pro-layout';

// ReactDOM.render(
//   <PageContainer>
//    <Web />,
//   document.getElementById('root')
//   </PageContainer>
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import HookMqtt from './components/HookMqtt';
import * as serviceWorker from './serviceWorker';
// Hook or Class
// import ClassMqtt from './components/Class/'
import './web.css';

function App() {
  return (
    <div className="App">
      <HookMqtt />
      {/* Hook or Class */}
      {/* <ClassMqtt /> */}
    </div>
  );
}

export default App;

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
