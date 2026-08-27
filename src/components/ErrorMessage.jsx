import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <div className={styles.error}>
    <span>⚠️</span>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
