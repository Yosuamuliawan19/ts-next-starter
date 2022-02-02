const variants = {
  hidden: { opacity: 0, x: 0, y: 200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function BaseLayout(props: React.PropsWithChildren<any>) {
  return (
    <div
      className={
        '    w-full transition-colors duration-200 ease-in-out ' +
        props.className
      }
      style={props?.style}
    >
      {props.children}
    </div>
  );
}

// export default function BaseLayout(props: React.PropsWithChildren<any>) {
//   return (
//     <motion.main
//       variants={variants} // Pass the variant object into Framer Motion
//       initial="hidden" // Set the initial state to variants.hidden
//       animate="enter" // Animated state to variants.enter
//       exit="exit" // Exit state (used later) to variants.exit
//       className=""
//       transition={{ ease: [0.6, 0.05, -0.01, 0.9] }}
//     >
//       <AnimatePresence
//         exitBeforeEnter
//         initial={false}
//         onExitComplete={() => window.scrollTo(0, 0)}
//       >
//         <div
//           className={
//             '    w-full transition-colors duration-200 ease-in-out ' +
//             props.className
//           }
//           style={props?.style}
//         >
//           {props.children}
//         </div>
//       </AnimatePresence>
//     </motion.main>
//   );
// }
