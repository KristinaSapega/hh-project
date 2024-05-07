import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react';

import { AddOutlined } from '@mui/icons-material';
import {
  Box, // Checkbox,
  // FormControlLabel,
  IconButton, // MenuItem,
  // Select,
  // SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { Plugin } from '../types';

interface FormGeneratorProps {
  plugin: Plugin;
  formData: Array<{ [key: string]: string | boolean }>;
  setFormsData: Dispatch<
    SetStateAction<{ [key: number]: { [key: string]: string | boolean }[] }>
  >;
}

const FormGenerator: FunctionComponent<FormGeneratorProps> = ({
  plugin,
  formData,
  setFormsData,
}) => {
  const { id, name, description, paramsSchema } = plugin;
  const fields =
    paramsSchema &&
    Object.entries(paramsSchema.properties.services.items.properties);
  const [formsCount, setFormsCount] = useState<number>(1);

  const handleInputChange =
    (formId: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === 'checkbox' ? checked : value;
      setFormsData((prevData) => {
        const updatedFormData = [...prevData[id]];
        updatedFormData[formId] = {
          ...updatedFormData[formId],
          [name]: fieldValue,
        };

        return {
          ...prevData,
          [id]: updatedFormData,
        };
      });
    };

  // const handleCheckboxChange =
  //   (formId: number) => (e: ChangeEvent<HTMLInputElement>) => {
  //     const { name, checked } = e.target;
  //     setFormsData((prevData) => {
  //       const updatedFormData = [...prevData[id]];
  //       updatedFormData[formId] = {
  //         ...updatedFormData[formId],
  //         [name]: checked,
  //       };

  //       return {
  //         ...prevData,
  //         [id]: updatedFormData,
  //       };
  //     });
  //   };

  // const handleSelectChange =
  //   (formId: number) => (e: SelectChangeEvent<string>) => {
  //     const { name, value } = e.target;
  //     setFormsData((prevData) => {
  //       const updatedFormData = [...prevData[id]];
  //       updatedFormData[formId] = {
  //         ...updatedFormData[formId],
  //         [name]: value,
  //       };

  //       return {
  //         ...prevData,
  //         [id]: updatedFormData,
  //       };
  //     });
  //   };

  return (
    <Box sx={{ margin: '10px 0' }}>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography>{description}</Typography>
      </Box>
      {fields &&
        [...Array(formsCount)].map((_, index) => (
          <Box
            key={index}
            sx={{
              margin: '20px 0',
              padding: '30px',
              pt: '10px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.7)',
            }}
          >
            {fields.map(([field, { type }]) => {
              switch (type) {
                case 'string':
                  return (
                    <TextField
                      key={field}
                      label={field}
                      placeholder={field}
                      name={field}
                      value={(formData[index] && formData[index][field]) || ''}
                      onChange={handleInputChange(index)}
                      fullWidth
                      required
                      sx={{ margin: '10px 0' }}
                    />
                  );
                // case 'checkbox':
                //   return (
                //     <FormControlLabel
                //       key={field.name}
                //       control={
                //         <Checkbox
                //           checked={
                //             !!(formData[index] && formData[index][field.name])
                //           }
                //           onChange={handleCheckboxChange(index)}
                //           name={field.name}
                //           required
                //         />
                //       }
                //       label={field.placeholder}
                //     />
                //   );
                // case 'select':
                //   return (
                //     <Select
                //       key={field.name}
                //       value={
                //         (formData[index] &&
                //           (formData[index][field.name] as string)) ||
                //         ''
                //       }
                //       onChange={handleSelectChange(index)}
                //       fullWidth
                //       label={field.placeholder}
                //       name={field.name}
                //       required
                //     >
                //       {field.options?.map((option) => (
                //         <MenuItem key={option} value={option}>
                //           {option}
                //         </MenuItem>
                //       ))}
                //     </Select>
                //   );
                default:
                  return null;
              }
            })}
          </Box>
        ))}
      <Tooltip title="Добавить еще одну таску">
        <IconButton onClick={() => setFormsCount((prev) => prev + 1)}>
          <AddOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FormGenerator;
