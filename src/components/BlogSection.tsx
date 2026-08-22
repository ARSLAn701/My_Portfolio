// src/components/BlogSection.tsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  number: string;
  date: string;
  readTime: string;
  title: string;
  subtitle: string;
  tags: string[];
  excerpt: string;
  content: React.ReactNode;
}

const blogPosts: BlogPost[] = [
  {
    id: 'b04',
    number: '04',
    date: 'JAN 2025',
    readTime: '8 MIN READ',
    title: 'JOB KE DO MAHINE BAAD HI AISA TASK MILA',
    subtitle:
      'Ek fresher ka pehla real challenge — SCM module, 14 APIs, aur wo lesson jo college mein kabhi nahi mila',
    tags: ['CodeIgniter', 'SCM', 'APIs', 'Career'],
    excerpt:
      '5 August 2024. Mera pehla din job pe. College khatam hue sirf 2 mahine hue the, aur confidence tha ki coding aati hai. Lekin industry level experience ka naam hi nahi tha mere paas — ye farak pehle hafte mein hi samajh aa gaya.',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          5 August 2024. Mera pehla din job pe.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          College khatam hue sirf 2 mahine hue the. Un 2 mahino mein maine PHP
          khoob practice kiya tha, syntax se lekar chhote projects tak sab try
          kiya. Confidence tha ki coding aati hai.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin sach kahun toh, industry level experience ka toh naam hi nahi
          tha mere paas.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-sm font-mono text-[#D4AF37] mb-2 uppercase tracking-widest">
            // PEHLA HAFTA
          </p>

          <p className="text-base italic text-[#E8DFD8]">
            Ye farak mujhe pehle hafte mein hi samajh aa gaya.
          </p>
        </div>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          SHURUAAT: SAB KUCH NAYA THA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Company mein CodeIgniter framework se pehli baar mulaqaat hui. CRUD
          operations samajhne pade, aur maine apna pehla API bhi likha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Simple lag raha tha? Bilkul nahi. Database design kaise karte hain,
          code ka structure kaisa hona chahiye, ek API request response tak
          kaise jaati hai — ye sab cheezein dhire dhire samajh aayi. Har din
          kuch naya seekhna padta tha. Aur jaise jaise time badhta gaya, waise
          hi responsibility bhi badhti gayi.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          NAYE TOOLS, NAYE CHALLENGES
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Kuch aisi cheezein saamne aayi jinke naam maine college mein kabhi
          suna hi nahi tha. FCM yaani Firebase Cloud Messaging. Critical tasks
          perform karna. CSV files banana. Excel files generate karna. Bade
          bade JSON payloads ko study karna aur unpe research karna.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Phir aaya JWT authentication aur validation ka concept — har API ko
          session handle karne ke liye ye chahiye hota hai, ye bhi seekha. Ye
          sab dhire dhire mera daily routine ban gaya. Naya seekho, apply karo,
          aage badho.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          TURNING POINT: SCM MODULE
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Phir aaya November 2024. Ek task assign hua jiska naam tha SCM —
          Supply Chain Management. Ye koi chhota feature nahi tha, poora ek
          module tha. Total 14 alag-alag APIs.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Har API ka apna logic. Har cheez ka apna rule. Kuch category ke liye,
          kuch items ke liye, aur kuch SKU code ke liye — jo ki raw material aur
          finished goods ko identify karne wala unique code hota hai.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Shuru mein laga, "theek hai, kar lunga." Lekin jaise jaise andar gaya,
          complexity samajh aane lagi.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          STRUGGLE: JAB SAB KUCH BAHUT ZYADA LAGNE LAGA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Ek hi feature ko complete karte karte meri halat kharab ho gayi thi.
          Itni saari cheezein ek saath handle karna, time manage karna — mushkil
          ho raha tha. Kabhi lagta ek cheez fix ki toh doosri jagah issue aa
          gaya. Kabhi samajh hi nahi aata ki shuru kahan se karun.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Us waqt mujhe laga ki shayad ye mujhse nahi hoga.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-sm font-mono text-[#D4AF37] mb-2 uppercase tracking-widest">
            // LESSON LEARNED
          </p>

          <p className="text-base italic text-[#E8DFD8]">
            Poore task ko ek saath complete karne ki koshish karne ke bajaye,
            use chhote chhote parts mein divide karna shuru kiya. Ek part pe
            focus, use complete karo, fir agle pe jao.
          </p>
        </div>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Isse na sirf goal jaldi achieve hone laga, balki kaam ki efficiency
          bhi bani rahi. Stress bhi kam hua, aur progress bhi dikhne lagi. Ye
          simple si baat lagti hai, lekin jab aap bade task ke andar ho, tab ye
          realize karna hi sabse mushkil hota hai.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ENDING: JANUARY 2025
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          January 2025 mein maine poora SCM feature complete kar diya. Iss
          khushi mein Marvel Tech ke owner ne humein ek feature success party
          bhi di.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Ab sochiye — jis feature ke liye party mile, wo kitna critical hoga
          aur usme kitne rules involved honge. Lekin maine wo kar dikhaya. Aur
          abhi ke liye, journey aage badh rahi hai.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Kabhi kabhi sabse bada task hi sabse bada teacher ban jaata hai —
            bas use todna aana chahiye, ek baar mein poora nigalna nahi.
          </p>
        </div>
      </>
    ),
  },

  {
    id: 'b01',
    number: '03',
    date: 'APR 2025',
    readTime: '7 MIN READ',
    title: 'JAB LAGA MERA SAFAR YAHIN KHATAM HO RAHA HAI',
    subtitle:
      'March ki chhoti si optimization se April ke us feature tak, jise maine pehle "impossible" bol diya tha',
    tags: ['Web Scraping', 'Chrome Extension', 'Playwright', 'Career'],
    excerpt:
      'March mein maine socha bas code optimize karna hai. April aate aate pata chala ki kaam na ho toh naukri bhi nahi rehti. Aur usi mahine ek aisa feature aaya jise maine khud "ye nahi ho sakta" bol diya tha.',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          March 2025 shuru hua ek bilkul normal task se — apna purana code
          optimize karna. Lekin jab tak ye mahina khatam hua, mujhe pata bhi
          nahi chala ki ye do mahine — March aur uske baad wala April — mera
          nazariya hi badal denge. Kaam ke baare mein bhi, aur khud ke baare
          mein bhi.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          MARCH: OPTIMIZATION KA MAHINA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Is mahine mera kaam tha purane code ko behtar banana. Isi dauraan
          maine ek naya concept seekha — gzip compression. Simple bhasha mein
          samjhaun toh, jab server koi response bhejta hai, wo response
          size mein bada ho sakta hai. Gzip use karke us response ko compress
          kar dete hain, chhota bana dete hain, aur isse response client tak
          jaldi pahunchta hai. Matlab speed better, load kam.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Isके saath saath naye APIs bhi banaye aur existing wale ko optimize
          kiya. Pura March isi mein nikal gaya — theek-thaak, routine wala
          kaam.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          APRIL 2025: EK KADVA SACH
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          April aaya, aur usne mujhe corporate world ka ek aisa sach dikhaya
          jo college mein koi nahi sikhata — agar kaam hai, toh aap ho. Kaam
          nahi, toh aap bhi nahi.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          March mein kaam kam raha tha, aur jab kaam kam hota hai, sabse pehle
          asar logon par padta hai. Do employees ko company chhodni padi, sirf
          isliye kyunki us waqt unke paas karne ke liye kaam nahi tha.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Us waqt mujhe laga — shayad mera bhi Marvel Technologies ka safar
            yahin tak tha.
          </p>
        </div>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          PHIR AAYA EK NAYA CHALLENGE
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin tabhi ek naya feature aaya — "marketing" feature. Aur iske
          andar ek aisa kaam tha jo maine pehle kabhi nahi kiya tha: web
          scraping.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Naam sunke laga simple hoga — website se data nikalna hi toh hai.
          Lekin jab kaam shuru kiya, tab samajh aaya ki ye kitna mushkil kaam
          hai.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          DO HAFTE KI MEHNAT, AUR NAKAAMYABI
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Maine poore 2 hafte jaan laga di. Alag-alag tareeke try kiye, din
          raat ek kar diya. Lekin scraping kisi bhi tarah kaam nahi kar rahi
          thi.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Ek point aaya jab maine haar maan li. Apne project manager ko seedha
          keh diya — "ye scrape nahi ho sakti."
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          TURNING POINT: MANAGER KA IDEA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin mere manager ne haar nahi maani. Unhone mujhe motivate kiya,
          aur apna ek idea diya. Usi idea se maine dobara try kiya — aur is
          baar scraping complete ho gayi.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Maine ek Chrome extension banaya. Iska kaam tha website ki API ko
          bypass karke authentication token, UUID aur cookies collect karna.
          Fir wo saara scraped data database mein store kiya jaata tha.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ASLI MUSHKIL: SESSION ZINDA RAKHNA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Sabse bada challenge tha website ke session ko continuously zinda
          rakhna. Agar computer band ho jaaye, toh real-time mein data aana
          band ho jaata tha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Deliveroo jaise channel ke liye maine Playwright bhi use kiya. Iske
          saath-saath database design ko bhi behtar banana pada, kyunki purana
          design itna complex data handle karne ke liye ready nahi tha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Ek aur dikkat — scraped data real website ke data se match nahi ho
          raha tha. Isके liye bahut saari calculations karni padi, code
          baar-baar change karna pada.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-sm font-mono text-[#D4AF37] mb-2 uppercase tracking-widest">
            // LESSON LEARNED
          </p>

          <p className="text-base italic text-[#E8DFD8]">
            "Ye nahi ho sakta" kehne ke baad hi wo solution mila jo sabse
            zyada sikha gaya.
          </p>
        </div>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          AAJ
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Jo task kabhi mujhe khud impossible laga tha, wahi feature aaj
          production mein acche se chal raha hai.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Kabhi kabhi jis mahine mein sab kuch khatam hota lagta hai, wahi
            mahina asli kaam sikha jaata hai.
          </p>
        </div>
      </>
    ),
  },

  {
    id: 'b02',
    number: '02',
    date: 'DEC 2024',
    readTime: '4 MIN READ',
    title: 'OFFICE MEIN SIRF KAAM NAHI, THODI MASTI BHI ZAROORI HAI',
    subtitle:
      'Deadlines se team nahi banti — achhe log aur thodi fun bhi chahiye hoti hai',
    tags: ['Office Life', 'Team', 'Culture'],
    excerpt:
      'Sirf kaam, kaam, aur bas kaam — agar office mein sirf yehi chalta rahe, toh bahut jaldi bore ho jaoge. Ye baat mujhe apne office mein reh kar samajh aayi.',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Sirf kaam, kaam, aur bas kaam — agar office mein sirf yehi chalta
          rahe, toh bahut jaldi bore ho jaoge.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Ye baat mujhe apne office mein reh kar samajh aayi.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          OFFICE ENVIRONMENT ASLI PEHCHAN HOTA HAI
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Aapka office environment bahut kuch bata deta hai — aap kaise kaam
          karte ho, aapka behaviour kaisa hai, aap actually kaisa insaan ho.
          Isliye mujhe lagta hai, har office mein aisa environment hona
          chahiye jahan kaam ke saath thodi masti bhi ho.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Mere saath bhi kuch aisa hi raha. Achhe colleagues mile, achhe
          juniors mile — aur sach kahun toh, isi wajah se office jaana kabhi
          bojh nahi laga.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          DECEMBER 2024: JAB OFFICE NE MOVIE SPONSOR KI
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          December 2024 ki baat hai. Office ne poori team ke liye ek movie
          sponsor ki — "Pushpa 2". Ek normal kaam ke din ke beech achanak
          movie plan ho jaaye, sochiye kaisa lagega. Bohot maza aaya, bohot
          enjoy kiya us din.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Aur ye koi ek-off cheez nahi thi. Kabhi snacks party ho jaati, kabhi
          chai party.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Funny baat ye hai — main khud chai peeta hi nahi. Lekin fir bhi
            har chai break le leta tha. Haha.
          </p>
        </div>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Ye chhoti chhoti cheezein hi thi jo poore office ke maahaul ko halka
          rakhti thi. Kaam apni jagah tha, lekin ye break, ye masti, ye saath
          waala time — usi se din achha lagta tha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Bohot accha safar tha woh.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Kabhi kabhi sabse achhi memories deadlines ke beech nahi, un
            chhoti chai-breaks aur movie-outings mein hi ban jaati hain.
          </p>
        </div>
      </>
    ),
  },

  {
    id: 'b03',
    number: '01',
    date: 'SEP 2025',
    readTime: '9 MIN READ',
    title: 'PLAN FAIL HO GAYA… AUR SHAYAD ISI MEIN KUCH SEEKHNE KO THA',
    subtitle:
      'Ek risky decision, ek admission jo kabhi hua hi nahi, aur wo saara safar jo maine chupke se jiya',
    tags: ['Career', 'Freelancing', 'Risk', 'Gen AI'],
    excerpt:
      'Kabhi kabhi hum life ka plan itna perfectly banate hain ki lagta hai sab kuch exactly waisa hi hoga. Phir life bas ek chhota sa smile deti hai — "Achha? Dekhte hain."',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Kabhi kabhi hum life ka plan itna perfectly banate hain ki lagta hai
          sab kuch exactly waise hi hoga. Phir life bas ek chhota sa smile
          deti hai… aur bolti hai — "Achha? Dekhte hain."
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Main apne plans usually kisi ke saath share nahi karta. Mera maanna
          hai ki plan success ho ya fail, use shaanti se karna chahiye.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Success hua toh ek din sabko pata chal hi jaayega. Aur fail hua…
          toh kam se kam kisi ko batana nahi padega ki plan fail ho gaya.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Maine bhi ek aisa hi plan banaya tha.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          EK PLAN JO SYBSC SE START HUA THA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Jab main Nashik mein SYBSc Computer Science mein tha, tab se mere
          dimaag mein ek thought tha — mujhe Pune jaana chahiye.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Reason simple tha. Nashik ke comparison mein Pune mein tech
          opportunities zyada hain. Companies zyada hain, exposure zyada hai
          aur shayad growth bhi better ho.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Plan clear tha — Pune jaana hai, MCA karni hai aur tech field mein
          aur grow karna hai.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Bas ek problem thi — financial situation. Main lower-middle-class
          family se hoon, isliye us waqt MCA ke liye Pune jaana financially
          possible nahi tha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Toh plan wahi ruk gaya. Lekin completely khatam nahi hua.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          1.9 YEARS BAAD… PLAN DOBARA ZINDA HUA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lagbhag 1.9 years ka experience hone ke baad mujhe laga ki ab time
          aa gaya hai. Maine decide kiya ki main MCA ke liye Pune jaunga aur
          side-by-side job bhi karunga.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Decision easy nahi tha. April mein maine Marvel Technologies mein
          notice period serve karna start kiya aur 18 May mera last working
          day tha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Jab maine 18 May ko company chhodi, mere dimaag mein ek clear
          picture thi — June mein admission lunga, Pune jaunga, MCA + Job,
          growth. Simple. Perfect plan.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Bas… ek cheez nahi sochi thi. Plan ke beech mein life bhi hoti
            hai.
          </p>
        </div>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          AUR PHIR ADMISSION DELAY HO GAYA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          18 May ke baad jab main admission ke liye ready tha, tab pata chala
          ki admission process delay ho gaya hai.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          NEET-related issues ki wajah se situation uncertain thi, protests
          aur hunger strikes chal rahi thi aur admissions expected time par
          nahi ho rahe the.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Aur yahan se mera perfectly planned timeline hil gaya. June gaya.
          Phir July. Phir August…
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Aur mujhe samajh aane laga ki jo plan maine months pehle banaya
          tha, woh mere control mein tha hi nahi.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin ek cheez mere control mein thi — main khaali nahi baith
          sakta tha.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          KHAALI DIMAAG… WAHI PURANI BAAT
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Almost 2 years ke experience ne mujhe ek cheez sikha di thi —
          khaali dimaag sach mein shaitaan ka ghar hota hai.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Toh maine freelancing start kar di. Websites banayi, client ke
          saath interaction kiya, requirements samjhi, apne ideas present
          karne seekhe aur sabse important — client ko sirf code nahi,
          solution samjhana seekha.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Isi process mein maine Octopulse.co.uk, ek digital marketing
          startup ke liye website bhi banayi.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Coding ke bahar ki cheezein seekhne ko mili — client handling,
          communication, requirement gathering aur apne idea ko confidently
          present karna. Ye woh skills thi jo shayad kisi course mein
          directly nahi milti.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          PHIR EK MAHINA BLINKIT…
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Haan, developer hone ke baad maine lagbhag ek month Blinkit
          delivery boy ke roop mein bhi kaam kiya.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Company chhoti ya badi nahi hoti. Kaam chhota ya bada nahi hota.
            Har kaam apni jagah important hai.
          </p>
        </div>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Aap kis position par ho, usse zyada important ye hai ki aap apni
          situation mein kya seekh rahe ho aur kaise aage badh rahe ho.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          PHIR PURANI COMPANY SE EK CALL AAYA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Interesting part ye tha ki jis company ko maine May mein chhoda
          tha — Marvel Technologies — wahi company kuch time baad mujhe
          freelancer ke taur par wapas bula rahi thi.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Kuch tasks aur feature modules ke integration ke liye mujhe around
          15 days ke liye wapas company ke saath kaam karna pada. Aur mujhe
          previous salary ke according per-day payment mila.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Thoda funny laga. Jis company ko chhodte waqt laga tha ki ab next
          chapter start hoga, usi chapter ka ek small side-quest wapas wahi
          mil gaya.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin mujhe koi problem nahi thi. Kaam tha. Seekhne ko tha. Aur
          sabse important — main ruk nahi raha tha.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          JAB PLAN FAIL HUA, TAB LEARNING START HUI
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Is gap ke dauran maine sirf kaam hi nahi kiya. Maine Generative AI,
          Python, Flask, FastAPI, LLMs, RAG aur bahut si doosri technologies
          seekhna start ki.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Jo time originally MCA aur Pune ke liye tha, woh unexpectedly
          learning aur experimentation mein convert ho gaya.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-sm font-mono text-[#D4AF37] mb-2 uppercase tracking-widest">
            // LESSON LEARNED
          </p>

          <p className="text-base italic text-[#E8DFD8]">
            Kabhi kabhi delay ka matlab ye nahi hota ki aap galat direction
            mein ja rahe ho. Kabhi kabhi bas timing aapke favour mein nahi
            hoti.
          </p>
        </div>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          LEKIN HAAN… PLAN FAIL HO GAYA
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Agar honestly bolun toh mera pura plan fail ho gaya. Mujhe laga
          tha May mein job chhodunga, June mein admission hoga aur Pune
          chala jaunga.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin reality mein mera around 4 months ka gap ho gaya.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Kabhi kabhi tension bhi hoti thi. Mind mein ye question aata tha —
          "Itne gap ke baad koi mujhe job dega?" Ye thought naturally aata
          hai.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin phir ek aur thought aata hai — ab mere paas do options hain,
          tension lena ya try karna. Aur mere hisaab se second option hamesha
          better hai.
        </p>

        <h4
          className="text-2xl text-white mb-4 mt-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          AB AAGE KYA?
        </h4>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Honestly, mujhe nahi pata. Pune ka plan abhi bhi kya shape lega, ye
          bhi nahi pata. Next job kab milegi, kahan milegi, kis technology
          mein milegi — ye bhi nahi pata.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Lekin ek cheez pata hai — hope, hard work aur try karte rehna, abhi
          mere paas ye teen cheezein hain.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-[#E8DFD8]/90 font-light">
          Mera plan fail hua. Lekin shayad meri journey nahi. Ab dekhte
          hain… ye safar mujhe kahan le jaata hai.
        </p>

        <div className="my-8 p-6 bg-[#0E0C09] border-l-2 border-[#D4AF37] rounded-r-xl">
          <p className="text-base italic text-[#E8DFD8]">
            Kabhi kabhi hum destination ke liye itna plan karte hain ki raste
            mein milne wale experiences ko ignore kar dete hain. Mera Pune
            wala plan abhi tak successful nahi hua — lekin us plan ke fail
            hone ke chakkar mein maine jo kuch seekha, shayad wahi meri
            journey ka sabse valuable part ban gaya.
          </p>
        </div>
      </>
    ),
  },
];

// Sort newest first for the timeline
const sortedPosts = [...blogPosts].sort(
  (a, b) => Number(b.number) - Number(a.number)
);

const TimelineEntry: React.FC<{
  post: BlogPost;
  index: number;
  isLast: boolean;
  onSelect: (post: BlogPost) => void;
}> = ({ post, index, isLast, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-container-${post.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelect(post)}
      className="group relative pl-10 sm:pl-14 pb-16 cursor-pointer"
    >
      {/* Timeline rail */}
      {!isLast && (
        <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-0 w-px overflow-hidden">
          {/* Base static rail */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8C6D4F]/40 via-[#8C6D4F]/15 to-transparent" />

          {/* Traveling light pulse — this is the animation that was missing */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-24 rounded-full"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #D4AF37 45%, #F5D477 50%, #D4AF37 55%, transparent)',
              boxShadow: '0 0 10px 2px rgba(212,175,55,0.55)',
            }}
            initial={{ top: '-96px' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: 'linear',
              delay: index * 0.5,
            }}
          />
        </div>
      )}

      {/* Timeline node */}
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 sm:w-[22px] sm:h-[22px] rounded-full border border-[#D4AF37]/50 bg-[#090806] flex items-center justify-center transition-all duration-300 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_14px_rgba(212,175,55,0.4)]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F] transition-colors duration-300 group-hover:bg-[#D4AF37]" />
      </div>

      <div className="border-b border-[#8C6D4F]/15 pb-10 group-hover:border-[#D4AF37]/30 transition-colors duration-500">
        {/* Meta row */}
        <div className="flex items-center gap-4 mb-3 text-xs text-[#8C6D4F] font-mono tracking-wider">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {post.date}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {post.readTime}
          </span>

          <span className="text-[#8C6D4F]/60">
            //{post.number}
          </span>
        </div>

        {/* Title */}
        <motion.h3
          layoutId={`title-${post.id}`}
          className="text-white leading-[0.9] uppercase text-3xl sm:text-4xl md:text-5xl mb-3 transition-colors duration-300 group-hover:text-[#D4AF37]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {post.title}
        </motion.h3>

        <p
          className="text-sm sm:text-base text-[#C99E5D]/90 mb-4 font-light max-w-2xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {post.subtitle}
        </p>

        <p className="text-base text-[#bfb5a1]/80 leading-relaxed mb-6 font-light max-w-2xl line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[#120F0C] text-[#8C6D4F] border border-[#8C6D4F]/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors duration-300">
            Read entry

            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  /*
   * Lock the main website when the blog reader is open.
   *
   * Without this, the mouse wheel can continue scrolling
   * the page behind the fullscreen article.
   */
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activePost]);

  /*
   * Optional: allow ESC key to close the article.
   */
  useEffect(() => {
    if (!activePost) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActivePost(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activePost]);

  return (
    <section
      id="blog"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-4 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Dynamic Gold Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#D4AF37]/[0.035] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            05 / ARCHIVE &amp; JOURNAL
          </span>

          <div className="w-20 h-px bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              LEARNING &amp;
            </span>

            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#bfb5a1] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              BATTLE SCARS.
            </span>
          </h2>
        </motion.div>

        {/* Vertical Journal Timeline */}
        <div className="relative">
          {sortedPosts.map((post, idx) => (
            <TimelineEntry
              key={post.id}
              post={post}
              index={idx}
              isLast={idx === sortedPosts.length - 1}
              onSelect={setActivePost}
            />
          ))}
        </div>
      </div>

      {/* =========================================================
          FULLSCREEN BLOG READER
          ========================================================= */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              fixed
              inset-0
              z-[100]
              bg-black/95
              backdrop-blur-xl
              flex
              justify-center
              items-start
              overflow-y-auto
              overscroll-contain
              p-4
              sm:p-10
              md:p-16
            "
            onClick={() => setActivePost(null)}
            /*
             * This is important for mouse-wheel behavior.
             * It prevents scroll from propagating to the page behind.
             */
            onWheel={(event) => {
              event.stopPropagation();
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePost(null)}
              className="
                fixed
                top-6
                right-6
                sm:top-10
                sm:right-10
                w-12
                h-12
                rounded-full
                border
                border-[#D4AF37]/40
                bg-black/80
                flex
                items-center
                justify-center
                text-[#E8DFD8]
                hover:text-[#D4AF37]
                hover:border-[#D4AF37]
                transition-all
                z-[110]
              "
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${activePost.id}`}
              className="
                max-w-3xl
                w-full
                bg-[#0B0907]
                border
                border-[#D4AF37]/40
                rounded-3xl
                p-8
                sm:p-14
                my-8
                relative
                shadow-[0_20px_80px_rgba(212,175,55,0.15)]
              "
              onClick={(event) => event.stopPropagation()}
            >
              {/* Article Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#8C6D4F]/20">
                <span className="text-xs text-[#8C6D4F] font-mono">
                  // ENTRY {activePost.number}
                </span>

                <span className="text-xs text-[#8C6D4F] flex items-center gap-1">
                  <Clock size={12} />
                  {activePost.readTime}
                </span>
              </div>

              {/* Article Title */}
              <motion.h2
                layoutId={`title-${activePost.id}`}
                className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[0.9]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {activePost.title}
              </motion.h2>

              {/* Article Subtitle */}
              <p
                className="text-sm sm:text-base text-[#C99E5D] mb-8 font-light"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {activePost.subtitle}
              </p>

              {/* =====================================================
                  ARTICLE CONTENT
                  ===================================================== */}
              <div className="text-left font-sans">
                {activePost.content}
              </div>

              {/* Modal Footer */}
              <div className="mt-12 pt-8 border-t border-[#8C6D4F]/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-[#8C6D4F]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="text-xs uppercase tracking-widest text-[#D4AF37] hover:underline"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Close Article ←
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;