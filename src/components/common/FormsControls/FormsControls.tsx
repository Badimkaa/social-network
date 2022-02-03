import React, { FC } from 'react'
import { WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import styles from './FormsControls.module.css'
type FormControlPropsType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    Type: keyof JSX.IntrinsicElements;
}
const FormControl: FC<FormControlPropsType> = ({ input, meta, Type, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <Type  {...input}  {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea: FC<WrappedFieldProps> = (props) => {
    return <FormControl {...props} Type="textarea"></FormControl>
}
export const Input: FC<WrappedFieldProps> = (props) => {
    return <FormControl {...props} Type="input"></FormControl>
}
