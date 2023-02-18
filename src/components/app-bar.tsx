import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AirIcon from "@mui/icons-material/Air";
import { getAvatarCharacter } from "~/utils/text-utils";
import { MuiNextLink } from "./mui-next-link";
import { TextField } from "@mui/material";
import { useState, FormEvent, MouseEvent, useEffect } from "react";
import { useRouter } from "next/router";
import CONFIG from "~/config";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export type ResponsiveAppBarProps = {
  username: string;
};

function ResponsiveAppBar({ username }: ResponsiveAppBarProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const _handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = `/search?q=${encodeURIComponent(searchText)}`;
    console.log(path);
    router.push(path);
  };

  useEffect(() => {
    setSearchText(router.query.q as string);
  }, [router.query.q]);

  const _handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const avatarChar = getAvatarCharacter(username);

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar
          sx={{
            width: "100%",
          }}
          disableGutters
        >
          <AirIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Box>
            <MuiNextLink href="/">
              <Typography
                variant="h5"
                noWrap
                sx={{
                  ml: 2,
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {CONFIG.APP_NAME}
              </Typography>
            </MuiNextLink>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            flexGrow={1}
            justifyContent="space-between"
            ml={10}
          >
            <Box>
              <form onSubmit={_handleSearchSubmit}>
                <TextField
                  id="filled-basic"
                  label="Search"
                  variant="filled"
                  sx={{ backgroundColor: "#ffffff", minWidth: 300 }}
                  onChange={_handleSearchTextChange}
                  value={searchText}
                />
              </form>
            </Box>

            <Box sx={{ flexGrow: 0, alignSelf: "center" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username}>{avatarChar}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
