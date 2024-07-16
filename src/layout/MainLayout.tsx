import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <main className={styles.body}>
        <Outlet />
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};

export default MainLayout;
