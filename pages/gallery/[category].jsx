import Gallery from '../../components/Gallery'
import WithHeader from '../../components/WithHeader'
import CATEGORIES from '../../constants/Categories'
import axios from 'axios'

const CATEGORY_PICTURE_MAP = {
  Acryl: [
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly 50x40 acrylic, baumvolle..jpeg',
      width: 40,
      height: 50,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly. 50x50. Утренний Амлет. acrylic, baumvolle..jpeg',
      width: 50,
      height: 50,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly 50 х 40.acrylic, baumvolle . Недопонимание..jpeg',
      width: 50,
      height: 40,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly. 50х80. acrylic, baumvolle. Одуванчики..jpeg',
      width: 1200,
      height: 518,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly. 70x200. Strikayel. acrylic, baumvolle.jpeg',
      width: 200,
      height: 70,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly 70x50 acrylic, baumvolle.-Schvelbe.jpeg',
      width: 50,
      height: 70,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikov Anatoly. Завтрок на обочине. 47 x 83cm. acrylic, baumvolle..jpeg',
      width: 83,
      height: 47,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikow Anatoly. 50x50. Вьезд в Иерусалим с восточных варот. acrylic, baumvolle..jpeg',
      width: 50,
      height: 50,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikow Anatoly 70x50 acrylic, baumvolle Гранатовый Рассвет.jpeg',
      width: 1280,
      height: 885,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikow Anatoly 70x50 acrylic, baumvolle из цыкла Друзья Человека 1.jpeg',
      width: 50,
      height: 70,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikow Anatoly 70x50 acrylic, baumvolle из цыкла Друзья Человека 4..jpeg',
      width: 50,
      height: 70,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tchernikow Anatoly 70x50 acrylic, baumvolle из цыкла Друзья Человека 5.jpeg',
      width: 50,
      height: 70,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly. 50 x 70 cm. acrul, baumwolle. Царант стабильности..jpeg',
      width: 70,
      height: 50,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly. baumwolle.acryl. 65x47cm..jpeg',
      width: 47,
      height: 65,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly. Бальшой Фиш. parzelan.acryl..jpeg',
      width: 1280,
      height: 1255,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly.  Ключ верности. argalit. acryl. 50 x 70cm..jpeg',
      width: 70,
      height: 50,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly. Лето Юнности. baumwolle.acryl. 40 x 50..jpeg',
      width: 50,
      height: 40,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly. .Ожидание прихода Месяца. baumwolle.acryl. 50 х 80cm.jpeg',
      width: 80,
      height: 50,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikov Anatoly. Рекламный щит ф.ALG. 95х49 акрил, арголит.jpeg',
      width: 40,
      height: 95,
    },
    {
      src:
        'http://185.255.134.65:8000/Acryl/Tschernikow Anatoly.Весна пришла. Дратути. .50x40akri.jpg',
      width: 40,
      height: 50,
    },
  ],
  Oil: [
    {
      src:
        'http://185.255.134.65:8000/Oil/Tschernikov Anatoly 25 x 30 Öl, baumvolle. Утренняя россыпь.jpeg',
      width: 30,
      height: 25,
    },
    {
      src:
        'http://185.255.134.65:8000/Oil/Tschernikov Anatoly . «Белянки»-III.30х25.бязь,масло. 25 x 30 Öl, baumvolle..jpeg',
      width: 30,
      height: 25,
    },
    {
      src: 'http://185.255.134.65:8000/Oil/В горах. 60 х 80. холст,масло.jpeg',
      width: 80,
      height: 60,
    },
    {
      src:
        'http://185.255.134.65:8000/Oil/Черников Анатолий Николаевич.«Яблоки на Aarstrasse.26,7x35.масло,аргалит.jpeg',
      width: 35,
      height: 27,
    },
  ],
}

export const GalleryPage = ({ photos }) => (
  <div className="container">
    <Gallery photos={photos} />
  </div>
)

export function getAllPicturesForCategory(category) {
  return
  // return axios.get(
  //   `${process.env.SERVER_URL}/picturelist/?category=${category}`
  // )
}

export async function getStaticPaths() {
  return {
    paths: CATEGORIES.map((category) => ({ params: { category } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // const picturesForCategory = await getAllPicturesForCategory(params.category)
  return {
    props: {
      photos: CATEGORY_PICTURE_MAP[params.category],
    },
  }
}

export default WithHeader(GalleryPage)
