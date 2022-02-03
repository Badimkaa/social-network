import { ChangeEvent, FC, useState } from 'react'
import userPhoto from '../../../assets/images/user.png'
import { ProfileType } from '../../../types/types'
import Preloader from '../../common/Preloader/Preloader'
import ProfileDataForm from './ProfileDataForm'
import styles from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        };
    }
    let onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }
    return (
        <div className={styles.descriptionBlock}>
            <div>
                <div className={styles.fileWrapper}>
                    <img className={styles.mainPhoto} src={profile.photos.large || userPhoto} alt='mainPhoto' />
                    <input id='file' className={styles.inputFile} type='file' onChange={onMainPhotoSelected} />
                    {isOwner &&
                        <label htmlFor='file' className={styles.newFileInput}>Change photo</label>}
                </div>
            </div>
            <div className={styles.profileInfoWithStatus}>
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} status={status} updateStatus={updateStatus} goToEditMode={() => setEditMode(true)} />}
            </div>
        </div>
    )
}
type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
    status: string
    updateStatus: (status: string) => void
    aboutMe?: string
}
const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode, status, updateStatus }) => {
    return (
        <div>
            <div className={styles.fullNameAndEditWrapper}>
                <p className={styles.fullName}>{profile.fullName}</p>
                {isOwner && <button className={styles.editButton} onClick={goToEditMode} ></button>}
            </div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
            <div className={styles.profileDataItem}>
                <div className={styles.profileDataItemName}>About me:</div>
                <div>{profile.aboutMe}</div>
            </div>
            <div className={styles.profileDataItem}>
                <div className={styles.profileDataItemName}>Looking for a job:</div>
                <div>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
            </div>
            {profile.lookingForAJob &&
                <div className={styles.profileDataItem}>
                    <div className={styles.profileDataItemName}>My professional skills:</div>
                    <div>{profile.lookingForAJobDescription}</div>
                </div>}
            <div className={styles.profileDataItem}><b>Contacts:</b></div>
            <div>{Object.keys(profile.contacts)
                .filter(key => profile.contacts[key] != false && profile.contacts[key] != null)
                .map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}</div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={`${styles.profileDataItem} ${styles.profileDataItemContacts}`}>
            <div className={styles.profileDataItemName}>{contactTitle}:</div>
            <div>{contactValue}</div>
        </div>
    )
}
export default ProfileInfo