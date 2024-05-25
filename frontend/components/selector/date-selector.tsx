import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

/*
    This code is more or less copied from https://mui.com/x/react-date-pickers/date-picker/
*/

export default function DateSelector(props: DatePickerProps<Dayjs>) {
  const { label, ...otherProps } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[320px] w-full">
      <label>{label}</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker {...otherProps} />
      </LocalizationProvider>
    </div>
  );
}
