import PropTypes from "prop-types";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Link,
} from "@mui/material";
import {useState, useEffect} from "react";
import {styled} from "@mui/material/styles";
import {Menu as MenuIcon} from "../../icons/menu";
import {Bell as InfoCircle} from "../../icons/bell";
import NextLink from "next/link";
import {useAuth} from "hooks/use-auth";
import {UserGroup} from "utils/global-data";
import {useRouter} from "next/router";
import {queryInformationListSendByUserId} from "graphql/queries";
import {API, graphqlOperation} from "aws-amplify";
import * as subscriptions from "graphql/subscriptions";

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
    const [numberNotice, setNumberNotice] = useState(0);
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

    useEffect(() => {
        if (user) {
            const getListNotice = async () => {
                const response = await API.graphql({
                    query: queryInformationListSendByUserId,
                    variables: {
                        user_id: user?.id,
                        filter: {
                            delete_flag: {
                                eq: 0,
                            },
                            last_user_read: {
                                attributeExists: false,
                            },
                        },
                    },
                });
                console.log(
                    response.data?.queryInformationListSendByUserId?.items
                        ?.length
                );
                setNumberNotice(
                    response.data?.queryInformationListSendByUserId?.items
                        ?.length
                );
            };
            getListNotice();
            const subscription = API.graphql(
                graphqlOperation(subscriptions.onUpdateInformationListSend, {
                    user_id: user?.id,
                })
            ).subscribe({
                next: ({provider, value}) => getListNotice(),
                error: (error) => console.warn(error),
            });
            return () => subscription.unsubscribe();
        }
    }, [user]);

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
                    {user ? (
                        <IconButton
                            onClick={toInformation}
                            sx={{
                                display: "inline-flex",
                                position: "relative",
                            }}
                        >
                            <InfoCircle fontSize="small" />
                            {user?.group == UserGroup.agentGrands ? (
                                numberNotice > 0 ? (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: "red",
                                            top: 5,
                                            left: 20,
                                        }}
                                    ></Box>
                                ) : (
                                    <></>
                                )
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
