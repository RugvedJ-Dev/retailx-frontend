import { Button } from "./ui/button"

const Herosection = () => {
  return (
    <div className="flex justify-center flex-col items-center" >
      <h1 className="text-white fancy-heading text-[4.8vw] w-[65%] mx-auto text-center mt-20" >Manage and visualize your sales seamlessly with Natural language</h1>
      <div className="flex justify-around items-center w-[30%] mt-15" >
        <Button variant="outline" className="w-40 h-10 font-serif text-xl rounded-4xl mr-7">Sign In</Button>
        
      </div>
    </div>
  )
}

export default Herosection