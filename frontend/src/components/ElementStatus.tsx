import { Box } from "@mui/system";
import { FunctionComponent } from "react";

enum Status {
  Stopped = 'stopped',
  Running = 'running',
  Pause = 'pause',
}

interface StatusColorMap {
  [key: string]: string;
}

const statusColorMap: StatusColorMap = {
  [Status.Stopped]: 'red',
  [Status.Running]: 'green',
  [Status.Pause]: 'orange',
};

const ElementStatus: FunctionComponent<{status: string}> = ({ status }) => {
  return (
    <>
      <Box
        sx={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          mr: '10px',
          backgroundColor: `${statusColorMap[status]}`,
          borderRadius: '50%',
        }}
      ></Box>
      {status}
    </>
  );
};

export default ElementStatus;
