import React from 'react'

import { Images, ComponentTable } from './styles'

export class ExplainScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      intervalDuration: 2500
    }
  }

  componentDidMount () {
    this.startAnimation()
  }

  componentWillUnmount () {
    this.stopAnimation()
  }

  addEventListeners (index) {
    return {
      onMouseEnter: () => {
        if (!this.focused) {
          this.stopAnimation()
          this.setState({
            selectedIndex: index
          })
        }
      },
      onMouseLeave: () => {
        if (!this.focused) {
          this.startAnimation()
        }
      },
      onFocus: () => {
        this.focused = true
        this.stopAnimation()
        this.setState({
          selectedIndex: index
        })
      },
      onBlur: () => {
        this.focused = false
        this.startAnimation()
      }
    }
  }

  startAnimation () {
    if (this.interval) {
      return
    }

    this.interval = window.setInterval(() => {
      this.setState({
        selectedIndex: (this.state.selectedIndex + 1) % this.props.components.length
      })
    }, this.state.intervalDuration)
  }

  stopAnimation () {
    if (this.interval) {
      window.clearInterval(this.interval)
      this.interval = undefined
    }
  }

  render () {
    return (
      <div>
        <Images style={{
          backgroundImage: `url(${this.props.image})`
        }}>
          <svg role='presentation' version='1.1' x='0px' y='0px' viewBox={[...this.props.svgOffset, ...this.props.dimensions].join(' ')}>
            {this.props.components.map((component, index) => (
              <rect tabIndex={0} key={index} className={this.state.selectedIndex === index ? 'selected' : ''}
                {...this.addEventListeners(index)}
                x={component.dimensions.x} y={component.dimensions.y} rx={5}
                width={component.dimensions.width} height={component.dimensions.height} />
            ))}
          </svg>
        </Images>
        <ComponentTable>
          <tbody>
            {this.props.components.map((component, index) => {
              const componentTableCells = Array.isArray(component.tableCells) ? component.tableCells : [component.tableCells]

              const cells = componentTableCells.map((contents, index) => (
                <td key={index}>
                  {contents}
                </td>
              ))

              return (
                <tr key={index} tabIndex={0} className={this.state.selectedIndex === index ? 'selected' : ''}
                  {...this.addEventListeners(index)}>
                  {cells}
                </tr>
              )
            })}
          </tbody>
        </ComponentTable>
      </div>
    )
  }
}

export default ExplainScreen

