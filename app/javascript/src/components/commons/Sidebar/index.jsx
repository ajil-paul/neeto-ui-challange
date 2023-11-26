import React from "react";

import { Sidebar as NeetoUISidebar } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import routes from "routes";

import { APP_NAME, SIDENAV_LINKS } from "./constants";

const Sidebar = () => {
  const history = useHistory();
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      window.location.href = routes.auth.login;
    } catch (error) {
      logger.error(error);
    }
  };

  const bottomLinks = [
    {
      label: "My profile",
      onClick: () => history.push(routes.profile, { resetTab: true }),
    },
    {
      label: "Change password",
      onClick: () =>
        history.push(routes.settings.changePassword, { resetTab: true }),
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <NeetoUISidebar
      appName={APP_NAME}
      changelogProps={{ id: "neetochangelog-trigger" }}
      navLinks={SIDENAV_LINKS}
      organizationInfo={{
        name: "Wheel",
        subdomain: "bigbinary.com",
      }}
      profileInfo={{
        name: `${user.first_name} ${user.last_name}`,
        imageUrl: user.profile_image_path,
        email: user.email,
        bottomLinks,
      }}
    />
  );
};

export default Sidebar;
