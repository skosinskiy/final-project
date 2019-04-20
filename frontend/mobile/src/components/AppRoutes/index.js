import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import DialoguesPage from '../../pages/DialoguesPage/index'
import ContactsPage from '../../pages/ContactsPage'
import BusinessesEvents from '../../pages/BusinessesEvents'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/places" />
        <Route path="/news" component={NewsPage} />
        <Route path="/messages" component={DialoguesPage} />
        <Route path="/favourites" component={BusinessesEvents} />
        <Route path="/more" component={ContactsPage} />
      </Switch>
    </div>
  )
}

export default AppRoutes
