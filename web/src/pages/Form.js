import { Button, Card, Form, InputNumber, Select } from "antd";
import Options from "./Options";
import React from "react";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20
        }}
      >
        <Card title="Form" style={{ width: "60%" }}>
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
                    message: "Please input your mental_health_consequence!"
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
