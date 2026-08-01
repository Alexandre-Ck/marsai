import { MdLocalMovies } from 'react-icons/md';
import { BsPersonArmsUp } from 'react-icons/bs';
import { GrUserExpert } from 'react-icons/gr';
import { IoBook } from 'react-icons/io5';
import { TbTargetArrow } from 'react-icons/tb';
import { IoFlashSharp } from 'react-icons/io5';
import { IoRocketSharp } from 'react-icons/io5';
import { FaAward, FaHandHoldingHeart } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { GiFilmSpool } from 'react-icons/gi';
import { FaGlobe } from 'react-icons/fa';

const images = import.meta.glob('../../assets/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
});

export const cardsData = [
  {
    id: 1,
    icon: MdLocalMovies,
    title: 'cards_data.one_minute_title',
    text: 'cards_data.one_minute_text',
  },
  {
    id: 2,
    icon: IoBook,
    title: 'cards_data.free_title',
    text: 'cards_data.free_text',
  },
  {
    id: 4,
    icon: BsPersonArmsUp,
    title: 'cards_data.for_all_title',
    text: 'cards_data.for_all_text',
  },
  {
    id: 5,
    icon: GrUserExpert,
    title: 'cards_data.expertise_title',
    text: 'cards_data.expertise_text',
  },
];

export const cardsFestivalData = [
  {
    id: 1,
    icon: TbTargetArrow,
    title: 'cards_festival.human_title',
    text: 'cards_festival.human_text',
  },
  {
    id: 2,
    icon: IoFlashSharp,
    title: 'cards_festival.challenge_title',
    text: 'cards_festival.challenge_text',
  },
  {
    id: 3,
    icon: IoRocketSharp,
    title: 'cards_festival.future_title',
    text: 'cards_festival.future_text',
  },
];

export const cardsSelectionData = [
  {
    id: 1,
    title: 'cards_selection.months_title',
    text: 'cards_selection.months_text',
    description: 'cards_selection.months_desc',
  },
  {
    id: 2,
    title: 'cards_selection.movies_title',
    text: 'cards_selection.movies_text',
    description: 'cards_selection.movies_desc',
  },
  {
    id: 3,
    title: 'cards_selection.web_title',
    text: 'cards_selection.web_text',
    description: 'cards_selection.web_desc',
  },
  {
    id: 4,
    title: 'cards_selection.festival_title',
    text: 'cards_selection.festival_text',
    description: 'cards_selection.festival_desc',
  },
];

export const cardsInfos = [
  {
    id: 1,
    icon: FaHandHoldingHeart,
    title: 'cards_infos.heart_title',
    text: 'cards_infos.heart_text',
  },
  {
    id: 2,
    icon: MdLocalMovies,
    title: 'cards_infos.projections_title',
    text: 'cards_infos.projections_text',
  },
  {
    id: 3,
    icon: MdEventAvailable,
    title: 'cards_infos.workshops_title',
    text: 'cards_infos.workshops_text',
  },
  {
    id: 4,
    icon: FaAward,
    title: 'cards_infos.awards_title',
    text: 'cards_infos.awards_text',
  },
];

export const cardsPlaces = [
  {
    id: 1,
    title: 'cards_places.sucres_title',
    description: 'cards_places.sucres_desc',
  },
  {
    id: 2,
    title: 'cards_places.plaza_title',
    description: 'cards_places.plaza_desc',
  },
];

export const cardsNumber = [
  {
    id: 1,
    icon: FaGlobe,
    title: '+120',
    text: 'cards_number.countries',
  },
  {
    id: 2,
    icon: GiFilmSpool,
    title: '+600',
    text: 'cards_number.submitted_films',
  },
];

export const cardsPartner = [
  {
    id: 1,
    src: images['../../assets/plateforme.webp'].default,
    srcFallBack: images['../../assets/plateforme-fallback.png'].default,
    alt: 'Logo la plateforme',
  },
  {
    id: 2,
    src: images['../../assets/mobile.webp'].default,
    srcFallBack: images['../../assets/mobile-fallback.png'].default,
    alt: 'Logo mobile festival',
  },
  {
    id: 3,
    src: images['../../assets/undp.webp'].default,
    srcFallBack: images['../../assets/undp-fallback.png'].default,
    alt: 'Logo undp',
  },
  {
    id: 4,
    src: images['../../assets/psl.webp'].default,
    srcFallBack: images['../../assets/psl-fallback.png'].default,
    alt: 'Logo psl',
  },
  {
    id: 5,
    src: images['../../assets/cnc.webp'].default,
    srcFallBack: images['../../assets/cnc-fallback.png'].default,
    alt: 'Logo cnc',
  },
  {
    id: 6,
    src: images['../../assets/action.webp'].default,
    srcFallBack: images['../../assets/action-fallback.png'].default,
    alt: 'Logo action campaign',
  },
  {
    id: 7,
    src: images['../../assets/unric.webp'].default,
    srcFallBack: images['../../assets/unric-fallback.png'].default,
    alt: 'Logo unric',
  },
  {
    id: 8,
    src: images['../../assets/sacd.webp'].default,
    srcFallBack: images['../../assets/sacd-fallback.png'].default,
    alt: 'Logo sacd',
  },
  {
    id: 9,
    src: images['../../assets/agence.webp'].default,
    srcFallBack: images['../../assets/agence-fallback.png'].default,
    alt: "Logo l'agence cu court métrage",
  },
  {
    id: 10,
    src: images['../../assets/extra.webp'].default,
    srcFallBack: images['../../assets/extra-fallback.png'].default,
    alt: 'Logo extra court',
  },
  {
    id: 11,
    src: images['../../assets/unesco.webp'].default,
    srcFallBack: images['../../assets/unesco-fallback.jpg'].default,
    alt: 'Logo unesco',
  },
  {
    id: 12,
    src: images['../../assets/global.webp'].default,
    srcFallBack: images['../../assets/global-fallback.png'].default,
    alt: 'Logo global youth biodiversity network',
  },
];