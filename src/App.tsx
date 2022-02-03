// import Login from './components/Login/Login';
import React, { ComponentType, FC, lazy, Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
// import News from './components/News/News';
// import Music from './components/Music/Music';
// import Settings from './components/Settings/Settings';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';

const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const Login = lazy(() => import('./components/Login/Login'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-container">
        <HeaderContainer />
        <Navbar />
        <div className='content'>
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Route path='/' exact><Redirect to='/profile' /></Route>
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={() => <DialogsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/news' render={() => <News />} />
              <Route path='/music' render={() => <Music />} />
              <Route path='/settings' render={() => <Settings />} />
              <Route path='/login' render={() => <Login />} />
              <Route render={() => <div>404</div>} />
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  }
}
const AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);
const MainApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}
export default MainApp
// export default compose(withRouter,connect(mapStateToProps, { initializeApp }))(App);
