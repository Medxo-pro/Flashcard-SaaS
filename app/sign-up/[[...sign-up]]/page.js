import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (


    <Container maxWidth="100vw"
    sx={{
      backgroundImage: 'url(background1.jpg)', // Add your background image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the container takes up full viewport height
      py: 4, // Add padding for spacing
    }}>

<Box
        sx={{
          borderRadius: 2, // Adjust the border radius as needed
          overflow: 'hidden', // Ensure the rounded corners are applied correctly
          backgroundColor: 'rgba(135, 62, 113, 0.1)', // Semi-transparent background
          backdropFilter: 'blur(10px)', // Optional: adds a blur effect to the background
          boxShadow: 'none', // Remove box shadow if desired
          position: 'relative',
        }}
      >
      <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <Typography className="professional-text-title" 
            sx={{ fontSize: { xs: '2rem', sm: '3rem' }, flexGrow: 1 }}>
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
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        //height="100vh"
      >
        <Typography variant="h4" gutterBottom sx={{mt: 5, mb: 5}} className="professional-text-subtitle">
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}