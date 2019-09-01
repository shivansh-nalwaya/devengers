import React, { Component } from "react";
import CanvasJSReact from "../canvas/canvasjs.react";
import { Layout, Menu, Icon, Spin, Select } from "antd";
import history from "../history";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  state = { loading: true, data: {}, selectedFacet: "age" };
  constructor(props) {
    super(props);
    fetch(
      "http://trailblazers.southeastasia.cloudapp.azure.com:3000/feature_sets"
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ loading: false, data: res.feature_sets });
      })
      .catch(res => {
        console.log(res);
        this.setState({ loading: false });
      });
  }
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light2",
      title: {
        text: "Simple Column Chart with Index Labels"
      },
      data: [
        {
          type: "column",
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: this.state.loading
            ? []
            : Object.keys(this.state.data[this.state.selectedFacet]).map(x => {
                console.log(x, this.state.data[this.state.selectedFacet][x]);
                return {
                  label: x,
                  y: this.state.data[this.state.selectedFacet][x]
                };
              })
        }
      ]
    };

    const pieOptions = {
      animationEnabled: true,
      title: { text: "Gender wise" },
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          dataPoints: this.state.loading
            ? []
            : Object.keys(this.state.data["gender"]).map(x => {
                console.log(x, this.state.data["gender"][x]);
                return {
                  label: x,
                  y: this.state.data["gender"][x]
                };
              })
        }
      ]
    };

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            backgroundColor: "#393F53",
            minHeight: "100%",
            position: "relative"
          }}
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
                history.push("/bulk-upload");
              }}
            >
              <Icon type="upload" style={{ fontSize: 18, color: "white" }} />
              <span className="nav-text">Bulk Upload</span>
            </Menu.Item>
            <Menu.Item
              key="4"
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
            {this.state.loading ? (
              <Spin />
            ) : (
              <div>
                <Select
                  defaultValue={this.state.selectedFacet}
                  style={{ minWidth: 300 }}
                  onChange={e => {
                    this.setState({ selectedFacet: e });
                  }}
                >
                  {Object.keys(this.state.data).map(k => (
                    <Select.Option key={k}>
                      {k
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(x => x[0].toUpperCase() + x.slice(1, 100))
                        .join(" ")}
                    </Select.Option>
                  ))}
                </Select>
                <CanvasJSChart options={options} />
                <CanvasJSChart options={pieOptions} />
              </div>
            )}
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
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
