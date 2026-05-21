import './App.css'
import Content from './components/Content'
import Footer from './layout/Footer'
import Header from './layout/Header'

function App() {
  return (
    <div className="w-full max-w-[430px] mx-[auto] bg-red-1000">
      <Header />
      <div id="profile" className="flex mx-6 mt-[30px]">
        <img
          className="w-[125px] h-[150px] object-cover rounded-xl"
          src="https://cobasiblog.blob.core.windows.net/production-ofc/2021/05/hamster-mordendo-topo.png"
          alt="Hamster Lindo"
        />
        <ul className="mt-11 ml-7">
          <li>Seu Hamster</li>
          <li>+55 11 4002-8922</li>
          <li>Motorista</li>
        </ul>
      </div>
      
      <Content />
      <Footer />
    </div>
  )
}

export default App
