import MenuHighlight from "@/components/MenuHighlight";
import Header from "@/components/Header";
import About from "@/components/About";
import Navbar from "./components/navbar";
import Contact from "@/components/contact";
import RamadanMenu from "@/components/Ramadan/RamadanMenu";
import Events from "@/components/Events";
import RamadanBubble from "@/components/Ramadan/RamadanBubble";

export default function Page() {
  let isRamadan = new Date() < new Date("2026-03-28");
  return (
    <div>
      <Navbar ramadan={isRamadan} />
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
