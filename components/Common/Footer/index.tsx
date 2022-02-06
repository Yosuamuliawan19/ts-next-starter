import ContentLayout from '@components/Layout/ContentLayout';

export default function Footer() {
  return (
    <>
      <div className={'py-24 bg-black text-white '}>
        <ContentLayout>
          <div className="font-display bold text-md mb-2 ">Contact us</div>
          <div className={`font-display text-sm mt-4`}>
            © Yosua Muliawan, made with lots of ❤️ and ☕ from SG
          </div>
          <div className={`font-display text-sm mt-4`}>
            © 2021 All Rights Reserved. Yosua Muliawan
          </div>
        </ContentLayout>
      </div>
    </>
  );
}
