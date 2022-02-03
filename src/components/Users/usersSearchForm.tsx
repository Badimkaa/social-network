import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { FC } from 'react';
import { stopSubmit } from 'redux-form';
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm:FC<PropsType> = (props) => {
    const submit = (values: FilterType, { setSubmitting }: FormikHelpers<{ term: string; }>) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    };
    return (
        <div>
            <Formik initialValues={{ term: '' }} validate={usersSearchFormValidate} onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
