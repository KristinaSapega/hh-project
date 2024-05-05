import { FC, useEffect, useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { BASE_BACKEND_URL } from '../../../routes/routes';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // return `${hours}:${minutes} ${day}.${month}.${year}`;
  return `${hours}:${minutes}`;
};

interface JobsProps {
  selectedStand: string;
}

const Jobs: FC<JobsProps> = ({ selectedStand }) => {
  const [jobs, setJobs] = useState<{ taskType: string; createdAt: string }[]>(
    [],
  );

  const theme = useTheme();

  const { user } = useAuthContext();
  let header = null;
  if (user) {
    header = user.header;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${BASE_BACKEND_URL}/api/jobs?standId=${selectedStand}`,
          {
            headers: {
              Authorization: `Basic ${header}`,
            },
          },
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        alert(error);
      }
    })();
  }, [selectedStand, header]);

  return (
    <Box
      sx={{
        padding: '5px',
        margin: '10px',
        border: `1px solid ${theme.palette.text.secondary}`,
        borderRadius: '5px',
      }}
    >
      {jobs.map((job, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px',
              padding: '5px',
            }}
          >
            <Typography fontSize={12}>{job.taskType}</Typography>

            <Typography fontSize={12}>{formatDate(job.createdAt)}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Jobs;
