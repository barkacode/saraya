 
import MenuHighlight from '@/components/MenuHighlight';
import Header from '@/components/Header';
import About from '@/components/About';
import Navbar from './components/navbar';
export default function Page() {
  return <div>
    <Navbar/>
    <Header/>
    <About/>
    <MenuHighlight/>
  </div>;
}
