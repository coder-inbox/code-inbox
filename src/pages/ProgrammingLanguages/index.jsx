import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateLanguage } from "@app/store/authReducer/actions";
import { useDispatch } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export const programmingLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "C",
  "C#",
  "Swift",
  "Kotlin",
  "R",
  "PHP",
  "TypeScript",
  "Rust",
  "Perl",
  "Haskell",
  "Scala",
  "Dart",
  "Lua",
  "Elixir",
  "Julia",
  "Objective-C",
  "COBOL",
  "Fortran",
  "PL/SQL",
  "VHDL",
  "Verilog",
  "Assembly",
  "MATLAB",
  "Ada",
  "Pascal",
  "Groovy",
  "F#",
  "Scheme",
  "Prolog",
  "Lisp",
  "Bash",
  "PowerShell",
  "Racket",
  "Smalltalk",
  "Erlang",
  "Clojure",
  "COOL",
  "D",
  "Eiffel",
  "Forth",
  "Haxe",
  "Io",
  "J",
  "JScript",
  "LabVIEW",
  "Objective-J",
  "OCaml",
  "OpenCL",
  "PigLatin",
  "PureScript",
  "Q#",
  "Red",
  "Ring",
  "Scala",
  "Scratch",
  "SQL",
  "Tcl",
  "UnrealScript",
  "V",
  "XSLT",
  "Zsh",
  "Ada",
  "ALGOL",
  "APL",
  "Awk",
  "DIBOL",
  "Dylan",
  "Euphoria",
  "Fjölnir",
  "Gosu",
  "Harbour",
  "Idris",
  "Joule",
  "Kaleidoscope",
  "Ladder Logic",
  "Leda",
  "LiveScript",
  "M4",
  "MAD",
  "Maple",
  "Max",
  "Mercury",
  "Mirah",
  "MIVA Script",
  "MOO",
  "MUMPS",
  "Napier88",
  "Neko",
  "Nemerle",
  "Nim",
  "Nu",
  "NWScript",
  "Oberon",
  "Object Rexx",
  "Occam",
  "OPL",
  "Pike",
  "Pizza",
  "Pop-11",
  "PostScript",
  "Promela",
  "Pure Data",
  "REBOL",
  "Redcode",
  "Refal",
  "Ring",
  "S-Lang",
  "Sather",
  "Sed",
  "Setl",
  "Shakespeare",
  "SIMSCRIPT",
  "Singularity",
  "SPARK",
  "Squeak",
  "Standard ML",
  "SuperCollider",
  "Turing",
  "Ubercode",
  "Umple",
  "Vala",
  "Vim script",
  "Visual Basic",
  "WebAssembly",
  "xBase",
];

export const schedulingOptions = [
  "Every hour",
  "Every day",
  "Every week",
  "Every month",
];

const ProgrammingLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleChangeSchedule = (event) => {
    setSelectedSchedule(event.target.value);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    localStorage.setItem("language", selectedLanguage);
    localStorage.setItem("schedule", selectedSchedule);
    dispatch(
      updateLanguage({
        language: selectedLanguage,
        schedule: selectedSchedule,
        welcome: true,
      }),
    );
    navigate("/mail");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
        component="form"
        onSubmit={handleSubscribe}
      >
        <Typography variant="h1" sx={{ marginBottom: 20 }} gutterBottom>
          Subscribe for Daily Algorithms
        </Typography>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="language-label">
            Choose a programming language
          </InputLabel>
          <Select
            labelId="language-label"
            label="Choose a programming language"
            value={selectedLanguage}
            onChange={handleChangeLanguage}
            required
          >
            {programmingLanguages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 300, marginTop: 20 }}>
          <InputLabel id="schedule-label">Choose a schedule</InputLabel>
          <Select
            labelId="schedule-label"
            label="Choose a schedule"
            value={selectedSchedule}
            onChange={handleChangeSchedule}
            required
          >
            {schedulingOptions.map((schedule) => (
              <MenuItem key={schedule} value={schedule}>
                {schedule}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!selectedLanguage || !selectedSchedule}
          sx={{ marginTop: 15 }}
        >
          Subscribe
        </Button>
      </Box>
    </Container>
  );
};

export default ProgrammingLanguages;
