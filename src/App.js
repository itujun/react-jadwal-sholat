import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('Surabaya');
  const [data, setData] = useState({});

  const waktuSholat = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const date = new Date();
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);

  useEffect(() => {
    fetch(`
https://api.aladhan.com/v1/timingsByAddress?date=${date.toLocaleDateString()}&address=${search}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
      });
  }, [search]);
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('./assets/bg-masjid.jpg')] bg-cover text-white">
      <div className="w-full flex flex-col justify-between items-center absolute top-5">
        <div className="w-full flex justify-between px-[70px] text-[#e3e6e8] font-bold">
          <div>
            <div>{hari[date.getDay()]}</div>
            <div>{formattedDate}</div>
          </div>
          <div>{search.toUpperCase()}</div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input === '') return;
            setSearch(input);
          }}
        >
          <input
            type="text"
            placeholder="Cari kota.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-full py-1 px-5 outline-none text-slate-950 focus:shadow-md focus:shadow-yellow-200"
          />
          <input type="submit" value="" />
        </form>
      </div>

      <div className="w-[200px] bg-slate-300 rounded-xl text-slate-950 flex flex-col">
        {data.date &&
          waktuSholat.map((item) => {
            return (
              <li
                key={item}
                className="odd:text-[#34a76d] even:text-[#0b0b0a] rounded-xl py-2 px-3 flex justify-between"
              >
                <div className="font-semibold">{item}</div>
                <div className="font-bold">{data.timings[`${item}`]}</div>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default App;
