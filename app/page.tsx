import  Home  from './User/Home/home/page'
import Navbar from './components/navbar'
import Desk from './User/Home/desk/page'
import Lokasi from './User/Home/lokasi/page'
import Berita from './User/Home/berita/page'
import Komentar from './User/Home/komentar/page'
import Bisnis from './User/Home/bisnis/page'
import Footer from './components/footer'
import PromoBanner from './User/Home/promoBanner/page'


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
      <div id="promo">
      <PromoBanner />
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
