import React from 'react';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import classes from './GithubLink.module.scss';

interface GithubLinkProps {
  login: string;
  textLink?: string | false;
  isOpenNewWindow?: boolean;
}

const GithubLink = ({ login, textLink, isOpenNewWindow }: GithubLinkProps) => {
  return (
    <Link
      href={`https://github.com/${login}`}
      typography="body2"
      underline="hover"
      className={classes.githubLink}
      target={isOpenNewWindow ? '_blank' : '_self'}>
      <GitHubIcon fontSize="small" />
      {textLink !== '' && (textLink || login)}
    </Link>
  );
};

GithubLink.defaultProps = {
  textLink: false,
  isOpenNewWindow: false
};

export default GithubLink;
