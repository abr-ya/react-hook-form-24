import { FC } from "react";
import styles from "./poce-card.module.css";

interface IPoceCard {
  imgSrc: string;
  name: string;
}

const PoceCard: FC<IPoceCard> = ({ imgSrc, name }) => (
  <div className={styles.cardContainer}>
    <h3 className={styles.cardTitle}>Selected Pokemon:</h3>
    <img src={imgSrc} className={styles.pokemonImage} aria-label="Image of Pokemon Selected" />
    <label className={styles.pokemonName}>{name}</label>
  </div>
);

export default PoceCard;
