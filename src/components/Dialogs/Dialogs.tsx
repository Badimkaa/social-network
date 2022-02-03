import React, { FC } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { DialogsPageType, DialogsType } from '../../types/types'
import { maxLengthCreator, required } from '../../utils/validators'
import DialogItem from './DialogItem/DialogItem'
import styles from './Dialogs.module.css'
import Message from './Message/Message'
let maxLength100 = maxLengthCreator(100)

type NewMessageFormType = {
    newMessageText: string
}
type PropsType = {}
const AddMessageForm: FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={styles.field} component='textarea' name='newMessageText' validate={[required, maxLength100]}
                placeholder="Enter your text" />
            <button className={styles.addMessage}>Add Message</button>
        </form>
    )
}
const AddMessageReduxForm = reduxForm<NewMessageFormType>({ form: 'dialogAddMessageForm' })(AddMessageForm)

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
    let addNewMessage = (values: NewMessageFormType) => {
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