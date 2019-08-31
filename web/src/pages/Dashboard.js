import React, { Component } from "react";
import CanvasJSReact from "../canvas/canvasjs.react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import history from "../history";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Simple Column Chart with Index Labels"
      },
      data: [
        {
          type: "column",
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 65 },
            { x: 50, y: 71 },
            { x: 60, y: 68 },
            { x: 70, y: 38 },
            { x: 80, y: 92 },
            { x: 90, y: 54 },
            { x: 100, y: 60 },
            { x: 110, y: 21 },
            { x: 120, y: 49 },
            { x: 130, y: 36 }
          ]
        }
      ]
    };

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ backgroundColor: "#393F53", height: "100vh" }}
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 22,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#2D3747",
              height: 64
            }}
          >
            <Icon type="menu"></Icon>
            Home
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ backgroundColor: "#393F53", padding: 0 }}
          >
            <Menu.Item
              key="1"
              style={styles.menuItemFirst}
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              <Icon type="home" style={{ fontSize: 16, color: "white" }} />
              <span className="nav-text">Home</span>
            </Menu.Item>
            <Menu.Item
              key="2"
              style={styles.menuItem}
              onClick={() => {
                history.push("/form");
              }}
            >
              <Icon type="plus" style={{ fontSize: 18, color: "white" }} />
              <span className="nav-text">Form</span>
            </Menu.Item>
            <Menu.Item
              key="3"
              style={styles.menuItem}
              onClick={() => {
                history.push("/");
              }}
            >
              <Icon type="logout" style={{ fontSize: 18, color: "white" }} />
              <span className="nav-text">Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#2D3747", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <CanvasJSChart options={options} />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  menuItem: {
    margin: 0,
    paddingTop: 24,
    paddingBottom: 24,
    borderBottom: "1px solid black",
    fontSize: 18,
    color: "white",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2D3747"
  },
  menuItemFirst: {
    margin: 0,
    paddingTop: 24,
    paddingBottom: 24,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: 18,
    color: "white",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2D3747"
  }
};
