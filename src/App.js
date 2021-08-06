import React, {PureComponent} from "react";
import {BrowserRouter,Route} from "react-router-dom"
import {Provider} from "react-redux";
import comboStore from "./store";
import Home from "./pages/home";

class App extends PureComponent {
  render() {
    return (
        <Provider store={comboStore}>
          <BrowserRouter>
            <div>
              <Route path={'/'} exact component={Home}></Route>
            </div>
          </BrowserRouter>
        </Provider>
    )
  }
}

export default App;
