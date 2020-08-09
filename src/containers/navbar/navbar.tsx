import React from "react";
import s from "./style.scss";

import { AppBar, Toolbar, Container } from "@material-ui/core";

// import Logo from 'components/navbar-components/header-logo'
// import AddEventButton from 'components/navbar-components/header-add-event'
// import NavItem from 'components/navbar-components/header-nav-item'
// import NotificationButton from 'components/navbar-components/header-notification-button'
// import UserMenu from 'components/navbar-components/header-user-menu'

const EventNavbar: React.FC = () => {
  return (
    <AppBar position="static" className={s.app_bar}>
      <Container disableGutters className={s.navbar_wrapper}>
        <Toolbar>
          <Logo />
          <nav>
            <AddEventButton />
            <NavItem title="Dashboard" link="/admin" />
            <NavItem title="Event" link="/" />
            <NavItem title="English" link="/english" />
            <NavItem title="About" link="/" />
            <NavItem title="Past Event" link="/" />
            <NavItem title="FAQ" link="/" />
          </nav>
          <NotificationButton />
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default EventNavbar;
