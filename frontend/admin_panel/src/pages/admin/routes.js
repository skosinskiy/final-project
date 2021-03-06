import React, {Component} from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {hasGrant} from 'utils/roles'
import {Grant} from 'constants/permissions'
import ManageBusinessCategories from './components/ManageBusinessCategory'
import BusinessCategoryForm from './components/ManageBusinessCategory/BusinessCategoryForm'
import ManageEventCategories from './components/ManageEventCategory'
import EventCategoryForm from './components/ManageEventCategory/EventCategoryForm'
import ManagingUserRoles from './components/ManagingUserRoles'
import Places from './components/ManagePlaces'
import ManageBusinesses from './components/ManageBusinesses'
import BusinessForm from './components/ManageBusinesses/BusinessForm'
import PlaceForm from './components/ManagePlaces/PlaceForm'
import ManagePlaceCategories from './components/ManagePlaceCategories'
import PlaceCategoryForm from './components/ManagePlaceCategories/PlaceCategoryForm'
import PropTypes from 'prop-types'
import ManagingRoles from './components/ManagingRoles'
import RoleForm from './components/ManagingRoles/RoleForm'
import ManageEvents from './components/ManageEvents'
import EventForm from './components/ManageEvents/EventForm'
import UserForm from './components/ManagingUserRoles/UserForm'

class AdminRouter extends Component {
  render () {
    const {user} = this.props

    return (
      <Switch>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_USERS)} path="/admin/users/edit/:userId" component={UserForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_USERS)} path="/admin/users" component={ManagingUserRoles} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACE_CATEGORIES)} path="/admin/place-categories/add-new" component={PlaceCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACE_CATEGORIES)} path="/admin/place-categories/:categoryId" component={PlaceCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACE_CATEGORIES)} path="/admin/place-categories" component={ManagePlaceCategories} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places/add-new" component={PlaceForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places/edit/:placeId" component={PlaceForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places" component={Places} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESSES)} path="/admin/businesses/add-new" component={BusinessForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESSES)} path="/admin/businesses/edit/:businessId" component={BusinessForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESSES)} path="/admin/businesses" component={ManageBusinesses} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories/add-new" component={BusinessCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories/:categoryId" component={BusinessCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories" component={ManageBusinessCategories} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_ROLES)} path="/admin/roles/edit/:roleId" component={RoleForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_ROLES)} path="/admin/roles/add-new" component={RoleForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_ROLES)} path="/admin/roles" component={ManagingRoles} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories/add-new" component={EventCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories/:categoryId" component={EventCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories" component={ManageEventCategories} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENTS)} path="/admin/events/add-new" component={EventForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENTS)} path="/admin/events/edit/:eventId" component={EventForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENTS)} path="/admin/events" component={ManageEvents} />
      </Switch>
    )
  }
}

AdminRouter.propTypes = {
  user: PropTypes.object.isRequired,
}


export const AuthorizedRoute = ({component: Component, authorized, ...rest}) => (
  <Route {...rest} render={(props) => authorized
    ? <Route component={Component} {...props} />
    : <Redirect to='/admin/login' />} />
)

AuthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
}

const mapStateToProps = ({users}) => {
  return {
    user: users.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(AdminRouter))
