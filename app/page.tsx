import MenuHighlight from "@/components/MenuHighlight";
import Header from "@/components/Header";
import About from "@/components/About";
import Navbar from "./components/navbar";
import Contact from "@/components/contact";
import RamadanMenu from "@/components/Ramadan/RamadanMenu";
import Events from "@/components/Events";
import RamadanBubble from "@/components/Ramadan/RamadanBubble";
import AidPopup from "@/components/Aid/AidPopup";

export default function Page() {
  let isRamadan = false;
  let isAid = new Date() >= new Date("2026-03-19") && new Date() < new Date("2026-03-21");
  return (
    <div>
      {isAid && <AidPopup/>}
      <Navbar ramadan={isRamadan}/>
      <Header />
      <About />
      <MenuHighlight />
      {isRamadan && <div id="iftar"><RamadanMenu /></div>}
      {isRamadan && <RamadanBubble />}
      <div id="evenements"><Events /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
}
