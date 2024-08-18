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
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper sx={{ p: 4, mt: 4, width: "100%"}}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate flashcards"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
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
                <Card>
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
                      }
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
            <Button variant='contained' color = 'secondary' onClick={handleOpen}>
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
  );
}