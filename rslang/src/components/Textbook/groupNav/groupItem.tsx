import React, { Component } from 'react';
import { Button, Grid } from '@mui/material';
import classes from './GroupItem.module.scss';
import { IPropGroupItem } from './consts';

export class GroupItem extends Component<IPropGroupItem> {
  render() {
    const { num, abbr, name } = this.props.propsGroup;
    const groupActive = this.props.groupActive;
    let classname = classes.groupsGroup;
    if (groupActive === num) {
      classname += classes.active;
    }
    return (
      <Button>
        <Grid className={classname} onClick={() => this.props.onChangeGroupFunc(num)}>
          <div className={classes.groupsGroupAbbr}>{abbr}</div>
          <div className={classes.groupsGroupName}>{name}</div>
        </Grid>
      </Button>
    );
  }
}
