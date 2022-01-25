import styles from './FormsControls.module.css'


const FormControl = ({ input, meta, Type, ...props })  => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <Type  {...input}  {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea = (props) => {
    return <FormControl {...props}  Type="textarea"></FormControl>
}
export const Input = (props) => {
    return <FormControl {...props} Type="input"></FormControl>
}
