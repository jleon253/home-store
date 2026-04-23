"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Stack, IconButton, CardMedia } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props { images: string[] }

export const BodyCarousel: React.FC<Props> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Imagen Principal */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%', position: 'relative' }}>
        <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 0, zIndex: 2, bgcolor: 'rgba(255,255,255,0.7)' }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        
        <CardMedia
          component="img"
          image={images[activeIdx]}
          sx={{ 
            width: '100%', 
            maxHeight: 400, 
            objectFit: 'contain',
            borderRadius: 2,
            transition: 'opacity 0.3s'
          }}
        />

        <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 0, zIndex: 2, bgcolor: 'rgba(255,255,255,0.7)' }}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Thumbnails */}
      <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: 'auto', py: 1 }}>
        {images.map((img, idx) => (
          <Box
            key={idx}
            onClick={() => setActiveIdx(idx)}
            sx={{
              width: 60, height: 60, borderRadius: 1, cursor: 'pointer',
              border: activeIdx === idx ? '2px solid #EC6608' : '1px solid #ddd',
              overflow: 'hidden', opacity: activeIdx === idx ? 1 : 0.6
            }}
          >
            <Image src={img} alt="thumb" width={60} height={60} style={{ objectFit: 'cover' }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};