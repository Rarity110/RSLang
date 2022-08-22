import React, { Component } from 'react';
import { Button, Grid } from '@mui/material';
import classes from './GroupItem.module.scss';
import { IPropGroupItem } from './consts';

export class GroupItem extends Component<IPropGroupItem> {
  render() {
    const { num, abbr, name } = this.props.propsGroup;
    const groupActive = this.props.groupActive;
    let classname = undefined;
    if (groupActive === num) {
      classname = classes.active;
    }
    return (
      <Button className={classes.groups__group}>
        <Grid className={classname} onClick={() => this.props.onChangeGroupFunc(num)}>
          <div>{abbr}</div>
          <div>{name}</div>
        </Grid>
      </Button>
    );
  }
}
