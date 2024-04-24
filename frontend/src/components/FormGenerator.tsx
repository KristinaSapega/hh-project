import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
} from 'react';

import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { Plugin } from '../types';

interface FormGeneratorProps {
  plugin: Plugin;
  formData: { [key: string]: string | boolean };
  setFormsData: Dispatch<
    SetStateAction<{ [key: number]: { [key: string]: string | boolean } }>
  >;
}

const FormGenerator: FunctionComponent<FormGeneratorProps> = ({
  plugin,
  formData,
  setFormsData,
}) => {
  const { id, name, description, fields } = plugin;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormsData((prevData) => ({
      ...prevData,
      [id]: {
        ...formData,
        [name]: fieldValue,
      },
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormsData((prevData) => ({
      ...prevData,
      [id]: {
        ...formData,
        [name]: checked,
      },
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormsData((prevData) => ({
      ...prevData,
      [id]: {
        ...formData,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    return () => {
      console.log(formData, id);
    };
  }, [formData, id]);

  return (
    <Box
      sx={{
        margin: '10px 0',
      }}
    >
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography>{description}</Typography>
      </Box>

      <Box
        sx={{
          margin: '20px 0',
          padding: '30px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.7)',
        }}
      >
        {fields &&
          fields.map((field) => {
            switch (field.type) {
              case 'input':
                return (
                  <TextField
                    key={field.name}
                    label={field.name}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{
                      margin: '10px 0',
                    }}
                  />
                );
              case 'checkbox':
                return (
                  <FormControlLabel
                    key={field.name}
                    control={
                      <Checkbox
                        checked={!!formData[field.name]}
                        onChange={handleCheckboxChange}
                        name={field.name}
                      />
                    }
                    label={field.placeholder}
                  />
                );
              case 'select':
                return (
                  <Select
                    key={field.name}
                    value={(formData[field.name] as string) || ''}
                    onChange={handleSelectChange}
                    fullWidth
                    label={field.placeholder}
                    name={field.name}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                );
              default:
                return null;
            }
          })}
      </Box>
    </Box>
  );
};

export default FormGenerator;
