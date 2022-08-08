import React, { useEffect, useState} from 'react'
import { Box, Button, Stack, TextField, Typography} from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';

function SearchExercises({setExercises, bodyPart, setBodyPart}) {
    const URL = "https://exercisedb.p.rapidapi.com/exercises"
    const [search, setSearch] = useState(null)
    const [bodyPartsList, setBodyPartsList] = useState([])

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData(URL+'/bodyPartList', exerciseOptions);
            setBodyPartsList(['all', ...bodyPartsData])
        }
        fetchExercisesData()
    }, [])
    
    const handleSearch = async () => {
        if(search){
            const exercisesData = await fetchData(URL, exerciseOptions);
            
            const searchedExercises = exercisesData.filter(
                (exercise)=> exercise.name.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
            );
            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            setSearch('');
            setExercises(searchedExercises);

        }
    }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        <Typography
            fontWeight={700}
            sx={{fontSize: { lg: '44px', xs: '30px'}}}
            mb="50px"
            textAlign="center"
        >
            Awesome Exercises You <br/> Should Know
        </Typography>
        <Box 
            position="relative"
            mb="72px"
        >
            <TextField
                sx={{
                    input: {fontWeight: '700', border: 'none', borderRadius: '4px'},
                    width: {lg: '800px', xs: '350px'}
                }}
                height="76px"
                onChange={(e)=> setSearch(e.target.value.toLowerCase())}
                placeholder="Search"
                type="text"
            />
            <Button className="search-btn"
                sx={{
                    bgcolor: '#FF2625',
                    color: '#fff',
                    textTransform: 'none',
                    width: { lg: '175px', xs: '80px'},
                    fontSize: {lg: '20px', xs: '14px'},
                    height: '56px',
                    position: "absolute",
                    right: '0px'
                }}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
        <Box sx={{ 
            position: "relative", 
            width: "100%",
            p:'20px',
        }}>
            <HorizontalScrollBar 
                data={bodyPartsList} 
                bodyPart={bodyPart} 
                setBodyPart={setBodyPart}
            />
        </Box>
    </Stack>
  )
}

export default SearchExercises