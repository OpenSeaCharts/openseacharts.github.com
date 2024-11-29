import {Container, Group} from '@mantine/core';
import classes from './HeaderMenu.module.css';
import {FaGithub} from "react-icons/fa6";
import {Link} from "react-router-dom";

export function HeaderMenu() {
  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Link to={"/"} className={classes.logo}>
            <img src={"/logo.svg"} alt="logo" />
            <strong>OpenSeaCharts</strong>
          </Link>
          <Group gap={5}>
            <a
              key={"github"}
              href={"https://github.com/openseacharts"}
              target={"_blank"}
              className={classes.link}
            >
              <FaGithub size={25}/>
            </a>
          </Group>
        </div>
      </Container>
    </header>
  );
}