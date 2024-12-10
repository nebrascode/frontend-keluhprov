const CardProgress = ({ number, text, icon, backgroundImage }) => {
  return (
    <div className="relative flex-1 h-[141px] bg-warning-3 rounded-[10px] overflow-hidden m-2">
      <div className="absolute top-[60px] left-[7px] font-bold text-[#1a1a1a] text-[32px]">
        {number}
      </div>
      <div className="absolute top-[105px] left-[7px] font-bold text-[#1a1a1a] text-[20px]">
        {text}
      </div>
      {backgroundImage && (
        <img
          className="absolute w-[205px] h-[150px] -top-6 left-[103px] transform -translate-x-[-5%]"
          alt="Background"
          src={backgroundImage}
        />
      )}
      <img
        className="absolute w-[42px] h-[38px] top-[20px] left-[7px]"
        alt="Icon"
        src={icon}
      />
    </div>
  );
};

export default CardProgress;
