import React, { useState } from 'react';
import { Container, FormControlLabel, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Checkbox, Button, Grid, Paper } from '@mui/material';
import './App.css';

const picnicSpots = [
    {
        name: "Beautiful Park",
        location: "Park",
        price: 20,
        crowd: "Low",
        availability: true,
        family_friendly: true,
    },
    {
        name: "Sunny Beach",
        location: "Beach",
        price: 50,
        crowd: "Medium",
        availability: true,
        family_friendly: true,
    },
    {
        name: "Quiet Forest",
        location: "Forest",
        price: 10,
        crowd: "Low",
        availability: false,
        family_friendly: true,
    },
    // Add more picnic spots here
];

function Picnic() {
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(50);
    const [crowd, setCrowd] = useState('');
    const [availability, setAvailability] = useState(false);
    const [familyFriendly, setFamilyFriendly] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const filteredSpots = picnicSpots.filter((spot) => {
            return (
                (location === '' || spot.location === location) &&
                (price === 0 || spot.price <= price) &&
                (crowd === '' || spot.crowd === crowd) &&
                (!availability || spot.availability) &&
                (!familyFriendly || spot.family_friendly)
            );
        });

        setResults(filteredSpots);
    };

    return (
        <div className="App">
            <Container maxWidth="sm">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Picnic Spot Finder
                    </Typography>

                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                        <InputLabel>Location</InputLabel>
                        <Select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            label="Location"
                        >
                            <MenuItem value="">
                                <em>Any</em>
                            </MenuItem>
                            <MenuItem value="Park">Park</MenuItem>
                            <MenuItem value="Beach">Beach</MenuItem>
                            <MenuItem value="Forest">Forest</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography id="price-slider" gutterBottom>
                        Price: ${price}
                    </Typography>
                    <Slider
                        value={price}
                        onChange={(_, newValue) => setPrice(newValue)}
                        min={0}
                        max={100}
                        step={10}
                        valueLabelDisplay="auto"
                    />

                    <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
                        <InputLabel>Crowd</InputLabel>
                        <Select
                            value={crowd}
                            onChange={(e) => setCrowd(e.target.value)}
                            label="Crowd"
                        >
                            <MenuItem value="">
                                <em>Any</em>
                            </MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={availability}
                                onChange={(e) => setAvailability(e.target.checked)}
                            />
                        }
                        label="Availability"
                        sx={{ mb: 2 }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={familyFriendly}
                                onChange={(e) => setFamilyFriendly(e.target.checked)}
                            />
                        }
                        label="Family Friendly"
                        sx={{ mb: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Search
                    </Button>

                    <Grid container spacing={2}>
                        {results.map((spot, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper elevation={3} className="spot-card">
                                    <Typography variant="h6">{spot.name}</Typography>
                                    <div className="spot-info">
                                        <Typography>Location: {spot.location}</Typography>
                                        <Typography>Price: ${spot.price}</Typography>
                                    </div>
                                    <div className="spot-info">
                                        <Typography>Crowd: {spot.crowd}</Typography>
                                        <Typography>
                                            Family Friendly: {spot.family_friendly ? 'Yes' : 'No'}
                                        </Typography>
                                    </div>
                                    <div className="spot-info">
                                        <Typography>
                                            Availability: {spot.availability ? 'Available' : 'Not Available'}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}

export default Picnic;
