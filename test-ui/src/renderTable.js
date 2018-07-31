import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const RenderData = (props) => {
    const {items, classes,page,pages,handleChangePage,count} = props;
    
    if(!items || items.length===0)
    {
        return null;
    }
    const emptyRows = 20 - Math.min(20, items.length - pages * 20);
    return (
        <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Website</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(obj => {
                        return (
                        <TableRow key={obj.user_id}>
                            <TableCell component="th" scope="row">{obj.id}</TableCell>
                            <TableCell scope="row">{obj.first_name}</TableCell>
                            <TableCell numeric>{obj.last_name}</TableCell>
                            <TableCell numeric>{obj.email}</TableCell>
                            <TableCell numeric>{obj.gender}</TableCell>
                            <TableCell numeric>{obj.ip_address}</TableCell>
                            <TableCell numeric>{obj.company}</TableCell>
                            <TableCell numeric>{obj.city}</TableCell>
                            <TableCell numeric>{obj.title}</TableCell>
                            <TableCell numeric>{obj.website}</TableCell>
                        </TableRow>
                        );
                    })}
                    <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                </TableBody>
            </Table>
            </div>
            <TablePagination
            component="div"
            count={count}
            rowsPerPage={20}
            rowsPerPageOptions={[]}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={handleChangePage}
          />
        </Paper>
    );
}
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export default withStyles(styles)(RenderData);