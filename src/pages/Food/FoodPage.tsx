import { useIngredients } from "./services/queries";
import { distributeProducts, getArrSum } from "./utils";

const FoodPage = () => {
  const ingredientsQuery = useIngredients();
  console.log(ingredientsQuery.data);

  // todo: => file
  const DESC = (a: number, b: number) => b - a;

  // todo: => number[][]
  const day1: number[] = [360, 430, 400, 250, 100, 540, 575, 100, 420, 180, 290];
  const day2: number[] = [500, 260, 245, 290, 100, 400, 400, 80, 250, 100, 430, 610, 100, 40, 180, 485];
  const day3: number[] = [410, 200, 470, 120, 100, 400, 80, 630, 375, 290, 400, 100, 570, 40, 180, 240];
  const day4: number[] = [430, 100, 410, 245, 250, 400, 130, 470, 740, 330, 400, 390, 100, 40, 180, 290];

  const numUsers = 5;

  const result1 = distributeProducts(day1, numUsers);
  const result2 = distributeProducts(day2, numUsers);
  const result3 = distributeProducts(day3, numUsers);
  const result4 = distributeProducts(day4, numUsers);

  const day1packs = result1.map((el) => getArrSum(el)).sort(DESC);
  const day2packs = result2.map((el) => getArrSum(el)).sort(DESC);
  const day3packs = result3.map((el) => getArrSum(el)).sort(DESC);
  const day4packs = result4.map((el) => getArrSum(el)).sort(DESC);

  return (
    <div>
      <h1>FoodPage</h1>
      <h2>start data:</h2>
      <ul>
        <li>
          day1 == {getArrSum(day1)}: {day1.join(" + ")}
        </li>
        <li>
          day2 == {getArrSum(day2)}: {day2.join(" + ")}
        </li>
        <li>
          day3 == {getArrSum(day3)}: {day3.join(" + ")}
        </li>
        <li>
          day4 == {getArrSum(day4)}: {day4.join(" + ")}
        </li>
        <li>users: {numUsers}</li>
      </ul>
      <h2>by days:</h2>
      <ul>
        <li>
          day1 == {getArrSum(day1)}: {day1packs.join(" + ")}
        </li>
        <li>
          day2 == {getArrSum(day2)}: {day2packs.join(" + ")}
        </li>
        <li>
          day3 == {getArrSum(day3)}: {day3packs.join(" + ")}
        </li>
        <li>
          day4 == {getArrSum(day3)}: {day4packs.join(" + ")}
        </li>
      </ul>
      <h2>by users:</h2>
      <p>todo!</p>
    </div>
  );
};

export default FoodPage;
