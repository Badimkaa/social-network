import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import React, { FC, FormEventHandler } from 'react'
import { Field, InjectedFormProps, reduxForm, SubmitHandler } from 'redux-form'
import { Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators'
import { DialogsPageType, DialogsType } from '../../types/types'
let maxLength100 = maxLengthCreator(100)
type AddMessageFormPropsType = {
    handleSubmit: FormEventHandler<HTMLFormElement>
}
type FullAddMessageType = InjectedFormProps<AddMessageFormPropsType>
const AddMessageForm: FC<FullAddMessageType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={styles.field} component='textarea' name='newMessageText' validate={[required, maxLength100]}
                placeholder="Enter your text" />
            <button className={styles.addMessage}>Add Message</button>
        </form>
    )
}
const AddMessageReduxForm = reduxForm<AddMessageFormPropsType>({ form: 'dialogAddMessageForm' })(AddMessageForm)

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    dialogs: Array<DialogsType>
    addMessage: (text: string) => void
    
}

const Dialogs: FC<DialogsPropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(el => {
        return <DialogItem ava={el.ava} name={el.name} key={el.id} id={el.id} />
    })
    let messagesElements = props.dialogsPage.messages.map(el => {
        return <Message message={el.message} personId={el.personId} key={el.id} dialogs={props.dialogs} />
    })
    let addNewMessage = (values:any) => {
        props.addMessage(values.newMessageText)
    }
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs