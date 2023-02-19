import React from 'react';
import './App.css';
import AlertProvider from "./components/alert/AlertProvider";
import AlertView from "./components/alert/AlertView";
import {Card, Space} from "antd";
import BannerInputForm from "./components/BannerInputForm";

function App() {
  return (
      <div className="main">
        <header className="App-header">
          <h1>This is the header</h1>
        </header>
        <AlertProvider>
          <main>
            <AlertView/>
            <Space size="small" direction="vertical" style={{width: '100%'}}>
              <Card title="Main Card">
                <h1>This is some content.</h1>
                <BannerInputForm/>
              </Card>
            </Space>
          </main>
        </AlertProvider>
      </div>
  );

}

export default App;
