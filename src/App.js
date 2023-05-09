import React, { Component } from 'react';
import PhotoContextProvider from './context/PhotoContext';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Item from './components/Item';
import Search from './components/Search';
import NotFound from './components/NotFound';

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <PhotoContextProvider>
        <HashRouter basename='/'>
          <div className='container'>
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path='/'
                render={() => <Redirect to='/bengal' />}
              />

              <Route
                path='/bengal'
                render={() => <Item searchTerm='bengal' />}
              />
              <Route path='/bombay' render={() => <Item searchTerm='bombay' />} />
              <Route path='/persian' render={() => <Item searchTerm='persian' />} />
              <Route path='/maine coon' render={() => <Item searchTerm='maine coon' />} />
              <Route
                path='/search/:searchInput'
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </HashRouter>
      </PhotoContextProvider>
    );
  }
}

export default App;
