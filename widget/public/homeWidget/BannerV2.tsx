import TextType from "@/widget/otherWidget/DropboxTyping";


export default function BannerV2() {
  return (
    <div className="absolute inset-0 bg-black text-white h-[51%] w-full flex justify-center items-center">
      <div className="flex items-center text-3xl font-mono gap-2">
        <span className="whitespace-nowrap">Dev Force:</span>

        <span className="inline-block w-[28ch] text-left">
          <TextType
            text={[
              "Fire up your code!",
              "Unleash your creativity!",
              "Code smarter, not harder!",
            ]}
            typingSpeed={75}
            deletingSpeed={50}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            variableSpeed={{ min: 60, max: 120 }}
            cursorBlinkDuration={0.5}
          />
        </span>
      </div>
    </div>
  );
}
