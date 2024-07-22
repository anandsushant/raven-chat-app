import { useEffect } from "react";
import useConversation from "../../zustand/useConversation.js";
import MessageInput from "./MessageInput.jsx";
import Messages from "./Messages.jsx" 
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext.jsx";

const MessageContainer = () => {
	const {selectedConversation, setSelectedConversation} = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='w-full min-h-72 flex flex-col'>
			{!selectedConversation ? ( <NoChatSelected /> 
			) : (
			<>
				<div className='bg-slate-600 px-4 py-2 mb-2 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40'>
					<span className='text-gray-300 font-bold text-lg '> {selectedConversation.firstName} {selectedConversation.lastName} </span>
				</div>
				<Messages />
				<MessageInput />
			</>
			)}
		</div>
	);
}

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {authUser.fullName} </p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};