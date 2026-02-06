 
import MenuHighlight from '@/components/MenuHighlight';
import Header from '@/components/Header';
import About from '@/components/About';
import Navbar from './components/navbar';
import Contact from '@/components/Contact';

export default function Page() {
  return <div>
    <Navbar/>
    <Header/>
    <About/>
    <MenuHighlight/>
    <Contact/>
  </div>;
}
