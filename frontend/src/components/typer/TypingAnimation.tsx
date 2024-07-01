import { TypeAnimation } from "react-type-animation";

function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={["Chat with your own AI", 1000, "Built with Open Ai", 1000]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
}

export default TypingAnimation;
