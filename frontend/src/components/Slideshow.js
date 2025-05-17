import React, { useState, useEffect } from 'react';
import './Slideshow.css';


// hardcoded image data for slideshow
const images = [
  {
    src: '/images/GYBE.jpg',
    artist: 'Godspeed! You Black Emperor',
    date: '2018-04-21',
    location: 'Tilburg, NL',
    attribution: 'Photo by [Rene Passet](https://commons.wikimedia.org/wiki/File:Godspeed_You!_Black_Emperor_@_Roadburn_Festival_2018-04-21_003.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
  },
  {
    src: '/images/WuTang.jpg',
    artist: 'Wu-Tang Clan',
    date: '2019-06-29',
    location: 'Glastonbury Festival',
    attribution: 'Photo by [Simoncromptonreid](https://commons.wikimedia.org/wiki/File:Wu-Tang_Clan_-_Glastonbury_2019.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
  },
  {
    src: '/images/Fugazi.jpg',
    artist: 'Fugazi',
    date: '1996-03-29',
    location: 'Atlanta, GA',
    attribution: 'Photo by [M S](https://commons.wikimedia.org/wiki/File:FUGAZI_1_(19549805629).jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
  },
  {
    src: '/images/Swans.jpg',
    artist: 'Swans',
    date: '2010-12-10',
    location: 'Warsaw, PL',
    attribution: 'Photo by [Marcin Kutera](https://commons.wikimedia.org/wiki/File:Swans_warsaw_10_12_2010_poland_m_kutera.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
  },
  {
    src: '/images/RTJ.jpg',
    artist: 'Run the Jewels with Zack De La Rocha',
    date: '2015-04-11',
    location: null,
    attribution: 'Photo by [Fred von Lohmann](https://commons.wikimedia.org/wiki/File:Run_the_Jewels.jpg) / [CC BY-SA 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.en)'
  },
  {
    src: '/images/Beatles.jpg',
    artist: 'The Beatles',
    date: '1964-02',
    location: 'The Ed Sullivan Show',
    attribution: 'Photo by [Bernard Gotfryd](https://commons.wikimedia.org/wiki/File:The_Beatles_performing_at_The_Ed_Sullivan_Show.jpg) / [Library of Congress]'
  },
  {
    src: '/images/NIN.jpg',
    artist: 'Nine Inch Nails',
    date: '2006-02-12',
    location: 'Moline, IL',
    attribution: 'Photo by [Brandon Dusseau](https://commons.wikimedia.org/wiki/File:Nine_Inch_Nails_Moline_10.jpg) / [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/)'
  },
  {
    src: '/images/Nirvana.jpg',
    artist: 'Nirvana',
    date: '1994-11-01',
    location: 'Unplugged',
    attribution: 'Photo by [julio zeppelin](https://www.flickr.com/photos/83706716@N02/7679510730) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
  },
  {
    src: '/images/Shellac.jpg',
    artist: 'Shellac',
    date: '2008-01-04',
    location: 'Sao Paolo, BR',
    attribution: 'Photo by [cássio abreu](https://www.flickr.com/photos/psicodrops/2381545747/) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
  },
  {
    src: '/images/QOTSA.jpg',
    artist: 'Queens of the Stone Age',
    date: '2017-11-17',
    location: 'Wembley Stadium',
    attribution: 'Photo by [Raph_PH](https://www.flickr.com/photos/raph_ph/38546172716/) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
  },
  {
      src: '/images/Bowie1.jpg',
      artist: 'David Bowie',
      date:null,
      location: null,
      attribution: 'Photo by [Vértes György](https://commons.wikimedia.org/wiki/File:David_Bowie_RGB_13X18.jpg#/media/File:David_Bowie_RGB_13X18.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
  },
  {
      src: '/images/Bowie2.jpeg',
      artist: 'David Bowie',
      date: '2003-11-23',
      location: null,
      attribution: 'Photo by [Roger Woolman](https://commons.wikimedia.org/wiki/File:David_Bowie_(135687113).jpeg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
  },
  {
        src: '/images/JesusLizard.jpg',
        artist: 'The Jesus Lizard',
        date: '2009-09-14',
        location: 'Paradiso, Amsterdam',
        attribution: 'Photo by [Nick Helderman](https://www.flickr.com/photos/nickhelderman/3934176174/) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
    },
  {
    src: '/images/TalkingHeads.jpg',
    artist: 'Talking Heads',
    date: '1982',
    location: null,
    attribution: 'Photo by [Craig Howell](https://www.flickr.com/photos/seat850/3451464308) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
  },
{
  src: '/images/Godflesh.jpg',
  artist: 'Godflesh',
  date: '2018-04-20',
  location: 'Roadburn Festival',
  attribution: 'Photo by [Grywnn](https://commons.wikimedia.org/wiki/File:Godflesh_@_Roadburn_Festival_2018-04-20_004.jpg#/media/File:Godflesh_@_Roadburn_Festival_2018-04-20_004.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
},
{
  src: '/images/TheClash.jpg',
  artist: 'The Clash',
  date: '1980-05-21',
  location: 'Chateau Neuf, Oslo',
  attribution: 'Photo by [Helge Øverås](https://commons.wikimedia.org/wiki/File:Clash_21051980_12_800.jpg#/media/File:Clash_21051980_12_800.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
},
{
  src: '/images/Ween.jpg',
  artist: 'Ween',
  date: '2009-08-30',
  location: 'Outside Lands Festival',
  attribution: 'Photo by [David Oliver](https://commons.wikimedia.org/wiki/File:Dean_Ween_Outside_Lands.jpg#/media/File:Dean_Ween_Outside_Lands.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/Swans1.jpg',
  artist: 'Swans',
  date: '2012-08-06',
  location: 'OFF Festival',
  attribution: 'Photo by [Nick Helderman](https://commons.wikimedia.org/wiki/File:OFF_Festival_2012_Swans.jpg#/media/File:OFF_Festival_2012_Swans.jpg) / [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/)'
},
{
  src: '/images/Fugazi6.jpg',
  artist: 'Fugazi',
  date: '1996-03-29',
  location: 'Masquerade, ATL',
  attribution: 'Photo by [M S](https://commons.wikimedia.org/wiki/File:FUGAZI_6_(19113931364).jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/Fugazi2.jpg',
  artist: 'Fugazi',
  date: '1996-03-29',
  location: 'Masquerade, ATL',
  attribution: 'Photo by [M S](https://commons.wikimedia.org/wiki/File:FUGAZI_2_(19710223266).jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/Radiohead1.jpg',
  artist: 'Radiohead',
  date: '2017-04-18',
  location: 'Greek Theater',
  attribution: 'Photo by [Jeff Marquis](https://commons.wikimedia.org/wiki/File:Radiohead_18-Apr-2017_14.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Radiohead2.jpg',
  artist: 'Radiohead',
  date: '2008-06-12',
  location: 'Daydream Festival, Barcelona',
  attribution: 'Photo by [Alterna2](https://commons.wikimedia.org/wiki/File:Radiohead_2008_Barcelona,_Catalonia_Daydream_Festival_06.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Radiohead3.jpg',
  artist: 'Radiohead',
  date: '2017-04-01',
  location: 'Philips Arena, Atlanta, GA',
  attribution: 'Photo by [ameeps](https://www.flickr.com/photos/32526647@N00/34162561646) / [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)'
},
{
  src: '/images/Swans3.jpg',
  artist: 'Swans',
  date: '2017-10-02',
  location: 'Yota Space, Moscow',
  attribution: 'Photo by [Dmitry Rozhkov](https://commons.wikimedia.org/wiki/File:Swans_2017_-_04.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
},
{
  src: '/images/RTJ2.jpg',
  artist: 'Run the Jewels',
  date: '2014-03-21',
  location: 'Treefort Music Festival',
  attribution: 'Photo by [Tyler Garcia](https://commons.wikimedia.org/wiki/File:Run_The_Jewels_at_Treefort_Music_Festival.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/FreddieGibbs.jpg',
  artist: 'Freddie Gibbs and Madlib',
  date: '2014-03-28',
  location: 'The Echoplex, Echo Park, CA',
  attribution: 'Photo by [Carl Pocket](https://www.flickr.com/photos/pocketphotography/13495380574) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/DenzelCurry.jpg',
  artist: 'Denzel Curry',
  date: '2017-03-15',
  location: 'SXSW, Austin, TX',
  attribution: 'Photo by [friedoxygen](https://commons.wikimedia.org/wiki/File:Denzel_Curry_(33452921451).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/NIN.jpg',
  artist: 'Nine Inch Nails',
  date: '2022-06-20',
  location: 'O2 Apollo Manchester',
  attribution: 'Photo by [aliina s.](https://commons.wikimedia.org/wiki/File:Nine_Inch_Nails_-_20.06.2022_-_O2_Apollo_Manchester.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/NIN2.jpg',
  artist: 'Nine Inch Nails',
  date: '1994',
  location: 'Self-Destruct Tour',
  attribution: 'Photo by [Mark Benney](https://commons.wikimedia.org/wiki/File:Trent_Reznor_Self-Destruct.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/MilesDavis.jpg',
  artist: 'Miles Davis',
  date: '1984-07-15',
  location: 'North Sea Jazz Festival, The Hague',
  attribution: 'Photo by [Rob Bogaerts / Anefo](https://commons.wikimedia.org/wiki/File:MilesDavisNorthSeaJazz1984.jpg) / [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)'
},
{
  src: '/images/JohnColtrane.jpg',
  artist: 'John Coltrane',
  date: '1961-11-20',
  location: 'Concertgebouw, Amsterdam',
  attribution: 'Photo by [Dave Brinkman / Anefo](https://commons.wikimedia.org/wiki/File:Uitreiking_Edison_aan_John_Coltrane_in_Concertgebouw,_Bestanddeelnr_913-2046.jpg) / [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)'
},
{
  src: '/images/HerbieHancock.jpg',
  artist: 'Herbie Hancock',
  date: '2023-07-28',
  location: 'Barbican Centre',
  attribution: 'Photo by [Raph_PH](https://commons.wikimedia.org/wiki/File:HerbieHancockBarbican280723_(45_of_54)_(53079294413).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/PJHarvey.jpg',
  artist: 'PJ Harvey',
  date: '2011-09-08',
  location: 'O2 Apollo, Manchester',
  attribution: 'Photo by [Man Alive!](https://commons.wikimedia.org/wiki/File:PJ_Harvey_at_the_O2_Apollo.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/JesusLizard2.jpg',
  artist: 'The Jesus Lizard',
  date: '1990-12-12',
  location: 'The Upstage, Pittsburgh',
  attribution: 'Photo by [Public Collectors](https://www.flickr.com/photos/27193825@N00/5682526870/) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/Shellac2.jpg',
  artist: 'Shellac',
  date: '2014-11-01',
  location: 'Kampnagel, Hamburg',
  attribution: 'Photo by [Party diktator](https://commons.wikimedia.org/wiki/File:Shellac-Band_Live-Hamburg-2014.jpg) / [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)'
},
{
  src: '/images/Shellac3.jpg',
  artist: 'Shellac',
  date: '2008-03-26',
  location: 'Niceto Club, Buenos Aires',
  attribution: 'Photo by [Sebastián Jarpa](https://www.flickr.com/photos/checkout-time/2365256991/) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/Molina.jpg',
  artist: 'Jason Molina w/ Magnolia Electric Co.',
  date: '2009-09-15',
  location: 'Ancienne Belgique, Brussels',
  attribution: 'Photo by [Kmeron](https://www.flickr.com/photos/frf_kmeron/3931133189) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/Molina2.jpg',
  artist: 'Jason Molina w/Magnolia Electric Co.',
  date: '2009-09-15',
  location: 'Ancienne Belgique, Brussels',
  attribution: 'Photo by [Kmeron](https://www.flickr.com/photos/frf_kmeron/3931941686) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/TheCure.jpg',
  artist: 'The Cure',
  date: '2019-06-22',
  location: 'Southside Festival, Germany',
  attribution: 'Photo by [Mr. Rossi](https://commons.wikimedia.org/wiki/File:The_Cure_4946_-_1.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
},
{
  src: '/images/DeathGrips2.jpg',
  artist: 'Death Grips',
  date: '2012-11-30',
  location: null,
  attribution: 'Photo by [Erin Altomare](https://commons.wikimedia.org/wiki/File:November_30_2012_Death_Grips_(8235929013).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/SonicYouth.jpg',
  artist: 'Sonic Youth',
  date: '2005-07-07',
  location: 'Accelerator Festival, Stockholm',
  attribution: 'Photo by [Anders Jensen-Urstad](https://commons.wikimedia.org/wiki/File:SonicYouth.JPG) / [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/)'
},
{
  src: '/images/SonicYouth2.jpg',
  artist: 'Sonic Youth',
  date: '2009-07-10',
  location: 'The Bijou Theatre, Knoxville, TN',
  attribution: 'Photo by [kcarpenter_](https://commons.wikimedia.org/wiki/File:Sonic_Youth_2009_(3709222026).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/KimDeal.jpg',
  artist: 'Kim Deal',
  date: '1995',
  location: 'Dayton, OH',
  attribution: 'Photo by [Chrisglass](https://commons.wikimedia.org/wiki/File:Kim_Deal_playing_guitar_with_The_Amps.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/Pixies.jpg',
  artist: 'Pixies',
  date: '2010-10-13',
  location: 'Teatro La Cúpula, Santiago',
  attribution: 'Photo by [Alejandro Jofré](https://commons.wikimedia.org/wiki/File:PixiesChile.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Unwound.jpg',
  artist: 'Unwound',
  date: '2023-02-18',
  location: 'Numero Twenty Festival, Los Angeles',
  attribution: 'Photo by [Residency12](https://commons.wikimedia.org/wiki/File:Unwound_Live_2023.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
},
{
  src: '/images/BoardsOfCanada.jpg',
  artist: 'Boards of Canada',
  date: '1999-10-14',
  location: 'Warp Lighthouse Party',
  attribution: 'Photo by [pudstah](https://commons.wikimedia.org/wiki/File:Boards_of_Canada_Warp_Lighthouse_Party_1999.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/JPEGMAFIA.jpg',
  artist: 'JPEGMAFIA',
  date: '2019-08-15',
  location: 'Sled Island Festival, Calgary',
  attribution: 'Photo by [Levi Manchak](https://commons.wikimedia.org/wiki/File:JPEGMAFIA_(48548470972).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Turnstile.jpg',
  artist: 'Turnstile',
  date: '2012-05-13',
  location: null,
  attribution: 'Photo by [Nathan Congleton](https://www.flickr.com/photos/nathancongleton/7206420548/) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/Neurosis.jpg',
  artist: 'Neurosis',
  date: '2018-06-20',
  location: 'Copenhell Festival, Holmen, Denmark',
  attribution: 'Photo by [Al Case](https://www.flickr.com/photos/al_case/48997704708) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/SoulGlo.jpg',
  artist: 'Soul Glo',
  date: '2019-09-01',
  location: 'Philmoca, Philadelphia, PA',
  attribution: 'Photo by [Kevin Riley](https://www.flickr.com/photos/cleanandsolid/48671522231/in/album-72157710673787206/) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/SoulGlo2.jpg',
  artist: 'Soul Glo',
  date: '2019-09-01',
  location: 'Philmoca, Philadelphia, PA',
  attribution: 'Photo by [Kevin Riley](https://www.flickr.com/photos/cleanandsolid/48671520566/in/album-72157710673787206) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/Morrissey.jpg',
  artist: 'Morrissey',
  date: '2006-03-16',
  location: 'SXSW Festival, Austin, TX',
  attribution: 'Photo by [Jason Upshaw](https://commons.wikimedia.org/wiki/File:Morrissey-SXSW2006.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/PeterHook.jpg',
  artist: 'Peter Hook and the Light',
  date: '2018-01-14',
  location: 'Rockaway Beach Festival, UK',
  attribution: 'Photo by [Paul Hudson](https://commons.wikimedia.org/wiki/File:Rockaway_Beach-_Peter_Hook_and_the_Light_(38804863955).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/NewOrder.jpg',
  artist: 'New Order',
  date: '2012-07-15',
  location: 'EXIT Festival, Serbia',
  attribution: 'Photo by [Irma Puškarević, EXIT Photo Team](https://commons.wikimedia.org/wiki/File:EXIT_2012_New_Order.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/DaxRiggs.jpg',
  artist: 'Dax Riggs',
  date: '2011-03-16',
  location: 'Emo’s, SXSW Festival, Austin, TX',
  attribution: 'Photo by [Jason Persse](https://commons.wikimedia.org/wiki/File:Dax_Riggs_@_Emo%27s_2.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/AdrianBelew.jpg',
  artist: 'Adrian Belew',
  date: '2017-04-16',
  location: 'Paradise Garage, Lisbon, Portugal',
  attribution: 'Photo by [Mogwai73](https://commons.wikimedia.org/wiki/File:Adrian_Belew,_live_in_Lisbon,_2017.jpg) / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)'
},
{
  src: '/images/Primus.jpg',
  artist: 'Primus',
  date: '2014-09-13',
  location: 'Concord Music Hall, Chicago, IL',
  attribution: 'Photo by [swimfinfan](https://commons.wikimedia.org/wiki/File:Primus_Concord,_Chicago_2014.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/BobDylan.jpg',
  artist: 'Bob Dylan and Joan Baez',
  date: '1963-08-28',
  location: 'March on Washington, Washington, D.C.',
  attribution: 'Photo by [Rowland Scherman / U.S. National Archives](https://commons.wikimedia.org/wiki/File:Joan_Baez_Bob_Dylan.jpg) / Public Domain (U.S. Government work)'
},
{
  src: '/images/BobDylan2.jpg',
  artist: 'Bob Dylan and The Band',
  date: '1974',
  location: 'Chicago, IL',
  attribution: 'Photo by [Jim Summaria](https://commons.wikimedia.org/wiki/File:Bob_Dylan_and_The_Band_-_1974.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/Pavement.jpg',
  artist: 'Pavement',
  date: '2010-10-02',
  location: 'The Pearl, Palms Casino, Las Vegas, NV',
  attribution: 'Photo by [Redheadwalking](https://www.flickr.com/photos/redheadwalking) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)'
},
{
  src: '/images/TheReplacements.jpg',
  artist: 'The Replacements',
  date: '1982',
  location: "Duffy's Bar, Minneapolis, MN",
  attribution: 'Publicity photo via Twin/Tone Records / [Public Domain - no copyright notice per U.S. law](https://commons.wikimedia.org/wiki/File:The_Replacements_(1982_Twin_Tone_publicity_photo_at_Duffy%27s)_(cropped).jpg)',
},
{
  src: '/images/ModelActriz.png',
  artist: 'Model/Actriz',
  date: '2023-05-27',
  location: 'London, UK',
  attribution: 'Photo by [Will Bonniker] (https://upload.wikimedia.org/wikipedia/commons/9/99/Model_Actriz_live.png) / [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)',
},
{
  src: '/images/Thou.jpg',
  artist: 'Thou',
  date: '2022-07-01',
  location: 'Leipzig, Germany',
  attribution: 'Photo by [UT Connewitz Photo Crew](https://www.flickr.com/photos/utconnewitz/52190629825/in/album-72177720300268442/) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)',
},
{
  src: '/images/TheFall.jpg',
  artist: 'The Fall',
  date: '2016-11-03',
  location: 'Berlin, Germany',
  attribution: 'Photo by [Stefan Müller] (https://www.flickr.com/photos/stefan-mueller-net/32439147012/) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)',
},
{
  src: '/images/TheFall2.jpg',
  artist: 'The Fall',
  date: '1981-07-25',
  location: 'San Francisco, CA',
  attribution: 'Photo by [Steve Harlow] / (https://www.flickr.com/photos/p0ps/3386701070) / [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)',
},
{
  src: '/images/Autechre.jpg',
  artist: 'Autechre',
  date: null,
  location: 'SeOne Club, London',
  attribution: 'Photo by [Sarah Jeynes](https://commons.wikimedia.org/wiki/File:Autechre_SeOne.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/Autechre2.jpg',
  artist: 'Autechre',
  date: '2010-04-09',
  location: 'Ancienne Belgique, Brussels, Belgium',
  attribution: 'Photo by [Kmeron](https://www.flickr.com/photos/kmeron/4511533706) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/Kraftwerk.jpg',
  artist: 'Kraftwerk',
  date: '2013-05-15',
  location: 'Tokyo, Japan',
  attribution: 'Photo by [Takahiro Kyono](https://www.flickr.com/photos/takaponjp/9022553467) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/TheClash2.jpg',
  artist: 'The Clash',
  date: '1979-10-15',
  location: 'Seattle, Washington',
  attribution: 'Photo by [Bob Kondrak](https://www.flickr.com/photos/dan10things/4493301872) / [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)',
},
{
  src: '/images/AphexTwin.jpg',
  artist: 'Aphex Twin',
  date: '2009-07-18',
  location: 'Stadio Armando Picchi, Livorno, Italy',
  attribution: 'Photo by [von_boot](https://www.flickr.com/photos/von_boot/3740636901) / [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)'
},
{
  src: '/images/Ween2.jpg',
  artist: 'Ween',
  date: '1993',
  location: 'The Charlotte, Leicester, UK',
  attribution: 'Photo by [Greg Neate](https://commons.wikimedia.org/wiki/File:Ween_(1993).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Ween3.jpg',
  artist: 'Ween',
  date: '2009-08-30',
  location: null,
  attribution: 'Photo by [Moses Namkung](https://commons.wikimedia.org/wiki/File:Flickr_-_moses_namkung_-_Ween_5.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Ween4.jpg',
  artist: 'Ween',
  date: '2007-06-09',
  location: 'Metropolis, Montreal, Canada',
  attribution: 'Photo by [Jared Vincent](https://commons.wikimedia.org/wiki/File:Ween-Montreal07.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/McLusky.jpg',
  artist: 'McLusky',
  date: '2004-06-15',
  location: 'Southgate House, Newport, Kentucky',
  attribution: 'Photo by [Kevin D. Hartnell](https://commons.wikimedia.org/wiki/File:Andy_%27falco%27_falkous_mcLusky_newport_ky.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)'
},
{
  src: '/images/Hole.jpg',
  artist: 'Hole',
  date: '2010-07-01',
  location: null,
  attribution: 'Photo by [Ted Van Pelt](https://commons.wikimedia.org/wiki/File:Courtney_Love_Hole_(4752517075).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/FionaApple.jpg',
  artist: 'Fiona Apple',
  date: '2012-10-12',
  location: null,
  attribution: 'Photo by [Cara Lynn Martha](https://commons.wikimedia.org/wiki/File:Fiona_Apple_live_2012.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/Melvins.jpg',
  artist: 'Melvins',
  date: '2006-10-13',
  location: null,
  attribution: 'Photo by [David McMahon](https://commons.wikimedia.org/wiki/File:Melvins_live_20061013.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/Melvins3.jpg',
  artist: 'Melvins',
  date: '2010-09-19',
  location: "Slim's, San Francisco, CA",
  attribution: 'Photo by [Peter Alfred Hess](https://commons.wikimedia.org/wiki/File:Buzz_Osborne_The_Melvins_Live_@_Slim%27s_03.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/ViagraBoys.jpg',
  artist: 'Viagra Boys',
  date: '2019-03-16',
  location: 'SXSW Festival, Austin, TX',
  attribution: 'Photo by [Paul Hudson](https://commons.wikimedia.org/wiki/File:SXSW_2019_-_Viagra_Boys_(47437549961).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/ViagraBoys2.jpg',
  artist: 'Viagra Boys',
  date: '2019-07-19',
  location: 'Latitude Festival, UK',
  attribution: 'Photo by [@markheybo](https://commons.wikimedia.org/wiki/File:Viagra_Boys,_Latitude_Festival_-_48402326516.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/ViagraBoys3.jpg',
  artist: 'Viagra Boys',
  date: '2018-12-06',
  location: 'Plan B, Malmö, Sweden',
  attribution: 'Photo by [MagnusLW](https://commons.wikimedia.org/wiki/File:Viagra_Boys_-_44414604600.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/NeilYoung.jpg',
  artist: 'Neil Young',
  date: '2012-11-18',
  location: null,
  attribution: 'Photo by [Man Alive!](https://commons.wikimedia.org/wiki/File:Neil_Young_2012.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/FlatbushZombies.jpg',
  artist: 'Flatbush Zombies',
  date: '2014-05-09',
  location: 'The Phoenix, Toronto, Canada',
  attribution: 'Photo by [Tiffany Komon](https://commons.wikimedia.org/wiki/File:Flatbush_Zombies_May_9,_2014_The_Phoenix_Toronto_(13994131509).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)'
},
{
  src: '/images/JohnnyCash.jpg',
  artist: 'Johnny Cash',
  date: '1972-09',
  location: 'Bremen, Germany',
  attribution: 'Photo by [Heinrich Klaffs](https://commons.wikimedia.org/wiki/File:Johnny-Cash_1972.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/DEVO.jpg',
  artist: 'DEVO',
  date: '2008-06-27',
  location: 'BofA Pavilion, Boston, MA',
  attribution: 'Photo by [xrayspx](https://www.flickr.com/photos/95582702@N00/2617793876), cropped by [Beyond My Ken](https://commons.wikimedia.org/wiki/File:DEVO,_Boston_6-27-08_crop.jpg) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)'
},
{
  src: '/images/DEVO2.jpg',
  artist: 'DEVO',
  date: '2010-07-24',
  location: 'Walnut Street Bridge, Des Moines, IA',
  attribution: 'Photo by [Phil Roeder](https://flickr.com/photos/88876166@N00/4826719377) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/SilverJews.jpg',
  artist: 'Silver Jews',
  date: '2008-10-12',
  location: 'Exit/In, Nashville, TN',
  attribution: 'Photo by [Rebecca Gillespie](https://www.flickr.com/photos/americansongwriter/3040387580) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)',
},
{
  src: '/images/SilverJews2.jpg',
  artist: 'Silver Jews',
  date: '2006-08-19',
  location: 'Green Man Festival, Glanusk, Wales',
  attribution: 'Photo by [Oliver Lindberg](https://www.flickr.com/photos/oliverlindberg/769935291) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)',
},
{
  src: '/images/ErykahBadu.jpg',
  artist: 'Erykah Badu',
  date: '2006-07-09',
  location: 'Bruges, Belgium',
  attribution: 'Photo by [Yancho Sabev](https://commons.wikimedia.org/wiki/File:Erykah_Badu_FEP.jpg) / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)',
},
{
  src: '/images/REM.jpg',
  artist: 'R.E.M.',
  date: '1985',
  location: 'Ghent, Belgium',
  attribution: 'Photo by [Yves Lorson](https://commons.wikimedia.org/wiki/File:R.E.M.,_Belgium,_1985.jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/BuiltToSpill.jpg',
  artist: 'Built to Spill',
  date: '2016-06-28',
  location: 'Sled Island Festival, Calgary, Canada',
  attribution: 'Photo by [Levi Manchak](https://commons.wikimedia.org/wiki/File:Built_to_Spill_(27888178651).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/XiuXiu.jpg',
  artist: 'Xiu Xiu',
  date: '2017-05-16',
  location: 'Sonic, Lyon, France',
  attribution: 'Photo by [jean-daniel pauget](https://commons.wikimedia.org/wiki/File:Xiu-xiu_(34718009395).jpg) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/NoMeansNo.jpg',
  artist: 'NoMeansNo',
  date: '2011-04-10',
  location: 'Sala La Iguana, Vigo, Spain',
  attribution: 'Photo by [Adrián Estévez](https://commons.wikimedia.org/wiki/File:NoMeansNo@Vigo.jpg) / [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)',
},
{
  src: '/images/NoMeansNo2.jpg',
  artist: 'NoMeansNo',
  date: '2009-10-18',
  location: "Harlow's, Sacramento, CA",
  attribution: 'Photo by [watashiwani](https://www.flickr.com/photos/watashiwani/4028004965) / [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)',
},
{
  src: '/images/BeastieBoys.jpg',
  artist: 'Beastie Boys',
  date: '1992-09',
  location: 'Club Citta, Kawasaki, Japan',
  attribution: 'Photo by [Masao Nakagami](https://www.flickr.com/photos/45489981@N00/223859228) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)',
},
{
  src: '/images/Portishead.jpg',
  artist: 'Portishead',
  date: '2011-07-23',
  location: 'Alexandra Palace, London, UK',
  attribution: 'Photo by [Paul Carless](https://www.flickr.com/photos/bluebloke/5966742171) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)',
},
{
  src: '/images/Portishead2.jpg',
  artist: 'Portishead',
  date: '2012-06-26',
  location: 'Castello Scaligero, Villafranca di Verona, Italy',
  attribution: 'Photo by [Daniele Dalledonne](https://www.flickr.com/photos/daniele_dalledonne/7466158918) / [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/)',
},
{
  src: '/images/Slint.jpg',
  artist: 'Slint',
  date: '2007',
  location: null,
  attribution: 'Photo by [michael morel](https://www.flickr.com/photos/21026676@N00/524620482) / [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)',
},
{
  src: '/images/Swans4.jpg',
  artist: 'Swans',
  date: '2015-07-04',
  location: 'ATP Iceland, Iceland',
  attribution: 'Photo by [AO\'D](https://www.flickr.com/photos/146013120@N07/with/19221663088/) / [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)',
},














];

// Helper function to convert Markdown-style links in attribution to HTML
function formatAttribution(markdown) {
  if (!markdown) return '';
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

// helper to shuffle photo array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Slideshow() {
// shuffle images once on initial load
  const [shuffledImages] = useState(() => shuffleArray(images));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % shuffledImages.length);
    }, 4300); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [shuffledImages]);

  const current = shuffledImages[index];

  return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/*fullscreen image with scaling*/}
        <img
          src={current.src}
          alt={`${current.artist} concert`}
          style={{
            width: '100%',
            height: '100%',
            //fill screen but may crop
            objectFit: 'cover',
            //keep crop centered on object
            objectPosition: 'center',
            opacity: 1,
            transition: 'opacity 1s ease-in-out',
          }}
        />

        {/*caption overlay in bottom right*/}
        <div className = "slideshow-caption">
          <div>
            {current.artist} – {current.date}
            {current.location ? ` @ ${current.location}` : ''}
          </div>
          {current.attribution && (
            <small
              dangerouslySetInnerHTML={{ __html: formatAttribution(current.attribution) }}
            />
          )}
        </div>
      </div>
    );
}

export default Slideshow;
