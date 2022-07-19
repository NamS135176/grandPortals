import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AuthBanner } from "../../components/authentication/auth-banner";
import { AmplifyLogin } from "../../components/authentication/amplify-login";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";

const platformIcons = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Login | Material Kit Pro</title>
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
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">ログイン</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <AmplifyLogin />
            </Box>
            {platform === "Amplify" && (
              <Box sx={{ mt: 3 }} justifyContent="center" display={"flex"}>
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                      : "/authentication/password-recovery"
                  }
                  passHref
                >
                  <Link color="textSecondary" variant="body2" underline="always">
                    パスワードをお忘れの方はこちら
                  </Link>
                </NextLink>
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;