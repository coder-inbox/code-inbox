import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { executeCode } from "@app/store/mailAppReducer/actions";

const languages = [
  { name: "JavaScript", judge0Id: 63 },
  { name: "Python", judge0Id: 71 },
  { name: "Java", judge0Id: 62 },
  { name: "C++", judge0Id: 54 },
  { name: "Ruby", judge0Id: 72 },
  { name: "Go", judge0Id: 60 },
  { name: "C", judge0Id: 50 },
  { name: "C#", judge0Id: 51 },
  { name: "Swift", judge0Id: 75 },
  { name: "Kotlin", judge0Id: 78 },
  { name: "R", judge0Id: 76 },
  { name: "PHP", judge0Id: 68 },
  { name: "TypeScript", judge0Id: 74 },
  { name: "Rust", judge0Id: 73 },
  { name: "Perl", judge0Id: 59 },
  { name: "Haskell", judge0Id: 67 },
  { name: "Scala", judge0Id: 66 },
  { name: "Dart", judge0Id: 69 },
  { name: "Lua", judge0Id: 70 },
  { name: "Elixir", judge0Id: 64 },
  { name: "Julia", judge0Id: 77 },
  { name: "Objective-C", judge0Id: 61 },
  { name: "COBOL", judge0Id: 56 },
  { name: "Fortran", judge0Id: 55 },
  { name: "PL/SQL", judge0Id: 65 },
  { name: "VHDL", judge0Id: 57 },
  { name: "Verilog", judge0Id: 58 },
  { name: "Assembly", judge0Id: 53 },
  { name: "MATLAB", judge0Id: 52 },
  { name: "Ada", judge0Id: 74 },
  { name: "Pascal", judge0Id: 58 },
  { name: "Groovy", judge0Id: 19 },
  { name: "F#", judge0Id: 12 },
  { name: "Scheme", judge0Id: 18 },
  { name: "Prolog", judge0Id: 7 },
  { name: "Lisp", judge0Id: 9 },
  { name: "Bash", judge0Id: 14 },
  { name: "PowerShell", judge0Id: 52 },
  { name: "Racket", judge0Id: 19 },
  { name: "Smalltalk", judge0Id: 10 },
  { name: "Erlang", judge0Id: 16 },
  { name: "Clojure", judge0Id: 20 },
  { name: "COOL", judge0Id: 13 },
  { name: "D", judge0Id: 21 },
  { name: "Eiffel", judge0Id: 22 },
  { name: "Forth", judge0Id: 23 },
  { name: "Haxe", judge0Id: 24 },
  { name: "Io", judge0Id: 25 },
  { name: "J", judge0Id: 26 },
  { name: "JScript", judge0Id: 27 },
  { name: "LabVIEW", judge0Id: 28 },
  { name: "Objective-J", judge0Id: 29 },
  { name: "OCaml", judge0Id: 30 },
  { name: "OpenCL", judge0Id: 31 },
  { name: "PigLatin", judge0Id: 32 },
  { name: "PureScript", judge0Id: 33 },
  { name: "Q#", judge0Id: 34 },
  { name: "Red", judge0Id: 35 },
  { name: "Ring", judge0Id: 36 },
  { name: "Scala", judge0Id: 37 },
  { name: "Scratch", judge0Id: 38 },
  { name: "SQL", judge0Id: 39 },
  { name: "Tcl", judge0Id: 40 },
  { name: "UnrealScript", judge0Id: 41 },
  { name: "V", judge0Id: 42 },
  { name: "XSLT", judge0Id: 43 },
  { name: "Zsh", judge0Id: 44 },
  { name: "Ada", judge0Id: 45 },
  { name: "ALGOL", judge0Id: 46 },
  { name: "APL", judge0Id: 47 },
  { name: "Awk", judge0Id: 48 },
  { name: "DIBOL", judge0Id: 49 },
  { name: "Dylan", judge0Id: 50 },
  { name: "Euphoria", judge0Id: 51 },
  { name: "Fjölnir", judge0Id: 52 },
  { name: "Gosu", judge0Id: 53 },
  { name: "Harbour", judge0Id: 54 },
  { name: "Idris", judge0Id: 55 },
  { name: "Joule", judge0Id: 56 },
  { name: "Kaleidoscope", judge0Id: 57 },
  { name: "Ladder Logic", judge0Id: 58 },
  { name: "Leda", judge0Id: 59 },
  { name: "LiveScript", judge0Id: 60 },
  { name: "M4", judge0Id: 61 },
  { name: "MAD", judge0Id: 62 },
  { name: "Maple", judge0Id: 63 },
  { name: "Max", judge0Id: 64 },
  { name: "Mercury", judge0Id: 65 },
  { name: "Mirah", judge0Id: 66 },
  { name: "MIVA Script", judge0Id: 67 },
  { name: "MOO", judge0Id: 68 },
  { name: "MUMPS", judge0Id: 69 },
  { name: "Napier88", judge0Id: 70 },
  { name: "Neko", judge0Id: 71 },
  { name: "Nemerle", judge0Id: 72 },
  { name: "Nim", judge0Id: 73 },
  { name: "Nu", judge0Id: 74 },
  { name: "NWScript", judge0Id: 75 },
  { name: "Oberon", judge0Id: 76 },
  { name: "Object Rexx", judge0Id: 77 },
  { name: "Occam", judge0Id: 78 },
  { name: "OPL", judge0Id: 79 },
  { name: "Pike", judge0Id: 80 },
  { name: "Pizza", judge0Id: 81 },
  { name: "Pop-11", judge0Id: 82 },
  { name: "PostScript", judge0Id: 83 },
  { name: "Promela", judge0Id: 84 },
  { name: "Pure Data", judge0Id: 85 },
  { name: "REBOL", judge0Id: 86 },
  { name: "Redcode", judge0Id: 87 },
  { name: "Refal", judge0Id: 88 },
  { name: "Ring", judge0Id: 89 },
  { name: "S-Lang", judge0Id: 90 },
  { name: "Sather", judge0Id: 91 },
  { name: "Sed", judge0Id: 92 },
  { name: "Setl", judge0Id: 93 },
  { name: "Shakespeare", judge0Id: 94 },
  { name: "SIMSCRIPT", judge0Id: 95 },
  { name: "Singularity", judge0Id: 96 },
  { name: "SPARK", judge0Id: 97 },
  { name: "Squeak", judge0Id: 98 },
  { name: "Standard ML", judge0Id: 99 },
  { name: "SuperCollider", judge0Id: 100 },
  { name: "Turing", judge0Id: 101 },
  { name: "Ubercode", judge0Id: 102 },
  { name: "Umple", judge0Id: 103 },
  { name: "Vala", judge0Id: 104 },
  { name: "Vim script", judge0Id: 105 },
  { name: "Visual Basic", judge0Id: 106 },
  { name: "WebAssembly", judge0Id: 107 },
  { name: "xBase", judge0Id: 108 },
];

const MailCodeExecute = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { codeResult } = useSelector(({ mailApp }) => mailApp);

  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const judge0LanguageId = languages.find(
      (lang) => lang.name === language,
    )?.judge0Id;

    dispatch(executeCode({ code: code, language_id: judge0LanguageId }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} m={20}>
      <Typography variant="h2" gutterBottom>
        Execute Code
      </Typography>{" "}
      {/* Heading */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={{ margin: theme.spacing(1), minWidth: 120 }}
          >
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.id}
                  value={lang.name}
                  sx={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Code"
            multiline
            rows={5}
            variant="outlined"
            sx={{ margin: theme.spacing(1), width: "100%" }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} mt={10}>
          <Button type="submit" variant="contained" color="primary">
            Execute Code
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h2" gutterBottom mt={10}>
        Result:
      </Typography>
      {codeResult && (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: theme.spacing(2) }}>
            <Typography variant="h6">{codeResult}</Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default MailCodeExecute;
