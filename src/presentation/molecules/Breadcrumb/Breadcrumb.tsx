"use client";

import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';
import { useProductStore } from '@/presentation/store/useProductStore';

export const Breadcrumb: React.FC = () => {
  const category = useProductStore((state) => state.category);
  
  if (!category || !category.breadcrumbs) return null;

  const { breadcrumbs } = category;

  return (
    <Box component="nav" sx={{ py: 2 }}>
      <MUIBreadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          // El último nivel no es un link (nivel actual)
          if (isLast) {
            return (
              <Typography 
                key={item.id} 
                color="text.primary" 
                variant="body2"
                sx={{ fontWeight: 'medium' }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={item.id}
              component={NextLink}
              href={`/categoria/${item.id}`}
              underline="hover"
              variant="body2"
              sx={{ 
                color: 'gray', 
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#EC6608', // Acento primario solicitado
                }
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </Box>
  );
};