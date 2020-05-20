import React, { Component } from 'react'
import './App.css'
import SearchPage from '../../routes/SearchPage/SearchPage'
import ResultsPage from '../../routes/ResultsPage/ResultsPage'
import FarmPage from '../../routes/FarmPage/FarmPage'
import AddFarmPage from '../../routes/AddFarmPage/AddFarmPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>

        </header>
        <main>
          {/* <Switch>
            <Route 
              path={'/'}
              component={SearchPage}
            />
            <Route 
              path={'/farms'}
              component={ResultsPage}
            />
            <Route 
              path={'/farms/:farmId'}
              component={FarmPage}
            />
            <Route 
              path={'/add-farm'}
              component={AddFarmPage}
            />
            <Route 
              component={NotFoundPage}
            />                                    
          </Switch> */}
        </main>
      </div>
    )
  }
}

export default App
