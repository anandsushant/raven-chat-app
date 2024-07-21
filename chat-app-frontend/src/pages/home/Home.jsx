import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Home = () => {
  return (
    <div className='flex w-5/6 sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-30'>
      <Sidebar />
      <MessageContainer/>
    </div>
  )
};  

export default Home;



// 'flex sm:h-4[450px] md:has-[550px] rounded-lg overflow-hidden bg-clip-padding'