'use client';


import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import { Button, Container, Box, AppBar, Toolbar, Grid } from "@mui/material";
import Head from "next/head";
import './globals.css'; 



export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    if (checkoutSession.statusCode == 500){
      console.log(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  

  return (
    <Container maxWidth="100vw"
    sx={{
      backgroundImage: 'url(background1.jpg)', // Add your background image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the container takes up full viewport height
      py: 4, // Add padding for spacing
    }}>
      <Head>
        <title >Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>


      
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
              Flashcard AI
            </Typography>
            {/* Show login and sign-up buttons when signed out */}
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>

            {/* Show logout button when signed in */}
            <SignedIn>
              <SignOutButton>
                <Button color="inherit">Logout</Button>
              </SignOutButton>
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Box>



      <Box sx={{ textAlign: "center", my: 4, mt: 10 }}>
        <Typography variant="h3" gutterBottom className="professional-text-subtitle"  >
          Your intelligent flashcard maker
        </Typography>
        
        <Button 
        variant="contained" 
        color="primary" 
        className="button glowing-border"
        sx={{
          backgroundColor: '#8A7D72',
          borderRadius: '30px',
          padding: '10px 20px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#705E52',
          },
          mr: 3,
          fontSize: '2em',
        }}
        href="/generate"
          >
          Get Started
        </Button>
        <Button 
        variant="contained" 
        color="primary" 
        className="button glowing-border"
        sx={{
          backgroundColor: '#8A7D72',
          borderRadius: '30px',
          padding: '10px 20px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#705E52',
          },
          fontSize: '2em',
        }} 
        
        href="/flashcards"
          >
          Saved Flashcards
        </Button>
      </Box>



      <Box sx={{ my: 6, mb: 10, mt: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'rgba(135, 62, 113, 0.1)', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="#626060">
                Leverage the power of AI
              </Typography>
              <Typography variant="body1" color="#626060">
                Creates flashcards from your text.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'rgba(135, 62, 113, 0.1)', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="#626060">
                Accessible Anywhere
              </Typography>
              <Typography variant="body1" color="#626060">
                Save your flashcards and access them from any device.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'rgba(135, 62, 113, 0.1)', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="#626060">
                Limited free access
              </Typography>
              <Typography variant="body1" color="#626060">
                Use our services for free!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>



      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" className="professional-text-subtitle" sx={{mb: 3}}>Pricing</Typography>
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              borderRadius: 5, 
              p: 2,
              mt: 5,
              backgroundColor: 'transparent',
              boxShadow: '0px 4px 20px rgba(135, 62, 113, 0.1), 0px 0px 10px rgba(128, 0, 128, 0.3)', }}>
              <Typography variant="h5" gutterBottom color="#626060">
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom color="#626060">
                $0 / month 
              </Typography>
              <Typography variant="body1" color="#626060">
                Unlimited Flashcards w/o Storage.
              </Typography>
              <Button 
              variant="contained" 
              color="primary" 
              className="button-feedback glowing-border-feedback"
              sx={{
                backgroundColor: '#8A7D72',
                borderRadius: '30px',
                padding: '10px 20px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#705E52',
                },
                fontSize: '2em',
                mt: 2
              }}  >
                Get Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              borderRadius: 5, 
              p: 2, 
              mt: 5,
              backgroundColor: 'transparent',
              boxShadow: '0px 4px 20px rgba(135, 62, 113, 0.1), 0px 0px 10px rgba(128, 0, 128, 0.3)', }}>
              <Typography variant="h5" gutterBottom color="#626060">
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom color="#626060">
                 <span style={{ textDecoration: 'line-through', marginRight: '1rem' }}> $2.99</span> 0 / month
              </Typography>
              <Typography variant="body1" color="#626060">
                Unlimited Flashcards and Storage.
              </Typography>
              <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              className="button-feedback glowing-border-feedback"
              sx={{
                backgroundColor: '#8A7D72',
                borderRadius: '30px',
                padding: '10px 20px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#705E52',
                },
                fontSize: '2em',
                mt: 2
              }} 
              
              >
                Get it now for free!
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}