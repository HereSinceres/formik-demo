import React from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';

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

// Deep Clone
let award = JSON.parse(JSON.stringify(awardTpl));
console.log(award);
export const Award = () => (
    <div>
        <Formik
            initialValues={award}
            onSubmit={values =>
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500)
            }
            render={({values}) => (
                <Form>
                    <FieldArray
                        name="items"
                        render={arrayHelpers => (
                            <div>
                                {values.items.map((item, i) => (
                                    <div key={i}>
                                        <Field name={`items.${i}.awardName`} />
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
