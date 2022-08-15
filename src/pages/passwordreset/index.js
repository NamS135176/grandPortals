import {useEffect} from "react";
import Head from "next/head";
import NextLink from "next/link";
import {Box, Card, Container, Typography, Link} from "@mui/material";
import {GuestGuard} from "../../components/authentication/guest-guard";
// import { AuthBanner } from '../../components/authentication/auth-banner';
import {AmplifyPasswordRecovery} from "../../components/authentication/amplify-password-recovery";
import {Logo} from "../../components/logo";
import {useAuth} from "../../hooks/use-auth";
import {MainLayout} from "../../components/main-layout";
import {gtm} from "../../lib/gtm";

const platformIcons = {
    Amplify: "/images/icons/amplify.svg",
    Auth0: "/images/icons/auth0.svg",
    Firebase: "/images/icons/firebase.svg",
    JWT: "/images/icons/jwt.svg",
};

const PasswordRecovery = () => {
    const {platform} = useAuth();

    useEffect(() => {
        gtm.push({event: "page_view"});
    }, []);

    return (
        <>
            <Head>
                <title>Password Recovery | Material Kit Pro</title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                {/* <AuthBanner /> */}
                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: "60px",
                            md: "120px",
                        },
                    }}
                >
                    <Card elevation={16} sx={{p: 4}}>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            {/* <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </a>
              </NextLink> */}
                            <Typography variant="h4">
                                パスワードリセット
                            </Typography>
                            {/* <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Tell us your email so we can send you a reset link
              </Typography> */}
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                mt: 3,
                            }}
                        >
                            {platform === "Amplify" && (
                                <AmplifyPasswordRecovery />
                            )}
                        </Box>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
								mt: 5
                            }}
                        >
                            <NextLink
                                href="/login"
                                passHref
                            >
                                <Link color="textSecondary" variant="body2">
								ログイン
                                </Link>
                            </NextLink>
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

PasswordRecovery.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default PasswordRecovery;
