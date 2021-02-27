/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.skauting.sk"
              target="_blank"
              className={classes.a}
            >
              Slovenský skauting 
            </a>
            &nbsp;v spolupráci s NorthFlow s.r.o | Všetky práva vyhradené 
          </span>
        </p>
      </div>
    </footer>
  );
}
