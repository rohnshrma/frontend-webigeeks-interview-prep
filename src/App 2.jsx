import { useState } from 'react';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { prepTips, tracks } from './data';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ad4c28',
    },
    secondary: {
      main: '#2e6f95',
    },
    background: {
      default: '#f6f1ea',
      paper: 'rgba(255,255,255,0.85)',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
    h1: {
      fontFamily: '"Source Serif 4", serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Source Serif 4", serif',
      fontWeight: 600,
    },
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 24,
  },
});

const trackIcons = {
  analytics: <AnalyticsRoundedIcon />,
  mern: <CodeRoundedIcon />,
};

function App() {
  const [activeTrack, setActiveTrack] = useState(tracks[0].id);

  const selectedTrack = tracks.find((track) => track.id === activeTrack) ?? tracks[0];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="page-shell">
        <Box className="background-orb background-orb-left" />
        <Box className="background-orb background-orb-right" />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 3, md: 5 } }}>
          <Card elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 3, border: '1px solid rgba(29, 36, 51, 0.1)', backdropFilter: 'blur(14px)' }}>
            <CardContent sx={{ p: '0 !important' }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
                    Interview Prep Hub
                  </Typography>
                  <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '4.75rem' }, maxWidth: '12ch', lineHeight: 1.04 }}>
                    One place to prepare for Data Analytics and MERN Stack interviews.
                  </Typography>
                  <Typography sx={{ mt: 2, maxWidth: 760, color: 'text.secondary', fontSize: '1.04rem' }}>
                    This React app organizes the most important topics for junior roles up to
                    1 year of experience, so you can revise faster and focus on what interviewers
                    usually ask.
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {[
                    ['2', 'career tracks'],
                    ['18+', 'topic groups'],
                    ['0-1', 'year focus'],
                  ].map(([value, label]) => (
                    <Grid item xs={12} md={4} key={label}>
                      <Card variant="outlined" sx={{ borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.9)' }}>
                        <CardContent>
                          <Typography variant="h3" sx={{ fontSize: '2rem' }}>{value}</Typography>
                          <Typography color="text.secondary">{label}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ p: { xs: 2.5, md: 3 }, mb: 3, border: '1px solid rgba(29, 36, 51, 0.1)', backdropFilter: 'blur(14px)' }}>
            <CardContent sx={{ p: '0 !important' }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  {tracks.map((track) => (
                    <Button
                      key={track.id}
                      variant={track.id === activeTrack ? 'contained' : 'outlined'}
                      color={track.id === activeTrack ? 'primary' : 'inherit'}
                      startIcon={trackIcons[track.id]}
                      onClick={() => setActiveTrack(track.id)}
                      sx={{
                        borderRadius: 999,
                        px: 2.5,
                        py: 1.2,
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                      }}
                    >
                      {track.label}
                    </Button>
                  ))}
                </Stack>

                <Box>
                  <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
                    Selected Track
                  </Typography>
                  <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' } }}>
                    {selectedTrack.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'text.secondary', maxWidth: 720 }}>
                    {selectedTrack.subtitle}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 4, height: '100%' }}>
                      <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <AutoAwesomeRoundedIcon color="primary" />
                          <Typography variant="h6">Main Focus</Typography>
                        </Stack>
                        <List dense disablePadding>
                          {selectedTrack.focus.map((item) => (
                            <ListItem key={item} disableGutters>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <HubRoundedIcon color="secondary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 4, height: '100%' }}>
                      <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <ChecklistRoundedIcon color="primary" />
                          <Typography variant="h6">Typical Interview Rounds</Typography>
                        </Stack>
                        <List dense disablePadding>
                          {selectedTrack.interviewRounds.map((item) => (
                            <ListItem key={item} disableGutters>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <HubRoundedIcon color="secondary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: '1px solid rgba(29, 36, 51, 0.1)', backdropFilter: 'blur(14px)' }}>
                <CardContent sx={{ p: '0 !important' }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
                        Topics To Revise
                      </Typography>
                      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' } }}>
                        {selectedTrack.label} roadmap
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      {selectedTrack.modules.map((module) => (
                        <Grid item xs={12} md={6} key={module.name}>
                          <Card variant="outlined" sx={{ height: '100%', borderRadius: 4 }}>
                            <CardContent>
                              <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                                <Typography variant="h6">{module.name}</Typography>
                                <Chip label={module.level} color="primary" variant="outlined" size="small" />
                              </Stack>

                              <List dense disablePadding>
                                {module.topics.map((topic) => (
                                  <ListItem key={topic} disableGutters>
                                    <ListItemIcon sx={{ minWidth: 28 }}>
                                      <HubRoundedIcon color="secondary" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={topic} />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                <Card elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: '1px solid rgba(29, 36, 51, 0.1)', backdropFilter: 'blur(14px)' }}>
                  <CardContent sx={{ p: '0 !important' }}>
                    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
                      Quick Prep Tips
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.2rem' }, mb: 2 }}>
                      What to do this week
                    </Typography>

                    <List disablePadding>
                      {prepTips.map((tip) => (
                        <ListItem key={tip} disableGutters alignItems="flex-start">
                          <ListItemIcon sx={{ minWidth: 32, mt: 0.2 }}>
                            <AutoAwesomeRoundedIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.94)' }}>
                  <CardContent>
                    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>
                      Mini Checklist
                    </Typography>
                    <List dense disablePadding sx={{ mt: 1 }}>
                      {[
                        'Revise one project deeply.',
                        'Practice 20 SQL or JavaScript questions.',
                        'Review authentication or dashboard logic.',
                        'Prepare a confident self introduction.',
                      ].map((item) => (
                        <ListItem key={item} disableGutters>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <ChecklistRoundedIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
