import { useTranslation } from 'react-i18next';
import {
  ButtonParticipate,
  ButtonMore,
  ButtonGalery,
} from '../components/ui/Buttons.jsx';
import {
  Card,
  CardMovie,
  CardFestival,
  CardSelection,
  CardCalender,
  CardPlace,
  CardPartner,
} from '../components/ui/Cards.jsx';
import {
  cardsData,
  cardsFestivalData,
  cardsSelectionData,
  cardsInfos,
  cardsPlaces,
  cardsNumber,
  cardsPartner,
} from '../components/ui/CardsData.jsx';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import hero from '../assets/ville.webp';
import heroFallBack from '../assets/ville-fallback.jpg';
import bgCalender from '../assets/marsai-night.webp';
import bgCalenderFallBack from '../assets/marsai-night-fallback.jpg';

function Home() {
  const { t } = useTranslation();
  window.scrollTo(0, 0);

  return (
    <>
      <section className="relative overflow-hidden text-center p-10 pt-30 pb-30 md:px-35 bg-gray-500">
        <picture>
          <source srcSet={hero} type="image/webp" />
          <img
            src={heroFallBack}
            alt="Image de Marseille avec une église, un arbre et l'eau."
            fetchPriority="high"
            width="1920"
            height="1080"
            className="absolute inset-0 object-cover mix-blend-multiply w-full h-full"
          />
        </picture>
        <h1 className="relative z-10 text-white font-bold text-5xl text-shadow-lg/70 uppercase md:w-full">
          {t('home.title_part1')}
          <span className="text-[#ff5845]"> {t('home.title_part2')}</span>{' '}
          {t('home.title_part3')}
        </h1>

        <p className="relative z-10 text-white text-xl font-semibold text-shadow-lg/90 mt-8 mb-15 md:mb-6 md:text-2xl">
          {t('home.subtitle')}
        </p>
        <ButtonParticipate className="relative z-10" />
        <ButtonMore className="relative z-10" />
      </section>

      <section className="p-15 bg-[#EFEFEF]">
        <h2 className="font-bold text-4xl w-50 mb-5 text-[#282828] md:text-5xl md:w-max uppercase">
          {t('home.projectTitle')}
        </h2>
        <p className="w-80 md:w-200">
          {t('home.projectText')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          {cardsData.map(card => (
            <Card
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
              className="bg-white text-[#64748B]"
            />
          ))}
        </div>
      </section>

      <section className="p-15">
        <h2 className="font-bold text-4xl w-50 mb-5 text-[#282828] md:text-5xl md:w-70 uppercase">
          {t('home.competitionTitle_part1')}
          <span className="text-[#2b71b1]"> {t('home.competitionTitle_part2')}</span>
        </h2>
        <p className="md:text-xl md:w-200">
          {t('home.competitionText')}
        </p>
        <div className="grid grid-cols-1 md:flex justify-between gap-10 mb-10 mt-10">
          <CardMovie />
          <CardMovie />
          <CardMovie />
        </div>
        <ButtonGalery />
      </section>

      <section className="p-15 bg-[#282828]">
        <h2 className="font-bold text-4xl w-70 mb-5 text-white uppercase md:text-5xl md:w-90">
          {t('home.festivalGoalsTitle_part1')}
          <span className="text-[#FF5845]"> {t('home.festivalGoalsTitle_part2')}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 mt-10">
          {cardsFestivalData.map(card => (
            <CardFestival
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </section>

      <section className="p-15 bg-[#EFEFEF]">
        <h2 className="font-bold text-4xl mb-5 text-center text-[#282828] md:text-5xl uppercase">
          {t('home.selectionFormatTitle')}
        </h2>
        <p className="text-center uppercase text-[#6B6B6B]">
          {t('home.selectionFormatText')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          {cardsSelectionData.map(card => (
            <CardSelection
              key={card.id}
              title={card.title}
              text={card.text}
              description={card.description}
            />
          ))}
        </div>
        <ButtonParticipate className="md:block w-fit mx-auto" />
      </section>

      <section id="buttonMore" className="p-15 bg-[#282828]">
        <h2 className="font-bold text-4xl text-white md:text-5xl uppercase w-77 md:w-150">
          {t('home.conferences_part1')}
          <span className="text-[#FF5845]"> {t('home.conferences_part2')}</span>{' '}
          {t('home.conferences_part3')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 mt-10">
          {cardsInfos.map(card => (
            <CardFestival
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </section>

      <section className="relative rounded-4xl bg-gray-500 m-15 mt-15 p-10 pt-20 pb-20 flex flex-col md:flex-row md:items-center md:justify-around md:p-15">
        <picture>
          <source srcSet={bgCalender} type="image/webp" />
          <img
            src={bgCalenderFallBack}
            alt="Image d'une soirée"
            loading="lazy"
            className="absolute inset-0 object-cover mix-blend-multiply w-full h-full rounded-4xl"
          />
        </picture>
        <div>
          <h2 className="relative z-10 text-white font-bold text-4xl text-shadow-lg/70 uppercase w-70 md:text-7xl">
            {t('home.night_title')}
          </h2>
          <p className="relative z-10 text-white text-xl text-shadow-lg/70 mt-5 mb-15 md:w-100 md:mb-6">
            {t('home.night_desc')}
          </p>
        </div>
        <CardCalender className="relative z-10" />
      </section>

      <section className="p-15 bg-[#EFEFEF]">
        <p className="flex items-center font-semibold text-[#195d9c] text-xl uppercase gap-3">
          <FaMapMarkerAlt />
          {t('home.place_label')}
        </p>
        <h2 className="font-bold text-4xl mb-3 mt-5 text-[#282828] w-70 md:text-5xl md:w-full uppercase">
          {t('home.place_name_part1')}
          <span className="text-[#2b71b1]"> {t('home.place_name_part2')}</span>
        </h2>
        <h3 className="font-bold text-2xl uppercase text-[#6B6B6B] md:text-xl">
          {t('home.place_ex')}
        </h3>
        <p className="text-[#6B6B6B] font-semibold text-xl mt-2">
          {t('home.place_desc')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 mt-10 md:mb-5">
          {cardsPlaces.map(card => (
            <CardSelection
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <CardPlace />
      </section>

      <section className="bg-white p-15 flex flex-col md:flex-row md:items-center md:justify-around">
        <div>
          <h2 className="font-bold text-4xl uppercase w-70">
            {t('home.stats_title_part1')} <span className="text-[#2b71b1]">{t('home.stats_title_part2')}</span>
          </h2>
          <p className="text-xl text-[#6B6B6B] font-semibold mt-5 mb-15 md:w-90 md:mb-6">
            {t('home.stats_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {cardsNumber.map(card => (
            <Card
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
              className="bg-[#EFEFEF] md:p-10"
            />
          ))}
        </div>
      </section>

      <section className="p-15 bg-[#EFEFEF]">
        <p className="flex items-center font-semibold text-[#195d9c] text-xl uppercase gap-3">
          <FaHandshakeSimple /> {t('home.partners_label')}
        </p>
        <h2 className="font-bold text-4xl mb-3 mt-5 text-[#282828] w-80 md:text-5xl md:w-full uppercase">
          {t('home.partners_title_part1')}
          <span className="text-[#2b71b1]"> {t('home.partners_title_part2')}</span>
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10 mt-15">
          {cardsPartner.map(card => (
            <CardPartner
              key={card.id}
              src={card.src}
              srcFallBack={card.srcFallBack}
              alt={card.alt}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;