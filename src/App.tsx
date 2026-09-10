import Herosection from "./components/Herosection"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
    <div className="w-full min-h-screen bg-[url('/background_image.jpg')] bg-cover bg-center -z-1">
    <Navbar/>
    <Herosection/>
    </div>
    </>
  )
}

export default App