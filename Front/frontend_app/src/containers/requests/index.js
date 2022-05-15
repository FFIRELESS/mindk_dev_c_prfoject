import React from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Box, Card, CardContent, Grid,
} from '@mui/material';
import { getIncRequests, getOutRequests } from '../users/api/crud';
import CircleLoader from '../../components/header/circleLoader';
import UserRequests from '../../components/requests';

const UserRequestsContainer = function () {
  const { id } = useParams();

  const { isFetching: isFetchIncReqs, data: incReqsData } = useQuery('incReqs', () => getIncRequests(id));
  const { isFetching: isFetchOutReqs, data: outReqsData } = useQuery('outReqs', () => getOutRequests(id));

  const incReqs = incReqsData?.data || [];
  const outReqs = outReqsData?.data || [];

  return (
    <>
      {isFetchIncReqs && isFetchOutReqs && <CircleLoader />}

      {outReqs?.length > 0 && (
        <Box
          margin={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card sx={{ width: '80vh', maxWidth: 620 }}>
            <Box marginLeft={3}>
              <h2>Outgoing requests</h2>
              <Box marginTop={-2}>
                Requests total:
                {' '}
                {outReqs.length}
              </Box>
            </Box>
            <CardContent>
              <Box
                maxHeight={130}
                sx={{
                  overflow: 'auto',
                }}
              >
                <Grid
                  container
                >
                  {outReqs.map((req) => (
                    <div key={req.id}>
                      <UserRequests request={req.In_User} />
                    </div>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
      {incReqs?.length > 0 && (
      <Box
        margin={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: '80vh', maxWidth: 620 }}>
          <Box marginLeft={3}>
            <h2>Incoming requests</h2>
            <Box marginTop={-2}>
              Requests total:
              {' '}
              {incReqs.length }
            </Box>
          </Box>
          <CardContent>
            <Box
              maxHeight={130}
              sx={{
                overflow: 'auto',
              }}
            >
              <Grid
                container
              >
                {incReqs.map((req) => (
                  <div key={req.id}>
                    <UserRequests request={req.Out_User} />
                  </div>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      )}
    </>
  );
};

export default UserRequestsContainer;
