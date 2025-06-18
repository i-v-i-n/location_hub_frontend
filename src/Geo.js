// Geo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Geo({ city }) {
  const [activeTab, setActiveTab] = useState('Education');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!city) {
      setPlaces([]);
      return;
    }
    const fetchData = async () => {
      try {
        let endpoint = '';
        if (activeTab === 'Education') endpoint = 'school';
        else if (activeTab === 'Dining') endpoint = 'restaurants';
        else if (activeTab === 'Hospital') endpoint = 'hospital';
        else if (activeTab === 'Hotels') endpoint = 'hotels';
        const res = await axios.get(`http://localhost:5000/api/${endpoint}`, {
          params: { city },
        });
        setPlaces(res.data);
      } catch (err) {
        console.error(err);
        setPlaces([]);
      }
    };
    fetchData();
  }, [activeTab, city]);

  const typeLabel = {
    Education: 'University',
    Hospital: 'Hospital',
    Dining: 'Restaurant',
    Hotels: 'Hotel',
  };

  const icons = {
    Education: <SchoolIcon />,
    Hospital: <LocalHospitalIcon />,
    Dining: <RestaurantIcon />,
    Hotels: <HotelIcon />,
  };
  const colors = {
    Education: '#0277bd',
    Hospital: '#388e3c',
    Dining: '#ef6c00',
    Hotels: '#6a1b9a',
  };

  return (
    <Box sx={{ mt: 4, px: 2, py: 3, bgcolor: '#f9f9f9' }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Location Information
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        {['Education', 'Hospital', 'Dining', 'Hotels'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'contained' : 'outlined'}
            color={activeTab === tab ? 'primary' : 'inherit'}
            startIcon={icons[tab]}
            onClick={() => setActiveTab(tab)}
            sx={{ px: 2, textTransform: 'none' }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Results for: {city}
      </Typography>

      {places.map((place, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            mb: 2,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {place.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {typeLabel[activeTab]}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              {/* Rating Tag */}
              {place.rating && (
                <Chip
                  icon={<StarIcon sx={{ color: '#ffb400' }} />}
                  label={place.rating}
                  size="small"
                />
              )}
              {place.distance && (
                <Chip
                  icon={<LocationOnIcon sx={{ color: '#777' }} />}
                  label={`${place.distance} km`}
                  size="small"
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: colors[activeTab],
              color: 'white',
              borderRadius: 2,
              p: 1,
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icons[activeTab]}
          </Box>
        </Box>
      ))}

      <Typography variant="caption" display="block" align="center" sx={{ mt: 2 }}>
        Powered by multiple APIs for comprehensive location insights.
      </Typography>
    </Box>
  );
}

export default Geo;
