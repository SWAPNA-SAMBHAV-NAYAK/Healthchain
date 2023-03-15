import * as React from "react";
import * as Redux from "react-redux";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { saveDoctorOpenHours } from "../../../redux/actions/doctorOpenHoursAction";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const timeSlots = [
  "09:00-09:15",
  "09:15-09:30",
  "09:30-09:45",
  "09:45-10:00",
  "10:00-10:15",
  "10:15-10:30",
  "10:30-10:45",
  "10:45-11:00",
  "11:00-11:15",
  "11:15-11:30",
  "11:30-11:45",
  "11:45-12:00",
  "12:00-12:15",
  "12:15-12:30",
  "12:30-12:45",
  "12:45-13:00",
  "13:00-13:15",
  "13:15-13:30",
  "13:30-13:45",
  "13:45-14:00",
  "14:00-14:15",
  "14:15-14:30",
  "14:30-14:45",
  "14:45-15:00",
  "15:00-15:15",
  "15:15-15:30",
  "15:30-15:45",
  "15:45-16:00",
  "16:00-16:15",
  "16:15-16:30",
  "16:30-16:45",
  "16:45-17:00",
  "17:00-17:15",
  "17:15-17:30",
  "17:30-17:45",
  "17:45-18:00",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function TimeSelector({ i }) {
  const theme = useTheme();

  const [time, setTime] = React.useState([]);

  const dispatch = Redux.useDispatch();

  const { doctorOpenHoursList } = Redux.useSelector(state => state);


  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTime(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

  };



  React.useEffect(() => {
    const updatedOpenHourList = doctorOpenHoursList;

    if (i >= 0) {
      updatedOpenHourList[i].timeSelected = time;
    }

    // if (i >= 0) {
    //   updatedOpenHourList.timeSelected[i] = time;
    // }


    dispatch(saveDoctorOpenHours(updatedOpenHourList));

  }, [time])


  return (
    <div>
      <FormControl sx={{
        m: 0,
      }}>
        <InputLabel id="demo-multiple-chip-label">Time</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={time}
          onChange={handleTimeChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                key={value}
                label={value}
                sx={{ color: 'white', backgroundColor: '#8FB9AA' }}
              />
              
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {timeSlots.map((t) => (
            <MenuItem
              key={t}
              value={t}
              style={getStyles(t, time, theme)}
            >
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
