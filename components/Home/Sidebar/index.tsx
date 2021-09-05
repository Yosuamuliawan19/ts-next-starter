import {
  AiFillInstagram,
  AiFillMediumSquare,
  AiOutlineTwitter,
  AiFillLinkedin,
} from 'react-icons/ai';
export default function ExperienceSection() {
  return (
    <>
      <div className="fixed left-0 top-0 flex flex-col justify-center h-screen px-4 border-r-gray-200 border-2 ">
        <div>
          <AiFillInstagram className="text-2xl md:mb-8" />
        </div>
        <div>
          <AiFillMediumSquare className="text-2xl md:mb-8" />
        </div>
        <div>
          <AiOutlineTwitter className="text-2xl md:mb-8" />
        </div>
        <div>
          <AiFillLinkedin className="text-2xl md:mb-8" />
        </div>
      </div>
    </>
  );
}
