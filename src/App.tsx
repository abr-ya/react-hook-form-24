import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogPosts, Error404, Food, Home, Pokemons, UsersForm } from "./pages";
import MainLayout from "./layout/MainLayout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/users" element={<UsersForm />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/food" element={<Food />} />
        <Route path="/posts" element={<BlogPosts />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
