import React from 'react'
import PropTypes from 'prop-types'
import { Button as ButtonSemantic } from 'semantic-ui-react'

// CSS
import "./Button.module.scss"

const Button = props => {
  return (
    <ButtonSemantic
        primary={props.primary}
        secondary={props.secondary}
        onClick={props.onClick}
    >
      {props.content}
    </ButtonSemantic>
  )
}

Button.propTypes = {
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onClick: PropTypes.func,
    content: PropTypes.element
}

export default Button
