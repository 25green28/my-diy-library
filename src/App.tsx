import './App.css'
import Header from "./components/Header.tsx";
import BookCard from "./components/BookCard.tsx";
import SearchBar from "./components/SearchBar.tsx";

function App() {
  return (
    <div className={"font-family-nunito"}>
      <Header></Header>
        <div className={"bg-mist-50 p-10 flex flex-col justify-center items-center gap-10"}>
            <SearchBar/>
            <div className={"flex flex-row gap-4 justify-center"}>
                <BookCard title={"Book 1"} author={"Author 1"} category={"Category 1"} year={2020}/>
                <BookCard title={"Book 1"} author={"Author 1"} category={"Category 1"} year={2020}/>
                <BookCard title={"Book 1"} author={"Author 1"} category={"Category 1"} year={2020}/>
                <BookCard title={"Book 1"} author={"Author 1"} category={"Category 1"} year={2020}/>
            </div>
        </div>
    </div>
  )
}

export default App
