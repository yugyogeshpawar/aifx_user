// material
import { styled } from '@material-ui/core/styles';
import { Typography, Button, Card, Box, CardContent } from '@material-ui/core';
//
import { BookingIllustration } from '../../../assets';
import { fShortenNumber } from '../../../utils/formatNumber';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function EcommerceWelcome({ title, value }) {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(value)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral'
        }}
      >
        <BookingIllustration />
      </Box>
    </RootStyle>
  );
}
