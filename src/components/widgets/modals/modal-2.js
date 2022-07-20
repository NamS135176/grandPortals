import { Box, ListItemIcon, ListItemText, MenuItem, Paper, Typography } from '@mui/material';

const languageOptions = [
  {
    icon: '/images/icons/uk_flag.svg',
    label: 'English'
  },
  {
    icon: '/images/icons/de_flag.svg',
    label: 'German'
  },
  {
    icon: '/images/icons/es_flag.svg',
    label: 'Spanish'
  }
];

export const Modal2 = () => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      p: 3
    }}
  >
    <Paper
      elevation={12}
      sx={{
        width: 240,
        mx: 'auto'
      }}
    >
      {languageOptions.map((languageOption) => (
        <MenuItem key={languageOption.label}>
          <ListItemIcon>
            <Box
              sx={{
                display: 'flex',
                height: 20,
                width: 20,
                '& img': {
                  width: '100%'
                }
              }}
            >
              <img
                alt={languageOption.label}
                src={languageOption.icon}
              />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                {languageOption.label}
              </Typography>
            )}
          />
        </MenuItem>
      ))}
    </Paper>
  </Box>
);
