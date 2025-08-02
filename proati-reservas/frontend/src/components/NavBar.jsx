import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/equipamentos", label: "Equipamentos" },
    { to: "/reservar", label: "Reservar" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Proati Reservas
        </Typography>
        {links.map((link) => (
          <Button
            key={link.to}
            component={Link}
            to={link.to}
            color={location.pathname === link.to ? "secondary" : "inherit"}
            variant={location.pathname === link.to ? "contained" : "text"}
            sx={{ mx: 1 }}
          >
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
