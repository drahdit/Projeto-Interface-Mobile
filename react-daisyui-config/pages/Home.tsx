import Content from "../src/components/Content"
import Header from "../src/layout/Header"

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-[430px] mx-auto">
      <Header />
      <div id="profile" className="flex mx-6 mt-[30px]">
        <img
          className="w-[125px] h-[150px] object-cover rounded-xl"
          src="https://i.pravatar.cc/1000?img=68"
          alt="Foto de Raul Seixas"
        />
        <ul className="mt-11 ml-7 font-semibold">
          <li className="text-[20px] font-bold text-[#3f3677]">Raul Seixas</li>
          <li className="text-[12px] text-[#3f3677]">+55 11 4002-8922</li>
          <li className="text-[13px] text-[#c8c6d6]">Driver</li>
        </ul>
      </div>

      <Content />
    </div>
  )
}
