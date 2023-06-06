// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Container, CardContent } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import CopyClipboard from '../../../components/CopyClipboard';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function CopyToClipboard({ userID }) {
  return (
    <RootStyle title="Components: Copy To Clipboard | AIFX-UI">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <HeaderBreadcrumbs heading="Referral Link" links={[{ name: '', href: '' }]} />
            <CopyClipboard value={`http://localhost:3000/uid/${userID}`} />
          </CardContent>
        </Card>
      </Container>
    </RootStyle>
  );
}
