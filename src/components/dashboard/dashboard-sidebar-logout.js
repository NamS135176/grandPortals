import {useState} from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {Box, Button, ListItem} from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { useRouter } from "next/router";

export const DashboardSidebarLogout = (props) => {
    const {
        active,
        chip,
        depth,
        icon,
        info,
        title,
        ...other
    } = props;

    const router = useRouter();
    const { logout } = useAuth();

    let paddingLeft = 24;

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth;
    }
    const handleLogout = async () => {
      console.log("handleLogout...")
      await logout();
      router.push("/login")
    }

    return (
        <ListItem
            disableGutters
            sx={{
                display: "flex",
                mb: 0.5,
                py: 0,
                px: 2,
            }}
            onClick={handleLogout}
        >
            <Button
                component="a"
                startIcon={icon}
                endIcon={chip}
                disableRipple
                sx={{
                    borderRadius: 1,
                    color: "neutral.300",
                    justifyContent: "flex-start",
                    pl: `${paddingLeft}px`,
                    pr: 3,
                    textAlign: "left",
                    textTransform: "none",
                    width: "100%",
                    ...(active && {
                        backgroundColor: "rgba(255,255,255, 0.08)",
                        color: "secondary.main",
                        fontWeight: "fontWeightBold",
                    }),
                    "& .MuiButton-startIcon": {
                        color: active ? "secondary.main" : "neutral.400",
                    },
                    "&:hover": {
                        backgroundColor: "rgba(255,255,255, 0.08)",
                    },
                }}
            >
                <Box sx={{flexGrow: 1}}>{title}</Box>
                {info}
            </Button>
        </ListItem>
    );
};

DashboardSidebarLogout.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    depth: PropTypes.number.isRequired,
    icon: PropTypes.node,
    info: PropTypes.node,
    path: PropTypes.string,
    title: PropTypes.string.isRequired,
};

DashboardSidebarLogout.defaultProps = {
    active: false,
};
