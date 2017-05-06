import React from 'react'
import { Link } from 'react-router'

function ScreenReaderInfo (props) {
  return (
    <div className='only-screen-reader'>
      Information for screen reader users: this page uses interactive
      maps as a means to geospatially navigate the New York Public Library's map collection.
      To browse the maps using a traditional list view, see the <Link to='/list'>List page</Link>.
    </div>
  )
}

export default ScreenReaderInfo
