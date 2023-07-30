import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const BurgerMenu = () => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default BurgerMenu;
