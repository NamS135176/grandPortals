import PropTypes from "prop-types";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Link,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Menu as MenuIcon} from "../../icons/menu";
import {Bell as InfoCircle} from "../../icons/bell";
import NextLink from "next/link";
import {useAuth} from "hooks/use-auth";
import {UserGroup} from "utils/global-data";
import {useRouter} from "next/router";

const DashboardNavbarRoot = styled(AppBar)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    ...(theme.palette.mode === "light"
        ? {
              boxShadow: theme.shadows[3],
          }
        : {
              backgroundColor: theme.palette.background.paper,
              borderBottomColor: theme.palette.divider,
              borderBottomStyle: "solid",
              borderBottomWidth: 1,
              boxShadow: "none",
          }),
}));

export const DashboardNavbar = (props) => {
    const {onOpenSidebar, ...other} = props;
    const {user} = useAuth();
    const router = useRouter();
    const toInformation = () => {
        if (user.group == UserGroup.agentGrands) {
            router.push("/information/list");
        } else {
            router.push("/cs/information/list");
        }
    };

    return (
        <>
            <DashboardNavbarRoot {...other}>
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <NextLink href="/bukken/list" passHref>
                        <Link
                            variant="subtitle1"
                            color="textSecondary"
                            underline="none"
                        >
                            Grands
                        </Link>
                    </NextLink>
                    <Box sx={{flexGrow: 1}} />
                    <Typography
                        color="textSecondary"
                        underline="none"
                        variant="subtitle2"
                        mr={2}
                    >
                        {user?.name}
                    </Typography>
                    {user?.group ? (
                        <IconButton
                            onClick={toInformation}
                            sx={{
                                display: "inline-flex",
                                position: "relative",
                            }}
                        >
                            <InfoCircle fontSize="small" />
                            {user.group == UserGroup.agentGrands ? (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: "red",
                                        top: 5,
                                        left:20
                                    }}
                                ></Box>
                            ) : (
                                <></>
                            )}
                        </IconButton>
                    ) : (
                        <></>
                    )}
                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{
                            display: "inline-flex",
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func,
};
