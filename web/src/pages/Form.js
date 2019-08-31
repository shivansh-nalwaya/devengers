import { Button, Card, Form, InputNumber, Select } from "antd";
import Options from "./Options";
import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import history from "../history";

const { Header, Content, Footer, Sider } = Layout;

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

class RegistrationForm extends React.Component {
  state = { loading: false };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        fetch("http://localhost:3000/feature_sets", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ feature_set: { data: values } })
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ loading: false });
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      layout: "horizontal",
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="10"
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Card title="Form" style={{ width: "90%" }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="Age">
                    {getFieldDecorator("age", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your age!"
                        }
                      ]
                    })(<InputNumber />)}
                  </Form.Item>
                  <Form.Item label="Gender">
                    {getFieldDecorator("gender", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your gender!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.gender.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Country">
                    {getFieldDecorator("country", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your country!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.country.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="State">
                    {getFieldDecorator("state", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your state!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.states.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Self Employed">
                    {getFieldDecorator("self_employed", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your state!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.self_employed.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Family History">
                    {getFieldDecorator("family_history", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your family_history!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.family_history.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Work Interfere">
                    {getFieldDecorator("work_interfere", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your work_interfere!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.work_interfer.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="No. of employees">
                    {getFieldDecorator("no_employees", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your no_employees!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.no_employee.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Remote Work">
                    {getFieldDecorator("remote_work", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your remote_work!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.remote_work.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Tech Company">
                    {getFieldDecorator("tech_company", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your tech_company!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.tech_company.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Benefits">
                    {getFieldDecorator("benefits", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your benefits!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.benifits.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Care Options">
                    {getFieldDecorator("care_options", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your care_options!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.care_options.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Wellness Program">
                    {getFieldDecorator("wellness_program", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your wellness_program!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.welness_program.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Seek Help">
                    {getFieldDecorator("seek_help", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your seek_help!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.seek_help.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Anonymity">
                    {getFieldDecorator("anonymity", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your anonymity!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.annoymity.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Leave">
                    {getFieldDecorator("leave", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your leave!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.leave.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Mental Health Consequence">
                    {getFieldDecorator("mental_health_consequence", {
                      rules: [
                        {
                          required: true,
                          message:
                            "Please input your mental_health_consequence!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.mental_health_consequecnces.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Physical Health Consequence">
                    {getFieldDecorator("phys_health_consequence", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phys_health_consequence!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.phy_health_consequeces.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Coworkers">
                    {getFieldDecorator("coworkers", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your coworkers!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.coworker.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Supervisor">
                    {getFieldDecorator("supervisor", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your supervisor!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.supervisor.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Mental Health Interview">
                    {getFieldDecorator("mental_health_interview", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your mental_health_interview!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.mental_health_interview.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Physical Health Interview">
                    {getFieldDecorator("phys_health_interview", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phys_health_interview!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.phy_health_interview.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Mental vs Physical">
                    {getFieldDecorator("mental_vs_physical", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your mental_vs_physical!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.mental_vs_physcial.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Obs Consequence">
                    {getFieldDecorator("obs_consequence", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your obs_consequence!"
                        }
                      ]
                    })(
                      <Select>
                        {Options.obs_consequences.map(o => (
                          <Select.Option key={o}>{o}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      loading={this.state.loading}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
