"use client";
import { useUser } from "@clerk/nextjs";
import {db} from "@/firebase";
import { useRouter } from "next/navigation";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CardActionArea,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter(); //To route between pages 

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });
  
      const responseText = await res.text(); // Get response as text for debugging
      console.log("Response text:", responseText); // Log it for inspection
  
      const data = JSON.parse(responseText); // Parse JSON
      setFlashcards(data);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name.");
      return;
    }
    if (!user || !user.id) {
      alert("User is not authenticated.");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((collection) => collection.name === name)) {
        alert("You already have a collection with this name.");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((card) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, card);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (

    <Container maxWidth="100vw"
    sx={{
      backgroundImage: 'url(background1.jpg)', // Add your background image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the container takes up full viewport height
      py: 4, // Add padding for spacing
    }}>

    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          mb: 6,
        }}
      >
        <Typography variant="h4" className="professional-text-subtitle">Generate Flashcards</Typography>
        <Paper 
        sx={{ p: 4, mt: 4, width: "100%",
          backgroundColor: 'rgba(135, 62, 113, 0.1)', // Semi-transparent white
          borderRadius: 2, // Rounded borders
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow

        }}
        
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate flashcards"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover fieldset': {
                  borderColor: 'rgba(51, 51, 51, 0.6)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(51, 51, 51, 0.6)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(51, 51, 51, 0.6)',
              },
              '& .MuiInputBase-input': {
                color: '#333',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#8A7D72',
              borderRadius: '30px',
              padding: '10px 20px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#705E52',
              },
              mt:2
            }} 
            className="button glowing-border"
          >
            Generate
          </Button>
        </Paper>
      </Box>
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Subtle shadow
                    borderRadius: 2,  // Rounded borders
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(index)
                    }}
                  >
                  <CardContent>
                    <Box
                    sx={{
                      perspective: '1000px',

                      '& > div':{
                      transition: 'transform 0.6s',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      width: '100%',
                      height: '200px',
                      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                      transform: flipped[index]
                      ? 'rotateY(180deg)' 
                      : 'rotateY(0deg)',
                      },

                      '& > div > div':{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2,
                      boxSizing: 'border-box'
                      },

                      '& > div div:nth-of-type(2)':{
                      transform: 'rotateY(180deg)'
                      },
                      backgroundColor: 'rgba(135, 62, 113, 0.1)', // Semi-transparent white
                      borderRadius: 2, // Rounded borders
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
                    }}
                    
                    >
                      <div>
                        <div>
                          <Typography variant = 'h5' component = "div" >
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant = 'h5' component = "div" >
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}>
            <Button 
            variant='contained' 
            color = 'secondary' 
            onClick={handleOpen}
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
              mt:2
            }} 
            >
              Save 
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Save Flashcard Set</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a name for your flashcard set.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Collection Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveFlashcards} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    </Container>

    </Container>
  );
}