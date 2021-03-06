import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import DisplayResults from '../DisplayResults/DisplayResults'
import AnalyzerInput from '../../containers/AnalyzerInput/AnalyzerInput'
import Nav from '../Nav/Nav'
import About from '../About/About'
import Example from '../../containers/Example/Example'
import Tones from '../Tones/Tones'
import SentenceView from '../../containers/SentenceView/SentenceView'

export const App = () => {

  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={About} />
      <Route exact path="/results" component={DisplayResults} />
      <Route exact path="/analyze" component={AnalyzerInput} />
      <Route exact path="/example/results" component={DisplayResults} />
      <Route exact path="/example" component={Example} />
      <Route exact path="/tones" component={Tones} />
      <Route exact path="/sentence/:id" render={({ match })=> {
        const id = parseInt( match.params.id )
        
        return <SentenceView sentence_id={id} />
      }}/>
    </div>
  )
}

export default App