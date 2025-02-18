import { Loader, Paper } from '@mantine/core';
import styles from './Loading.module.css';

export function Loading() {
  return (
    <Paper shadow="md" radius="md" withBorder role="progressbar" className={styles.loading}>
      <Loader color="blue" size="xl" />
    </Paper>
  );
}
