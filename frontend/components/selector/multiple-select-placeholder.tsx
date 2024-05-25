"use client";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectableItem } from "./types";

/*
  This code is more or less copy-pasted from https://mui.com/material-ui/react-select/
*/

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectPlaceholder({
  label,
  items,
  onChange,
}: {
  label: string;
  items: SelectableItem[];
  onChange: (value: typeof selectedValue) => void;
}) {
  const [selectedValue, setSelectedValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2 max-w-[320px] w-full">
      <label>{label}</label>
      <FormControl>
        <Select
          multiple
          displayEmpty
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>None selected</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
