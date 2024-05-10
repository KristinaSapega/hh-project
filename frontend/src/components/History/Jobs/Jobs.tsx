import { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { BASE_BACKEND_URL } from '../../../routes/routes';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

interface JobsProps {
  selectedStand: string;
}

interface Jobs {
  [key: string]: Array<{
    taskType: string;
    createdAt: string;
  }>;
}

const Jobs: FC<JobsProps> = ({ selectedStand }) => {
  const [jobs, setJobs] = useState<Jobs>({});

  const { user } = useAuthContext();
  let header = null;
  if (user) {
    header = user.header;
  }

  useEffect(() => {
    const getJobs = async (): Promise<void> => {
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
        if (
          (jobs[selectedStand] && data.length !== jobs[selectedStand].length) ||
          !jobs[selectedStand]
        ) {
          setJobs((prev) => {
            return {
              ...prev,
              [selectedStand]: data,
            };
          });
        }
      } catch (error) {
        alert(error);
      }
    };

    const interval: number = setInterval(getJobs, 500);

    return () => {
      clearInterval(interval);
    };
  }, [selectedStand, header, jobs]);

  return (
    <Box
      sx={{
        padding: '5px',
        margin: '10px',
      }}
    >
      {jobs[selectedStand] &&
        jobs[selectedStand].map((job, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.5,
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
