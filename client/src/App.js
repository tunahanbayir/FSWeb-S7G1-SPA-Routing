import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

export default function App () {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') 
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

 

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact >
            <FilmListesi movies={movieList} />
          </Route>
          <Route path="/filmler/:id" exact>
            <Film />
          </Route>
        </Switch>
      </div>
    <div>
      <KaydedilenlerListesi list={[ /* Burası esnek */]} />

      <div>Bu Div'i kendi Routelarınızla değiştirin</div>
    </div>
    </Router>
  );
}
