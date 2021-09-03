import { AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai';

const LINKS = {
  INSTAGRAM: 'https://instagram.com/ACME Inc',
  LINKEDIN: 'https://www.linkedin.com/company/kerja-by-permias-nasional',
  CONTACT: 'mailto:team@ACME Inc',
  PRIVACY_POLICY: '/privacy',
  TERMS: '/terms',
};
export default function Footer(props) {
  return (
    <div
      className="font-display text-md  pt-8 pb-14text-white bg-gray-900 z-max w-screen"
      style={props?.style}
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-center text-3xl mb-2">
          <a className={classes.link} href={LINKS.INSTAGRAM}>
            <AiOutlineInstagram className=" mr-4" />
          </a>
          <a className={classes.link} href={LINKS.LINKEDIN}>
            <AiFillLinkedin />
          </a>
        </div>
        <div className="w-full flex justify-center  mb-2">
          <a className={classes.link} href={LINKS.CONTACT}>
            Contact
          </a>
          <a className={classes.link} href={LINKS.TERMS}>
            Terms and conditions
          </a>
          <a className={classes.link} href={LINKS.PRIVACY_POLICY}>
            Privacy policy
          </a>
        </div>
        <div className={classes.link}>©2021 ACME Inc All rights reserved.</div>
      </div>
    </div>
  );
}
const classes = {
  linkContainer: 'flex-col flex dark:text-white ',
  linkHeader: 'text-white text-sm p-2 font-bold',
  link: 'text-white items-center flex p-2 rounded-md hover:text-gray-400 duration-300 ease-in-out dark:text-white dark:hover:bg-gray-700 cursor-pointer font-display',
};
