import './button.css'
import React from 'react'
import T from 'prop-types'

import { cn } from '../../utils'

export const Button = React.forwardRef(
  (
    { className: customClassName, type: buttonType, theme, primary, small, wide, ...props },
    ref,
  ) => {
    const isPrimary = primary || ['submit', 'primary'].includes(buttonType)
    const className = cn(
      'button',
      wide && 'wide',
      small && 'small',
      isPrimary && 'primary',
      theme,
      customClassName,
    )

    const type = ['submit', 'reset'].includes(buttonType) ? buttonType : 'button'

    // eslint-disable-next-line react/button-has-type
    return <button {...props} type={type} className={className} ref={ref} />
  },
)

Button.displayName = 'Button'
Button.propTypes = {
  primary: T.bool,
  small: T.bool,
  theme: T.oneOf(['alert', 'success']),
  type: T.oneOf(['submit', 'reset', 'primary', 'secondary', 'button']),
  wide: T.bool,
}
Button.defaultProps = {
  type: 'button',
  theme: null,
  wide: false,
  small: false,
}

// export const IconButton = ({ className, ...props }) => (
//   <button type="button" {...props} className={cn('icon-button', className)} />
// )
