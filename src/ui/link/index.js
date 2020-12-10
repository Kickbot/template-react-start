import React from 'react'
import T from 'prop-types'
import './link.css'

import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import { cn } from 'utils'

const classNames = {
  primary: 'btn btn-primary',
}
export function Link({ to, theme, className, children, ...props }) {
  return (
    <RouterLink {...props} to={to} className={cn('link', theme && classNames[theme], className)}>
      {children}
    </RouterLink>
  )
} 
Link.propTypes = {
  theme: T.oneOf(['primary']),
  to: T.oneOfType([
    T.string.isRequired,
    T.shape({ pathname: T.string.isRequired, state: T.shape({ noScroll: T.bool }) }),
  ]),
}
Link.defaultProps = {}

export function NavLink({ className, ...props }) {
  return (
    <RouterNavLink {...props} className={cn('nav-link', className, 'inner-nav')} />
  )
}
NavLink.propTypes = {
  activeClassName: T.string,
  to: T.string.isRequired,
}
NavLink.defaultProps = {
  activeClassName: 'active',
}
