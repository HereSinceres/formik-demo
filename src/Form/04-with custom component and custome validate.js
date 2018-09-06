import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form, Field, FieldArray, getIn} from 'formik';

let awardTpl = {
    items: [
        {
            awardName: '',
            items: [
                {
                    awardWinningTime: '',
                    session: '',
                    awardName: '',
                    awardWinningWork: '',
                    remarks: ['']
                }
            ]
        }
    ]
};

//     field, // { name, value, onChange, onBlur }
//     form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
class CustomInputComponent extends Component {
    render() {
        let {field, form, ...props} = this.props;
        let {touched, errors} = form;
        console.log(getIn(errors, field.name));
        return (
            <div>
                <input type="text" {...field} {...props} />
                {getIn(touched, field.name)  &&
                    getIn(errors, field.name) && (
                        <div className="error">{getIn(errors, field.name)}</div>
                    )}
            </div>
        );
    }
}

// Deep Clone
let award = JSON.parse(JSON.stringify(awardTpl));
const validate = value => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errorMessage = 'Invalid email address';
    }
    return errorMessage;
};
export const Award = () => (
    <div>
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
                    {JSON.stringify(errors)}
                    <FieldArray
                        name="items"
                        render={arrayHelpers => (
                            <div>
                                {values.items.map((item, i) => (
                                    <div key={i}>
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
                                                    {values.items[i].items.map((item, j) => (
                                                        <div key={j}>
                                                            <Field
                                                                name={`items.${i}.items.${j}.awardWinningTime`}
                                                            />
                                                            <Field
                                                                name={`items.${i}.items.${j}.session`}
                                                            />
                                                            <Field
                                                                name={`items.${i}.items.${j}.awardName`}
                                                            />
                                                            <Field
                                                                name={`items.${i}.items.${j}.awardWinningWork`}
                                                            />

                                                            <FieldArray
                                                                name={`items.${i}.items.${j}.remarks`}
                                                                render={arrayHelpers => (
                                                                    <div>
                                                                        {values.items[i].items[
                                                                            j
                                                                        ].remarks.map((item, k) => (
                                                                            <div key={k}>
                                                                                <Field
                                                                                    name={`items.${i}.items.${j}.remarks.${k}`}
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        arrayHelpers.remove(
                                                                                            k
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    -
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                arrayHelpers.push(
                                                                                    awardTpl
                                                                                        .items[0]
                                                                                        .items[0]
                                                                                        .remarks[0]
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    arrayHelpers.remove(j)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            arrayHelpers.push(
                                                                awardTpl.items[0].items[0]
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(i)}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => arrayHelpers.push(awardTpl.items[0])}
                                >
                                    +
                                </button>
                            </div>
                        )}
                    />

                    <button type="submit">Submit</button>
                </Form>
            )}
        />
    </div>
);
export default Award;
