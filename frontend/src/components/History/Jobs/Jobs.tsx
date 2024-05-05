import { FC, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { BASE_BACKEND_URL } from '../../../routes/routes';
import { useAuthContext } from '../../../hooks/useAuthContext';

interface JobsProps {
  selectedStand: string;
}

const Jobs: FC<JobsProps> = ({ selectedStand }) => {
  const [jobs, setJobs] = useState<{ taskType: string }[]>([]);

  const { user } = useAuthContext();
  let header = null;
  if (user) {
    header = user.header;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${BASE_BACKEND_URL}/api/jobs?standId=${selectedStand}`, {
            headers: {
              Authorization: `Basic ${header}`,
            }
          }
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
    <Box sx={{
      padding: '10px',
    }}>
      {jobs.map((job, index) => {
        return <Box key={index}>{job.taskType}</Box>;
      })}
    </Box>
  );
};

export default Jobs;
