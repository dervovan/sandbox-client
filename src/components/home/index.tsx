import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
  const selectUser = (state: RootState) => state.auth;
  const userData = useAppSelector(selectUser);
  return (
    <div>
      {JSON.stringify(userData)}
      <br/>
      <br/>
      <br/>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ratione
      tempora. Voluptates, veritatis nihil! Facere eos fugit, deserunt quo
      nesciunt tempora doloribus itaque, cum repellat sunt mollitia voluptate
      magni quisquam!
    </div>
  );
};

export default Home;
