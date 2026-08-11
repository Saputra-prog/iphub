import  Home  from './Home/home/page'
import Navbar from './components/navbar'
import Desk from './Home/desk/page'
import Lokasi from './Home/lokasi/page'
import Berita from './Home/berita/page'
import Komentar from './Home/komentar/page'
import Bisnis from './Home/bisnis/page'
import Footer from './components/footer'


function page() {
  return (
    <div>
      <Navbar />
      <div id="home">
      <Home />
      </div>
      <div id="desk">
      <Desk />
      </div>
      <div id="bisnis">
      <Bisnis />
      </div>
      <div id="lokasi">
      <Lokasi />
      </div>
      <div id="komentar">
      <Komentar />
      </div>
      <div id="berita">
      <Berita />
      </div>
      <div id="footer">
      <Footer />
      </div>
    </div>
  )
}

export default page
