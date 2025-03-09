import { Song } from "../models/song.model";

export const SONGS: Song[] = [
  {
    id: "bad8088f-7587-4984-b6f4-945a04ffcef5",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    year: 1976,
    genre: "Rock"
  },
  {
    id: "605cfa13-bdad-4750-bb8a-d802bdc2fb0c",
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    year: 1987,
    genre: "Rock"
  },
  {
    id: "d5327034-5b9b-4796-97a0-62f74a9b760a",
    title: "Like a Prayer",
    artist: "Madonna",
    album: "Like a Prayer",
    year: 1989,
    genre: "Pop"
  },
  {
    id: "c3b39f70-8c7d-457c-bab1-90691a69b395",
    title: "Rapper's Delight",
    artist: "The Sugarhill Gang",
    album: "Sugarhill Gang",
    year: 1979,
    genre: "Hip Hop"
  },
  {
    id: "0182d268-64e9-43dc-8c49-4167a13c61e6",
    title: "Planet Rock",
    artist: "Afrika Bambaataa & Soulsonic Force",
    album: "Planet Rock: The Album",
    year: 1986,
    genre: "Electronic"
  },
  {
    id: "097ed85c-8e01-446e-9a31-7c25b905d2ae",
    title: "What a Wonderful World",
    artist: "Louis Armstrong",
    album: "What a Wonderful World",
    year: 1970,
    genre: "Jazz"
  },
  {
    id: "303c219b-4147-41f0-b227-37540a06e275",
    title: "Sexual Healing",
    artist: "Marvin Gaye",
    album: "Midnight Love",
    year: 1982,
    genre: "R&B"
  },
  {
    id: "23ae9aea-00a2-4848-add3-ac68bbf39878",
    title: "Jolene",
    artist: "Dolly Parton",
    album: "Jolene",
    year: 1973,
    genre: "Country"
  },
  {
    id: "2d911fce-cecd-458e-848d-2910bc337641",
    title: "Master of Puppets",
    artist: "Metallica",
    album: "Master of Puppets",
    year: 1986,
    genre: "Metal"
  },
  {
    id: "bc581504-5a2d-4c8b-85d2-ed4aab1ece24",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    genre: "Pop"
  },
  {
    id: "6ca03779-cc4c-460f-84da-d5147860a0a5",
    title: "Girls Just Want to Have Fun",
    artist: "Cyndi Lauper",
    album: "She's So Unusual",
    year: 1983,
    genre: "Pop"
  },
  {
    id: "cc6da9cf-caf2-4ac6-94e1-febee2a9055f",
    title: "Super Freak",
    artist: "Rick James",
    album: "Street Songs",
    year: 1981,
    genre: "Funk"
  },
  {
    id: "250b8d75-fe70-4aaf-8243-8c080dea7fa0",
    title: "Take on Me",
    artist: "A-ha",
    album: "Hunting High and Low",
    year: 1985,
    genre: "Pop"
  },
  {
    id: "d309b2a7-653b-4c0a-a385-c0871d7efd09",
    title: "I Will Survive",
    artist: "Gloria Gaynor",
    album: "Love Tracks",
    year: 1978,
    genre: "Disco"
  },
  {
    id: "7f1c46f8-050f-4ae3-89b8-23d0dddaa0ce",
    title: "Jump",
    artist: "Van Halen",
    album: "1984",
    year: 1984,
    genre: "Rock"
  },
  {
    id: "c8c92db3-2a0f-44e4-8e8d-95f916b604ea",
    title: "Faith",
    artist: "George Michael",
    album: "Faith",
    year: 1987,
    genre: "Pop"
  },
  {
    id: "5538b858-89cd-469f-9474-bcea7f45e7e5",
    title: "Born to Run",
    artist: "Bruce Springsteen",
    album: "Born to Run",
    year: 1975,
    genre: "Rock"
  },
  {
    id: "7372190a-7164-47dd-8a43-37dd184c4b26",
    title: "Pump Up the Volume",
    artist: "M/A/R/R/S",
    album: "Pump Up the Volume",
    year: 1987,
    genre: "Electronic"
  },
  {
    id: "07f0fec8-30d6-49e1-b583-2b7518b5a2b8",
    title: "Walk This Way",
    artist: "Run-D.M.C.",
    album: "Raising Hell",
    year: 1986,
    genre: "Hip Hop"
  },
  {
    id: "b4f7509f-85ea-45b2-ae3f-fa0fe3d3ebe4",
    title: "I Wanna Dance with Somebody",
    artist: "Whitney Houston",
    album: "Whitney",
    year: 1987,
    genre: "Pop"
  },
  {
    id: "e8a62c9d-1ce6-44d5-82bd-a8d2127c0c97",
    title: "I Need Love",
    artist: "LL Cool J",
    album: "Bigger and Deffer",
    year: 1987,
    genre: "Hip Hop"
  },
  {
    id: "441e8265-1d24-4d8e-9314-cde509fbaf3b",
    title: "Rhythm Nation",
    artist: "Janet Jackson",
    album: "Rhythm Nation 1814",
    year: 1989,
    genre: "R&B"
  }
];

export const ARTISTS = [...new Set(SONGS.map((song) => song.artist))];

export const GENRES = [...new Set(SONGS.map((song) => song.genre))];
