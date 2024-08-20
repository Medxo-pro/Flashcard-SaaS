'use client'
import {useUser} from "@clerk/nextjs";
import {useEffect, useState} from "react";

import {collection, doc, getDoc, getDocs} from 'firebase/firestore';
import {db} from "@/firebase";
import {useSearchParams} from 'next/navigation';
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


export default function Flashcard() {
    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const searchParams = useSearchParams()
    const search = searchParams.get('id')  

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return
  
      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      const docs = await getDocs(colRef)
      const flashcards = []
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() })
      })
      setFlashcards(flashcards)
    }
    getFlashcard()
  }, [search, user])

  if (!isLoaded && !isSignedIn){
    return <></>
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (


    <Container maxWidth="100vw"
    sx={{
      backgroundImage: 'url(Background3.jpg)', // Add your background image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the container takes up full viewport height
      py: 4, // Add padding for spacing
    }}>
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
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
    </Container>
    </Container>
  );
}