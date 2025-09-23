import FavoriteMovies from "./components/FavoriteMovies";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/layout";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Layout>
        <Header />
        <main className="flex-1">
          <MovieList />
          <FavoriteMovies />
        </main>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
