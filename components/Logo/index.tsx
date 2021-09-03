import styles from './styles.module.css';

export default function Logo() {
  return (
    <div>
      <div className="mr-4 ml-4 md:ml-none  ">
        <img
          src="https://res.cloudinary.com/yosuam19/image/upload/v1611415280/polaroid/logo_vtmwdp.png"
          alt="Picture of the author"
          width={50}
          height={50}
        />
        <div className="w-auto">
          <div className={styles.logoName + ' colorful'}>
            <div>Virtual</div>
            <div>Things!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
