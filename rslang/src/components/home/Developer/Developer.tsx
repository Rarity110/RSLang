import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import classes from './Developer.module.scss';

interface DeveloperProps {
  name: string;
  img: string;
  githubName: string;
  description: string;
  rolesNode: React.ReactNode;
}

const Developer = ({ name, img, description, githubName, rolesNode }: DeveloperProps) => {
  return (
    <Box className={classes.dev}>
      <Box className={classes.devAvatar}>
        <img src={img} alt="" className={classes.devAvatarImg} />
      </Box>
      <Box className={classes.devBody}>
        <Box className={classes.devHeader}>
          <Typography variant="h6">{name}</Typography>
          <Link
            href={`https://github.com/${githubName}`}
            typography="body2"
            underline="hover"
            className={classes.devGithub}
            target="_blank">
            <GitHubIcon fontSize="small" />
            {githubName}
          </Link>
        </Box>
        <Box className={classes.devRoles}>{rolesNode}</Box>
        <Typography className={classes.devText}>{description}</Typography>
      </Box>
    </Box>
  );
};

export default Developer;
