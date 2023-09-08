import React from 'react'
import { data } from './data'
import { Container, FormControlLabel, FormLabel, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, Paper } from '@mui/material';
import { useState } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Input from '@mui/joy/Input';

import './App.css'

function App() {
  const [httpMethod, setHttpMethod] = useState("");
  const [awsRegion, setAwsRegion] = useState("");
  const [method, setMethod] = useState(false);
  const [region, setRegion] = useState(false);
  const [status, setStatus] = useState(false);
  const [responseTime, setResponseTime] = useState(false);
  const [ipAddress, setIpAddress] = useState(false);
  const [results, setResults] = useState(data);
  const handleReset = () => {
    setRegion(false)
    setMethod(false)
    setHttpMethod("")
    setAwsRegion("")
    setResults(data)
  }
  const handleSearch = () => {
    const filteredData = data.filter((result) => {
      return (
        (result["aws_region"].toLowerCase() === awsRegion.toLowerCase() || awsRegion === '') &&
        (result["http_method"].toLowerCase() === httpMethod.toLowerCase() || httpMethod === '')
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
          <Typography variant="h7" gutterBottom style={{ display: 'block' }}>
            What do you want to search?

          </Typography>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={method}
                  onChange={(e) => {

                    if (!method && region)
                      setRegion(false)
                    setMethod(e.target.checked)
                  }}
                />
              }
              label="Http Method"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={region}
                  onChange={(e) => {
                    if (method && !region)
                      setMethod(false)
                    setRegion(e.target.checked)
                  }}
                />
              }
              label="AWS region"
              sx={{ mb: 2 }}
            />

          </div>

          {method && !region ? <FormControl fullWidth variant="outlined" required={true} sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "black", mb: 1 }} > Enter a valid HTTP Request</FormLabel>

            <Input
              placeholder="eg. GET,PUT..."
              onChange={(e) => setHttpMethod(e.target.value)}
              value={httpMethod}
              sx={{
                mb: 1,
                '--Input-focusedInset': 'var(--any, )',
                '--Input-focusedThickness': '0.25rem',
                '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                '&::before': {
                  transition: 'box-shadow .15s ease-in-out',
                },
                '&:focus-within': {
                  borderColor: '#86b7fe',
                },
              }}
            />

          </FormControl> : (!method && region ?
            <FormControl required={true} fullWidth variant="outlined" sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "black", mb: 1 }} >Enter an AWS Region</FormLabel>

              <Input
                placeholder="eg. us-west-2"
                required
                value={awsRegion}
                onChange={(e) => setAwsRegion(e.target.value)}
                sx={{
                  mb: 1,
                  '--Input-focusedInset': 'var(--any, )',
                  '--Input-focusedThickness': '0.25rem',
                  '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                  '&::before': {
                    transition: 'box-shadow .15s ease-in-out',
                  },
                  '&:focus-within': {
                    borderColor: '#86b7fe',
                  },
                }}
              />

            </FormControl> : null)}
          {method || region ?
            <div style={{ display: "flex", justifyContent: "space-around", width: "100%", alignItems: "center" }}>
              <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={handleSearch}

                sx={{ mb: 2, width: "40%" }}
              >
                Search
              </Button>
              <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={handleReset}

                sx={{ mb: 2, width: "40%" }}
              >
                Reset
              </Button>
            </div> : null
          }
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
                  checked={responseTime}
                  onChange={(e) => setResponseTime(e.target.checked)}
                />
              }
              label="Response time"
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

          </div>
        </Paper>


      </Container>
      {results.length === 0 ?
        <Typography variant="h6" gutterBottom style={{ textAlign: "center", my: 2 }}>
          No data found
        </Typography>
        :
        <> <Typography variant="h6" gutterBottom style={{ textAlign: "center", mt: 4 }}>
          {results.length} entries found
        </Typography>
          <Sheet
            sx={{
              mb: 2,
              '--TableCell-height': '40px',
              // the number is the amount of the header rows.
              '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
              height: 500,
              overflow: 'auto',
              background: (theme) =>
                `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 50% 0,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
              backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'local, local, scroll, scroll',
              backgroundPosition:
                '0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%',
              backgroundColor: 'background.surface',
            }}
          >
            <Table stickyHeader stripe="odd" hoverRow style={{ width: "90%", margin: " auto", boxShadow: "1px 2px 2px 2px grey", marginBottom: "1rem" }}>
              <thead style={{ fontSize: "1rem" }}>
                <tr >
                  <th style={{ width: "8%" }}>S No.</th>
                  <th style={{ width: "12%" }}>HTTP Method</th>
                  <th style={{ width: "12%" }}>AWS Region</th>
                  {status ? <th style={{ width: "12%" }}>Status Code</th> : null}
                  {responseTime ? <th style={{ width: "12%" }}>Response Time</th> : null}
                  {ipAddress ? <th style={{ width: "12%" }}>IP Address</th> : null}

                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx} sx={{ overflow: "auto" }} >
                    <td>{idx + 1}</td>
                    <td>{result['http_method']}</td>
                    <td>{result['aws_region']}</td>
                    {status ? <td>{result['http_status_code']}</td> : null}
                    {responseTime ? <td>{result['response_time']}</td> : null}
                    {ipAddress ? <td>{result['ip_address']}</td> : null}
                  </tr>
                ))}
              </tbody>
            </Table>  </Sheet></>



      }
    </div >
  )
}

export default App;
