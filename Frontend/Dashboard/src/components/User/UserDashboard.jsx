import React, { useContext, useEffect, useState } from 'react'


export default function UserDashboard() {
  
  return (
    <div>
        <TableContainer component={Paper} sx={{ height: '80vh' }} >
                    <Table stickyHeader sx={{ minWidth: 650, background: 'red', }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className='bg' align="right">Name</TableCell>
                                <TableCell className='bg' align="right">Email</TableCell>
                                <TableCell className='bg' align="right">Role</TableCell>
                                <TableCell className='bg' align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ position: 'relative', overflow: 'auto' }}>
                            {food.map((item) => (
                                <>
                                 <TableRow
                                  // key={item._id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                 
                                  <TableCell sx={{ background: 'white' }} align="right">{item.Name}</TableCell>
                                  <TableCell sx={{ background: 'white'}} align="right">
                                     {item.Category}
                                      {/* <AddOutlinedIcon onClick={() => incQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} />
                                      <Typography mt={1}> {item.quantity} </Typography>
                                      <RemoveOutlinedIcon onClick={() => decQuantity(item)} sx={{ color: 'red', marginTop: '7px', cursor: 'pointer' }} /> */}
                                  </TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">${item.Price }</TableCell>
                                  <TableCell sx={{ background: 'white' }} align="right">
                                      <DeleteForeverOutlinedIcon
                                        //   onClick={() => Dltfood(item._id)}
                                          sx={{
                                              color: 'tomato',
                                              cursor: 'pointer',
                                          }} />
                                  </TableCell>
                              </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    </div>
  )
}
