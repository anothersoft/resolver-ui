import Top from "./Top";

import Visited from "./Visited";

import Quickstart from "./Quickstart";

import Widgets from "./Widgets";

import styles from "../../styles/Home.module.css";

// const About = () => (
//     <section className={styles.section}>
//         <div>
//             <div className={styles.pageTop}>
//                 <img width={32} height={32} src="data:image/png;base64,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" />
//                 <img width={32} height={32} src="data:image/png;base64,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" />
//                 <h2>
//                     FRESH LAUNCH!
//                 </h2>
//                 <img width={32} height={32} src="data:image/png;base64,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" />
//                 <img width={32} height={32} src="data:image/png;base64,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" />
//             </div>
//         </div>
//     </section>
// )

const Main = () => (
    <main className={styles.main}>
        <Top />
        <Visited />
        <Quickstart />
        <Widgets />
        <Top />
        {/*<About />*/}
    </main>
);

export default Main;