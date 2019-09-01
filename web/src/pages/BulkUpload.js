import React, { Component } from "react";
import { Layout, Menu, Icon, message, Upload, Button, Table } from "antd";
import history from "../history";

const { Header, Content, Footer, Sider } = Layout;

const columns = [
  {
    title: "s.no",
    dataIndex: "s.no",
    key: "s.no"
  },
  {
    title: "Timestamp",
    dataIndex: "Timestamp",
    key: "Timestamp"
  },
  {
    title: "Age",
    dataIndex: "Age",
    key: "Age"
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender"
  },
  {
    title: "Country",
    dataIndex: "Country",
    key: "Country"
  },
  {
    title: "state",
    dataIndex: "state",
    key: "state"
  },
  {
    title: "self_employed",
    dataIndex: "self_employed",
    key: "self_employed"
  },
  {
    title: "family_history",
    dataIndex: "family_history",
    key: "family_history"
  },
  {
    title: "work_interfere",
    dataIndex: "work_interfere",
    key: "work_interfere"
  },
  {
    title: "no_employees",
    dataIndex: "no_employees",
    key: "no_employees"
  },
  {
    title: "remote_work",
    dataIndex: "remote_work",
    key: "remote_work"
  },
  {
    title: "tech_company",
    dataIndex: "tech_company",
    key: "tech_company"
  },
  {
    title: "benefits",
    dataIndex: "benefits",
    key: "benefits"
  },
  {
    title: "care_options",
    dataIndex: "care_options",
    key: "care_options"
  },
  {
    title: "wellness_program",
    dataIndex: "wellness_program",
    key: "wellness_program"
  },
  {
    title: "seek_help",
    dataIndex: "seek_help",
    key: "seek_help"
  },
  {
    title: "anonymity",
    dataIndex: "anonymity",
    key: "anonymity"
  },
  {
    title: "leave",
    dataIndex: "leave",
    key: "leave"
  },
  {
    title: "mental_health_consequence",
    dataIndex: "mental_health_consequence",
    key: "mental_health_consequence"
  },
  {
    title: "phys_health_consequence",
    dataIndex: "phys_health_consequence",
    key: "phys_health_consequence"
  },
  {
    title: "coworkers",
    dataIndex: "coworkers",
    key: "coworkers"
  },
  {
    title: "supervisor",
    dataIndex: "supervisor",
    key: "supervisor"
  },
  {
    title: "mental_health_interview",
    dataIndex: "mental_health_interview",
    key: "mental_health_interview"
  },
  {
    title: "phys_health_interview",
    dataIndex: "phys_health_interview",
    key: "phys_health_interview"
  },
  {
    title: "mental_vs_physical",
    dataIndex: "mental_vs_physical",
    key: "mental_vs_physical"
  },
  {
    title: "obs_consequence",
    dataIndex: "obs_consequence",
    key: "obs_consequence"
  },
  {
    title: "comments",
    dataIndex: "comments",
    key: "comments"
  },
  {
    title: "Treatment required",
    dataIndex: "treatment_required",
    key: "treatment_required"
  }
];

export default class App extends Component {
  state = { showTable: false, data: [] };

  render() {
    const props = {
      name: "file",
      action: "http://localhost:3000/feature_sets/bulk_upload",
      headers: {
        authorization: "authorization-text"
      },
      onChange: info => {
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          console.log(info);
          this.setState({
            showTable: true,
            data: info.file.response.feature_sets
          });
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
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
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
            {this.state.showTable && (
              <Table columns={columns} dataSource={this.state.data} />
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
