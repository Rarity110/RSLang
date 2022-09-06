import React from 'react';
import {
  Box,
  Container,
  IconButton,
  Link,
  List,
  ListItemText,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import AttributionIcon from '@mui/icons-material/Attribution';
import GithubLink from '../GithubLink/GithubLink';
import rsSchoolLogo from '../../assets/images/logo-rsschool.svg';
import classes from './Footer.module.scss';

const Footer = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="footer" className={classes.footer}>
      <Container>
        <Box className={classes.footerContent}>
          <Link href="https://rs.school/" className={classes.footerRSSLink}>
            <img src={rsSchoolLogo} alt="Logo The Rolling Scopes School" />
          </Link>

          <Box className={classes.footerTeam}>
            <GithubLink login="rarity110" />
            <GithubLink login="AVBr0" />
            <GithubLink login="ipipka" />
          </Box>

          <Box className={classes.footerCopyright}>
            <Typography>2022</Typography>
            <Tooltip title="Attribution">
              <IconButton
                aria-label="Attribution"
                color="default"
                size="small"
                onClick={handleClick}>
                <AttributionIcon />
              </IconButton>
            </Tooltip>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <List subheader="Illustrations by Storyset:" className={classes.footerList}>
                <ListItemText disableTypography>
                  <Link href="https://storyset.com/education" target="_blank">
                    Education
                  </Link>
                </ListItemText>
                <ListItemText disableTypography>
                  <Link href="https://storyset.com/business" target="_blank">
                    Business
                  </Link>
                </ListItemText>
                <ListItemText disableTypography>
                  <Link href="https://storyset.com/people" target="_blank">
                    People
                  </Link>
                </ListItemText>
                <ListItemText disableTypography>
                  <Link href="https://storyset.com/data" target="_blank">
                    Data
                  </Link>
                </ListItemText>
              </List>
            </Popover>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
