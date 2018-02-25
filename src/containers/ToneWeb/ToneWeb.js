import React, { Component } from 'react'
import { connect } from 'react-redux'
import { arrayOf, shape, number, string } from 'prop-types'
import RadarChart from '../../chartHelper/chartHelper'
import * as d3 from 'd3'
import './ToneWeb.css'


export class ToneWeb extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createToneWeb()
  }

  formatData = () => {
    const { documentTone } = this.props
    const chartTones = documentTone.map(tone => {
      return {
        axis: tone.tone_name,   //eslint-disable-line
        value: tone.score
      }
    })

    return [chartTones]
  }
  
  createToneWeb = () => {
    const node = this.node
    const color = d3.scaleOrdinal()
      .range(["#3399ff", "#EDC951", "#00A0B0"])
    const chartOptions = {
      w: 200, //eslint-disable-line
      h: 200, //eslint-disable-line
      margin: {
        top: 20, 
        right: 20, 
        bottom: 20, 
        left: 20
      },
      maxValue: 1,
      levels: 4,
      roundStrokes: true,
      color
    }

    RadarChart(node, this.formatData(), chartOptions)
  }

  render() {
    return (
      <div className="tone-web">
        <svg ref={node => this.node = node}></svg>
      </div>
    )
  }
  
}

ToneWeb.propTypes = {
  documentTone: arrayOf(shape({
    score: number,
    tone_id: string,  //eslint-disable-line
    tone_name: string //eslint-disable-line
  }))
}

const mapStateToProps = ({ documentTone }) => ({
  documentTone
})

export default connect(mapStateToProps)(ToneWeb)