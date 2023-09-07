import React from 'react'
import { data } from './data'
import { Container, FormControlLabel, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, Paper } from '@mui/material';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Carousel from 'react-material-ui-carousel'

function App() {
  const [httpMethod, setHttpMethod] = useState("any");
  const [awsRegion, setAwsRegion] = useState("any");
  const [status, setStatus] = useState(true);
  const [responseTime, setResponseTime] = useState(true);
  const [ipAddress, setIpAddress] = useState(true);
  const [results, setResults] = useState(data);

  const handleSearch = () => {
    const filteredData = data.filter((result) => {
      return (
        (result["aws_region"].toLowerCase() === awsRegion || awsRegion === 'any') &&
        (result["http_method"].toLowerCase() === httpMethod || httpMethod === 'any')
      );
    });
    setResults(filteredData);

  };
  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Paper elevation={3} style={{ padding: '20px', }}>
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Data Finder
          </Typography>

          <FormControl fullWidth variant="outlined" required={true} sx={{ mb: 2 }}>
            <InputLabel>HTTP Request</InputLabel>
            <Select
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
              label="http_method"
            >
              <MenuItem value="any">
                <em>Any</em>
              </MenuItem>
              <MenuItem value="get">GET</MenuItem>
              <MenuItem value="put">PUT</MenuItem>
              <MenuItem value="post">POST</MenuItem>
              <MenuItem value="delete">DELETE</MenuItem>
              <MenuItem value="update">UPDATE</MenuItem>
            </Select>
          </FormControl>
          <FormControl required={true} fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>AWS Region</InputLabel>
            <Select
              value={awsRegion}
              onChange={(e) => setAwsRegion(e.target.value)}
              label="aws_region"
            >
              <MenuItem value="any">
                <em>Any</em>
              </MenuItem>
              <MenuItem value="us-west-2">us-west-2</MenuItem>
              <MenuItem value="us-east-1">us-east-1</MenuItem>
              <MenuItem value="eu-west-1">eu-west-1</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h7" gutterBottom style={{ display: 'block' }}>
            Please check the details you wish to avail
          </Typography>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              }
              label="Status Code"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ipAddress}
                  onChange={(e) => setIpAddress(e.target.checked)}
                />
              }
              label="IP Address"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={responseTime}
                  onChange={(e) => setResponseTime(e.target.checked)}
                />
              }
              label="Response time"
              sx={{ mb: 2 }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            sx={{ mb: 2 }}
          >
            Search
          </Button>
        </Paper>


      </Container>
      {results.length === 0 ?
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
              fontSize: 30
             
            }
          }
          }
          indicators={false}
          //height={"fit-content"}
          sx={{ overflow:"auto",minWidth: 275, maxWidth: 500, mx: "auto", textAlign: "center", marginTop: 5 }}
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
        </Carousel>}
    </div >
  )
}

export default App;
