import { FC, FormEventHandler } from "react"
import { connect, Matching } from "react-redux"
import { Redirect } from "react-router"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { login } from "../../redux/auth-reduceer"
import { AppStateType } from "../../redux/redux-store"
import { required } from "../../utils/validators"
import { Input } from "../common/FormsControls/FormsControls"
import styles from '../common/FormsControls/FormsControls.module.css'
import loginStyles from './Login.module.css'
// (props) меняем на ({handlesubmit, error}), что позволяет писать не props.error, а просто error
type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<FormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
    = ({ handleSubmit, error, captchaUrl }) => {
        return (
            <form className={loginStyles.form} onSubmit={handleSubmit}>
                <div>
                    <Field className={loginStyles.field} component={Input} name='email' placeholder='Email' validate={[required]} />
                </div>
                <div>
                    <Field className={loginStyles.field} component={Input} name='password' placeholder='Password' type='password' validate={[required]} />
                </div>
                <div className={loginStyles.rememberMeBlock}>
                    <p className={loginStyles.rememberMeText}>Remember me: </p>
                    <Field className={loginStyles.checkBox} component='input' name='rememberMe' type="checkbox" />
                </div>
                {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                {captchaUrl && <Field component='input' name='captcha' validate={[required]} placeholder='Symbols from image' />}
                <div>
                    <button className={loginStyles.button}>Login</button>
                    {error && <div className={`${styles.formSummaryError} ${styles.loginError}`}>{error}</div>}
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return (
        <div className={loginStyles.loginContainer}>
            <p className={loginStyles.login}>Login</p>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
        </div>
    )
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {

    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export default connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(mapStateToProps, { login })(Login)