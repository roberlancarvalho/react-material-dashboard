import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));



const PedidosTable = props => {
  const { className, pedidos, ...rest } = props;

  const classes = useStyles();

  const [selectedPedidos, setSelectedPedidos] = useState([]);




  const handleSelectAll = event => {
    const { pedidos } = props;

    let selectedPedidos;

    if (event.target.checked) {
      selectedPedidos = pedidos.map(pedido => pedido.id);
    } else {
      selectedPedidos = [];
    }

    setSelectedPedidos(selectedPedidos);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPedidos.indexOf(id);
    let newSelectedPedidos = [];

    if (selectedIndex === -1) {
      newSelectedPedidos = newSelectedPedidos.concat(selectedPedidos, id);
    } else if (selectedIndex === 0) {
      newSelectedPedidos = newSelectedPedidos.concat(selectedPedidos.slice(1));
    } else if (selectedIndex === selectedPedidos.length - 1) {
      newSelectedPedidos = newSelectedPedidos.concat(selectedPedidos.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPedidos = newSelectedPedidos.concat(
        selectedPedidos.slice(0, selectedIndex),
        selectedPedidos.slice(selectedIndex + 1)
      );
    }

    setSelectedPedidos(newSelectedPedidos);
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            
            <Table>
              <TableHead>
                <TableRow>

                <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPedidos.length === pedidos.length}
                      color="primary"
                      indeterminate={
                        selectedPedidos.length > 0 &&
                        selectedPedidos.length < pedidos.length
                      }
                      onChange={handleSelectAll}
                    />
                    </TableCell>

                  <TableCell></TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Id Produto</TableCell>
                  <TableCell>Nome do Produto</TableCell>
                  <TableCell>Preço do Produto</TableCell>   
                  <TableCell>Quantidade do Produto</TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>

              </TableHead>

                <TableBody>
                  

                  {

                   pedidos.map( pedido => {

                    return(

                      <TableRow key={pedido.line_items}
                      className={classes.tableRow}
                      hover
                      key={pedido.id}
                      selected={selectedPedidos.indexOf(pedido.id) !== -1}
                      >
  
  
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedPedidos.indexOf(pedido.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, pedido.id)}
                          value="true"
                        />
                      </TableCell>

    


                      
                        <TableCell>{pedido.line_items[0].id}</TableCell>
                        <TableCell>{pedido.line_items[0].product_id}</TableCell>
                        <TableCell>{pedido.line_items[0].name}</TableCell>
                        <TableCell>{pedido.line_items[0].quantity}</TableCell>
                        <TableCell>{pedido.line_items[0].total}</TableCell>

                        {/* <TableCell>{pedido.done ? "Entregue" : "Não entregue"}</TableCell>
                        <TableCell>
                          <IconButton onClick={e => props.alterarStatus(pedido.id)} color="secondary">
                            {
                              pedido.done ? ( <DoneAllIcon/> ) : ( <TimerIcon/> )
                            }
                          </IconButton>
                        </TableCell> */}

                        <TableCell>
                          <IconButton onClick={e => props.deleteAction(pedido.line_items[0].id)}>
                              <DeleteIcon/>
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    )
                     })
                  }
                  
                </TableBody>
            </Table>

          </div>
        </PerfectScrollbar>
      </CardContent>
     
    </Card>
  );
};

PedidosTable.propTypes = {
  className: PropTypes.string,
  pedidos: PropTypes.array.isRequired
};

export default PedidosTable;