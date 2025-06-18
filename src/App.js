// App.js
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import {
  WiDaySunny, WiCloud, WiRain, WiSnow,
  WiThunderstorm, WiFog
} from "react-icons/wi";

function App({ onSearch }) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [bgStyle, setBgStyle] = useState({
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'sans-serif',
    color: 'white',
    background: 'linear-gradient(to top right, #b2f5ea, #fae3d9)', // default
  });

  const weatherIcons = {
    Clear: <WiDaySunny size={64} />,
    Clouds: <WiCloud size={64} />,
    Rain: <WiRain size={64} />,
    Drizzle: <WiRain size={64} />,
    Thunderstorm: <WiThunderstorm size={64} />,
    Snow: <WiSnow size={64} />,
    Mist: <WiFog size={64} />,
    Haze: <WiFog size={64} />,
    default: <WiDaySunny size={64} />,
  };

  const gradientByWeather = {
    Clear: 'linear-gradient(to bottom right, #fef08a, #fde047)',
    Clouds: 'linear-gradient(to bottom right, #cbd5e1, #94a3b8)',
    Rain: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)',
    Drizzle: 'linear-gradient(to bottom right, #93c5fd, #60a5fa)',
    Thunderstorm: 'linear-gradient(to bottom right, #818cf8, #3730a3)',
    Snow: 'linear-gradient(to bottom right, #f0f9ff, #bae6fd)',
    Mist: 'linear-gradient(to bottom right, #e5e7eb, #9ca3af)',
    Haze: 'linear-gradient(to bottom right, #f3f4f6, #d1d5db)',
    default: 'linear-gradient(to right, #667eea, #764ba2)',
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      const data = res.data;
      setWeather(data);
      // Notify parent of the new city
      if (onSearch) {
        onSearch(city);
      }
      // Update background gradient based on weather condition
      const main = data.main || 'default';
      const gradient = gradientByWeather[main] || gradientByWeather.default;
      setBgStyle(prev => ({
        ...prev,
        background: gradient
      }));
    } catch (err) {
      console.error('Weather fetch error:', err);
    }
  };

  return (
    <Box style={bgStyle} sx={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center',
      width:'100%',
    }}>
      {/* Title and description */}
      <Box sx={{ textAlign: 'center', mb: 6, px: 2 }}>
        <Typography variant="h2" sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #8e44ad, #3498db)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Location Hub
        </Typography>
        <Typography variant="h6" sx={{
          mt: 2, maxWidth: 700, mx: 'auto',
          background: 'linear-gradient(to right, #8e44ad, #3498db)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Discover everything about any location – from weather to local amenities, educational institutes to entertainment options.
        </Typography>
      </Box>

      {/* Search box */}
      <Box sx={{
        width: 500,
        bgcolor: 'white',
        borderRadius: 3,
        mt: 4,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Typography variant='subtitle1' sx={{
          background:'linear-gradient(to right, #5b21b6, #2563eb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Enter Location
        </Typography>
        <TextField
          label="e.g., New York, Tokyo..."
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width:'100%' }}
        />
        <Button
          variant='contained'
          onClick={handleSearch}
          sx={{ mt: 1, background: 'linear-gradient(to top right, #a1c4fd, #c2e9fb)', color: 'black' }}
        >
          Explore
        </Button>
      </Box>

      {/* Weather display */}
      {weather && (
        <>
          <Box sx={{ width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, p: 2 }}>
            <Typography variant='h5' sx={{
              fontWeight:'bold',
              background:'linear-gradient(to right, #5b21b6, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Exploring {weather.city}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            borderRadius: 2,
            width: '75%',
            p: 3,
            mt: 2,
            boxShadow: 3,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box>{weatherIcons[weather.main] || weatherIcons.default}</Box>
              <Typography variant="h6" sx={{
                fontWeight: 'bold',
                background:'linear-gradient(to right, #5b21b6, #2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Weather in {weather.city} city
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              gap: 4,
              mt: 2,
              flexWrap: 'wrap',
              color: 'black',
              fontWeight: 500,
              alignItems: 'center',
              justifyContent:'center',
            }}>
              <Box>
                <Typography align="center" sx={{fontSize:'1rem'}}>🌡️ Temperature<br/>{weather.temperature}°C</Typography>
              </Box>
              <Typography align="center" sx={{fontSize:'1rem'}}>☁️ Condition<br/>{weather.description}</Typography>
              <Typography align="center" sx={{fontSize:'1rem'}}>💧 Humidity<br/>{weather.humidity}%</Typography>
              <Typography align="center" sx={{fontSize:'1rem'}}>🌬️ Wind Speed<br/>{weather.wind} km/h</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
