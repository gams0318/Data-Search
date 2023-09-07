import React from 'react'
import { Container, FormControlLabel, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, Paper } from '@mui/material';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Carousel from 'react-material-ui-carousel'
import { data } from './data'
export const component = (results, status, ipAddress, responseTime) => {
    return (<>
        {
            results.length === 0 ?
                <Typography variant="h6" gutterBottom style={{ textAlign: "center", my: 2 }}>
                    No data found
                </Typography>
                :
                // <div style={{ width: 500, margin: "1rem auto", textAlign: "center", boxShadow: "1px 2px 2px grey" }}>
                <Carousel
                    autoPlay={false}
                    animation="slide"
                    navButtonsAlwaysVisible={true}
                    navButtonsProps={{
                        style: {
                            backgroundColor: '#1976d2',
                            color: 'white',
                            borderRadius: 3,
                            width: 30,
                            marginTop: -15,
                            fontSize: 30,
                            overflow: "auto"
                        }
                    }
                    }
                    indicators={false}
                    //height={"fit-content"}
                    sx={{ minWidth: 275, maxWidth: 500, mx: "auto", textAlign: "center", marginTop: 5 }}
                >{results.map((result, idx) => (
                    <Card sx={{ p: 1, height: "fit-content", backgroundColor: "#dedede", borderRadius: "25px", boxShadow: "1px 2px 2px 2px grey" }} key={idx}>
                        <CardContent>

                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Method: {result['http_method']} Request
                            </Typography>

                            <Typography variant="h5" component="div">
                                AWS Region: {result['aws_region']}
                            </Typography>

                            {status ?
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Status code: {result['http_status_code']}
                                </Typography> : null}

                            {ipAddress ?
                                <Typography variant="body2">
                                    IP Address: {result['ip_address']}
                                </Typography> : null}

                            {responseTime ?
                                <Typography variant="body2">
                                    Response Time: {result['response_time']} ms
                                </Typography> : null}

                        </CardContent>
                    </Card>
                ))}
                </Carousel>
        }

    </>)
}
