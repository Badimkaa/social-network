import { connect } from 'react-redux'
import { compose } from 'redux'
import { reset } from 'redux-form'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { addMessageActionCreator, } from '../../redux/dialogs-reducer'
import { AppStateType } from '../../redux/redux-store'
import { DialogsPageType, DialogsType, MessagesType } from '../../types/types'
import Dialogs from './Dialogs'


type MapStatePropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchPropsType = {
    addMessage: (text: string) => void
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        addMessage: (newMessageText: string) => {
            dispatch(addMessageActionCreator(newMessageText))
            dispatch(reset('dialogAddMessageForm'))
        }
        
    }
}

export default compose(connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
// let AuthRedirectComponent = withAuthRedirect(Dialogs)


// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

// DialogsContainer