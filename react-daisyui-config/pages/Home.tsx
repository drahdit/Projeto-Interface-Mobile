import Content from "../src/components/Content"
import Footer from "../src/layout/Footer"
import Header from "../src/layout/Header"

export default function Home() {
  return (
    <div className="w-full max-w-[430px] mx-[auto] bg-red-1000">
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      ></link>
      <Header />
      <div id="profile" className="flex mx-6 mt-[30px]">
        <img
          className="w-[125px] h-[150px] object-cover rounded-xl"
          src="https://i.pravatar.cc/1000?img=68"
          alt="Raul Seixas picture"
        />
        <ul className="mt-11 ml-7 font-[nunito] font-semibold">
          <li className="text-[20px] font-bold text-[#3f3677]">Raul Seixas</li>
          <li className="text-[12px] text-[#3f3677]">+55 11 4002-8922</li>
          <li className="text-[13px] text-[#c8c6d6]">Driver</li>
        </ul>
      </div>

      <Content />
      <Footer />
    </div>
  )
}
