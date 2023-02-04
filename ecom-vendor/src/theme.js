import { amber, deepOrange, grey } from "@mui/material/colors";
import { createContext } from "react";
import { constant } from "./utils/constant";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const getDesignTokens = (mode) => ({
    components: {
        MuiButton: {
          defaultProps: {
            size: 'small',
          },
        },
        MuiFilledInput: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiFormControl: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiFormHelperText: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiIconButton: {
          defaultProps: {
            size: 'small',
          },
        },
        MuiInputBase: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiInputLabel: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiListItem: {
          defaultProps: {
            dense: true,
          },
        },
        MuiOutlinedInput: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiFab: {
          defaultProps: {
            size: 'small',
          },
        },
        MuiTable: {
          defaultProps: {
            size: 'small',
          },
        },
        MuiTextField: {
          defaultProps: {
            margin: 'dense',
            size: 'small'
          },
        },
        MuiToolbar: {
          defaultProps: {
            variant: 'dense',
          },
        },
      },
    palette: {
      mode,
      ...(mode === constant.themeMode.light
        ? {
            // palette values for light mode
           
          }
        : {
            // palette values for dark mode
           
          }),
    },
  });
  