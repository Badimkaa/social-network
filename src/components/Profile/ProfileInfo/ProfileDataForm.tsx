import { FC } from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { ProfileType } from "../../../types/types"
import styles from '../../common/FormsControls/FormsControls.module.css'
import profileData from './ProfileInfo.module.css'
type PropsType = {
    profile: ProfileType

}
const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <button className={profileData.saveButton}></button>
            <div className={profileData.profileDataItem}>
                <div className={profileData.profileDataItemName}>Full name:</div>
                <Field className={profileData.field} component='input' name='fullName' placeholder='Enter your full name'></Field>
            </div>
            <div className={profileData.profileDataItem}>
                <div className={profileData.profileDataItemName}>About me:</div>
                <Field className={profileData.field} component='textarea' name='aboutMe' placeholder='tell about yourself ' />
            </div>
            <div className={profileData.profileDataItem}>
                <div className={profileData.profileDataItemName}>Looking for a job:</div>
                <Field component='input' type='checkbox' name='lookingForAJob' />
            </div>
            <div className={profileData.profileDataItem}>
                <div className={profileData.profileDataItemName}>My professional skills:</div>
                <Field className={profileData.field} component='textarea' name='lookingForAJobDescription' placeholder='My professional skills' />
            </div>
            <div>Contacts:</div>
            <div>{Object.keys(profile.contacts).map(key => {
                return <div className={profileData.profileDataItem} key={key}>
                    <div className={profileData.profileDataItemName}>{key}:</div>
                    <Field className={profileData.field} component='input' name={`contacts.${key}`} />
                </div>
            })}</div>
        </form >
    )
}
const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)
export default ProfileDataReduxForm