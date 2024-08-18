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
      backgroundImage: 'url(background.jpg)', // Add your background image URL
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
        
      >
        <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }} className="multicolor-text">
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
        <Typography variant="h4" gutterBottom className="multicolor-text" >
          Your intelligent flashcard maker
        </Typography>
        <Typography variant="h5" gutterBottom className="multicolor-text-small">
          ~ Make Flashcards using the power of AI! ~
        </Typography>
        <Button 
        variant="contained" 
        color="primary" 
        className="button glowing-border"
        sx={{
          mt: 2,
          mr: 2,
          fontSize: '2em', // Ensure this matches the CSS font-size
          backgroundColor: 'transparent', // Override default background color
          border: '2px solid #fff', // Match the CSS border
          color: '#fff', // Match the CSS text color
        }}    
        href="/generate"
          >
          Get Started
        </Button>
      </Box>



      <Box sx={{ my: 6, mb: 10, mt: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="rgb(135, 62, 113)">
              Easy Text Input
            </Typography>
            <Typography variant="body1" color="rgb(135, 62, 113)">
              Simply input your text and let our software do the rest.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="rgb(135, 62, 113)">
              Smart Flashcards
            </Typography>
            <Typography variant="body1" color="rgb(135, 62, 113)">
              Our AI intelligently creates flashcards from your text.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} color="rgb(135, 62, 113)">
            <Typography variant="h6" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography variant="body1" color="rgb(135, 62, 113)">
              Save your flashcards to your account and access them from
              anywhere.
            </Typography>
          </Grid>
        </Grid>
      </Box>



      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" color="white" sx={{mb: 3}}>Pricing</Typography>
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              borderRadius: 2, 
              p: 2,
              mt: 5,
              backgroundColor: 'transparent',
              boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 0px 10px rgba(128, 0, 128, 0.3)', }}>
              <Typography variant="h5" gutterBottom color="white">
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom color="white">
                $0 / month 
              </Typography>
              <Typography variant="body1" color="white">
                Unlimited Flashcards w/o Storage.
              </Typography>
              <Button 
              variant="contained" 
              color="primary" 
              className="button-feedback glowing-border-feedback"
              sx={{
              mt: 2,
              fontSize: '1em', // Ensure this matches the CSS font-size
              backgroundColor: 'transparent', // Override default background color
              border: '2px solid #fff', // Match the CSS border
              color: '#fff', // Match the CSS text color
              }} >
                Get Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              borderRadius: 2, 
              p: 2, 
              mt: 5,
              backgroundColor: 'transparent',
              boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 0px 10px rgba(128, 0, 128, 0.3)', }}>
              <Typography variant="h5" gutterBottom color="white">
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom color="white">
                 <span style={{ textDecoration: 'line-through', marginRight: '1rem' }}> $2.99</span> 0 / month
              </Typography>
              <Typography variant="body1" color="white">
                Unlimited Flashcards and Storage.
              </Typography>
              <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              className="button-feedback glowing-border-feedback"
              sx={{
              mt: 2,
              fontSize: '1em', // Ensure this matches the CSS font-size
              backgroundColor: 'transparent', // Override default background color
              border: '2px solid #fff', // Match the CSS border
              color: '#fff', // Match the CSS text color
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