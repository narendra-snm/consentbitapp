// HoverImage.js

import questionMark from "../assets/questionMark.png"
const QuestionMark = ({ hoverText,isLeft=false,isTop=false }: { hoverText: string ,isLeft?:boolean,isTop?:boolean}) => (
   <div className="hover-image-container">
    <img src={questionMark} alt="Hoverable" className="hover-image" />
    <div className="hover-text" style={{left:isLeft?"-87px":"-22px", top:isTop?"-136px":"30px"}}>{hoverText}</div>
  </div>
);

export default QuestionMark;
