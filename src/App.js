import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import List from './components/List/List';
import DetailList from './components/List/DetailList';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <Navbar />
            {/* <List /> */}
          </div>
          <Route path="/" exact component={List} />
          <Route path="/detail-pokemon/:id" component={DetailList} />
        </Fragment>
      </Router>
    );
  }
  
}

export default App;
