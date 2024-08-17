import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        //height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}