const Message = () => {
  return (
    <div className= ''>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='Tailwind CSS chat bubble component' />
        </div>
      </div>

      <div className='chat-bubble text-white pb-2'>Hi this is me</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:34 pm</div>
  </div>
  );
};

export default Message;