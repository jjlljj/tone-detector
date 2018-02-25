import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { func, object } from 'prop-types'
import './AnalyzerInput.css'
import { toneFetch, toneExampleFetch, cleanTones } from '../../dataHelper/dataHelper'
import { addResult, addDocumentTone, addSentences } from '../../actions/index'

export class AnalyzerInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleChange = event => {
    const { value } = event.target
    this.setState({ text: value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    
    if ( this.state.text.length > 50 ) {
      const results = await toneFetch(this.state.text)
      this.handleResults(results)  
    }
  }

  handleRandom = async event => {
    event.preventDefault()

    const results = await toneExampleFetch(this.state.text)    
    this.handleResults(results) 
  }

  handleResults = results => {
    const { sentences, sentencesTone, documentTone } = cleanTones(results)

    this.props.addResult({ sentences, sentencesTone, documentTone })
    this.props.addSentences(sentences)
    this.props.addDocumentTone(documentTone)

    this.props.history.push('/analyzed')
  }

  render() {
    return (
      <div>
        <form
          className="analyzer-form"
          onSubmit={this.handleSubmit} >
          <div className="btn-wrap">
            <button 
              type="submit" 
              className="submit"
            >Submit</button>
            <button
              type="button" 
              className="get-example"
              onClick={this.handleRandom}
            >Example</button>
          </div>
          <textarea 
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="Enter text here" />
        </form>
      </div>
    ) 
  }
}

AnalyzerInput.propTypes = {
  addResult: func,
  addDocumentTone: func,
  addSentences: func,
  history: object
}

const mapDispatchToProps = (dispatch) => ({
  addResult: result => dispatch(addResult(result)),
  addDocumentTone: documentTone => dispatch(addDocumentTone(documentTone)),
  addSentences: sentences => dispatch(addSentences(sentences))
})


export default withRouter(connect(null, mapDispatchToProps)(AnalyzerInput))
