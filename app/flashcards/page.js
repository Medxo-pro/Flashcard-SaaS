'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CollectionReference, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "@/firebase";
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashcards();
    }, [user]);

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    const handleDelete = async (name) => {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          const updatedCollections = collections.filter(flashcard => flashcard.name !== name);
          // Use updateDoc to modify the flashcards field in the user document
          await updateDoc(docRef, { flashcards: updatedCollections });
          setFlashcards(updatedCollections);
      }
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    return (
        <Container
            maxWidth="100vw"
            sx={{
                backgroundImage: 'url(background1.jpg)', // Add your background image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh', // Ensure the container takes up full viewport height
                py: 4, // Add padding for spacing
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {flashcards.map((flashcard) => (
                        <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                            <Card
                                sx={{
                                    backgroundColor: 'rgba(135, 62, 113, 0.1)', // Semi-transparent background
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Subtle shadow
                                    borderRadius: 2,  // Rounded borders
                                    position: 'relative', // Required for positioning delete button
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <IconButton
                                    aria-label="delete"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click from firing
                                        handleDelete(flashcard.name);
                                    }}
                                    sx={{ position: 'absolute', top: 8, right: 8 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
}
