import React, { Component } from 'react';
import { Button, Grid } from '@mui/material';
import classes from './GroupItem.module.scss';
import { IPropGroupItem } from '../../../types/props';
import { Context } from '../../App/Context';

export class GroupItem extends Component<IPropGroupItem> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  render() {
    const { num, abbr, color } = this.props.propsGroup;
    const groupActive = this.props.groupActive;
    let classname = classes.groupsGroup;
    let width = !this.context.isAuthorized ? '15%' : '25%';
    if (groupActive === num) {
      classname = classes.groupsGroupActive;
      width = !this.context.isAuthorized ? '13%' : '22%';
    }
    return (
      <Button
        variant="outlined"
        component="span"
        className={classname}
        style={{ color: color, width: width }}
        onClick={() => this.props.onChangeGroupFunc(num)}>
        <Grid className={classes.groupsGroupName}>{abbr}</Grid>
      </Button>
    );
  }
}
