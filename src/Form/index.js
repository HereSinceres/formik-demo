import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, FieldArray, getIn } from "formik";

let awardTpl = {
  items: [
    {
      awardName: "",
      items: [
        {
          awardWinningTime: "",
          session: "",
          awardName: "",
          awardWinningWork: "",
          remarks: ""
        }
      ]
    }
  ]
};

class CustomInputComponent extends Component {
  render() {
    let { field, form, ...props } = this.props;
    let { touched, errors } = form;
    return (
      <div className="title">
        <label> 奖项类型：</label>
        <input className="input" type="text" {...field} {...props} />
        {getIn(touched, field.name) &&
          getIn(errors, field.name) && (
            <span className="error">{getIn(errors, field.name)}</span>
          )}
      </div>
    );
  }
}

// Deep Clone
let award = JSON.parse(JSON.stringify(awardTpl));
const validate = value => {
  let errorMessage;
  if (value.length === 0) {
    errorMessage = "标题不可为空";
  }
  return errorMessage;
};
export const Award = () => (
  <div className="">
    <Formik
      initialValues={award}
      onSubmit={(values, formikBag) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
        console.log(values, formikBag);
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form>
          <FieldArray
            name="items"
            render={arrayHelpers => (
              <div>
                {values.items.map((item, i) => (
                  <div key={i} className="mik-form-item">
                    <Field
                      name={`items.${i}.awardName`}
                      component={CustomInputComponent}
                      placeholder="award  Name"
                      validate={validate}
                    />
                    <FieldArray
                      name={`items.${i}.items`}
                      render={arrayHelpers => (
                        <div>
                          <table className="mdl-data-table mdl-js-data-table   mdl-shadow--2dp">
                            <tbody>
                              <tr>
                                <th>获奖时间</th>
                                <th>届次</th>
                                <th>奖项名称</th>
                                <th>获奖作品</th>
                                <th>备注</th>
                                <th>操作</th>
                              </tr>
                              {values.items[i].items.map((item, j) => (
                                <tr key={j}>
                                  <td>
                                    <Field
                                      name={`items.${i}.items.${j}.awardWinningTime`}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      name={`items.${i}.items.${j}.session`}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      name={`items.${i}.items.${j}.awardName`}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      name={`items.${i}.items.${j}.awardWinningWork`}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      name={`items.${i}.items.${j}.remarks`}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn-txt"
                                      type="button"
                                      onClick={() => arrayHelpers.remove(j)}
                                    >
                                      删除项
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td colSpan="6">
                                  <button
                                    className="btn-txt"
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.push(
                                        awardTpl.items[0].items[0]
                                      )
                                    }
                                  >
                                    添加项
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    />
                    <button
                      className="btn-txt btn-del-item"
                      type="button"
                      onClick={() => arrayHelpers.remove(i)}
                    >
                      删除项
                    </button>
                  </div>
                ))}
                <button
                  className="btn-txt btn-add-item"
                  type="button"
                  onClick={() => arrayHelpers.push(awardTpl.items[0])}
                >
                  添加项
                </button>
              </div>
            )}
          />

          <button className="btn-txt " type="submit">
            保存
          </button>
        </Form>
      )}
    />
  </div>
);
export default Award;
