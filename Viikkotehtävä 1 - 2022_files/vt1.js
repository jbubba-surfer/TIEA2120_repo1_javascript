"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen rastileimausten rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin

// Kirjoita tästä eteenpäin oma ohjelmakoodisi


/**
  * Taso 1
  * Järjestää leimaustavat aakkosjärjestykseen 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.leimaustavat-taulukon kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.leimaustavat-taulukosta
*/

function jarjestaLeimaustavat(data) {
  console.log(data);
  let kopiolista = JSON.parse(JSON.stringify(data.leimaustavat));
  kopiolista.sort();
  

  return kopiolista; // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
  //return data.leimaustavat;
}

/**
  * Taso 1
  * Järjestää sarjat aakkosjärjestykseen sarjan nimen perustella 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukon kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.sarjat-taulukosta
  */
function jarjestaSarjat(data) {

  let kopiosarjat = JSON.parse(JSON.stringify(data.sarjat));
  kopiosarjat.sort(function(a,b){
      const nimiA = a.nimi.toUpperCase();
      const nimiB = b.nimi.toUpperCase();
      if (nimiA < nimiB) {
        return -1;
      }
      if (nimiA > nimiB) {
        return 1;
      }

      return 0;
  });

  return kopiosarjat;  // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
}


/**
  * Taso 1
  * Lisää uuden sarjan data-rakenteeseen ja palauttaa muuttuneen datan
  * Sarja lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä sarjaa ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    sarjan nimi ei voi olla pelkkää whitespacea. 
  * - Sarjan keston täytyy olla kokonaisluku ja suurempi kuin 0
  *  Uusi sarja tallennetaan data.sarjat-taulukkoon. Sarjan on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // Jokaisella sarjalle oleva uniikki kokonaislukutunniste, pakollinen tieto
  *     "nimi": {String}, // Sarjan uniikki nimi, pakollinen tieto
  *     "kesto": {Number}, // sarjan kesto tunteina, pakollinen tieto
  *     "alkuaika": {String}, // Sarjan alkuaika, oletuksena ""
  *     "loppuaika": {String}, // Sarjan loppuaika, oletuksena ""
  *  }
  * @param {Object} data - tietorakenne johon sarja lisätään 
  * @param {String} nimi - Lisättävän sarjan nimi
  * @param {String} kesto - Sarjan kesto
  * @param {String} alkuaika - Sarjan alkuaika, ei pakollinen
  * @param {String} loppuaika - Sarjan loppuaika, ei pakollinen
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */

function lisaaSarja(data, nimi, kesto, alkuaika, loppuaika) {
  
  //vertaillaan onko jo saman nimistä sarjaa. Jos on, niin palautetaan alkuperäinen datarakenne
  for (let looppari of data.sarjat){
    if (looppari.nimi.toLowerCase().localeCompare(nimi.toLowerCase())===0){
      return data;
    }
 
  }

  //poistetaan whitespace, jos pituus sen jälkeen nolla, niin palautetaan alkuperäinen data
  let nimitrimmattu = nimi.trim();
  if (nimitrimmattu.length===0){
    return data;
  }

  const muunnettu = Number(data.sarjat.kesto);
  
  if (Number.isInteger(muunnettu)===true&&muunnettu>0===true){
    const obj = {};
    obj.nimi = nimi;
    obj.kesto = kesto;
    obj.alkuaika = alkuaika;
    obj.loppuaika = loppuaika;
    data.sarjat.push(obj);
  }

  return data;
}








/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} data - tietorakenne josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Object} palauttaa muuttuneen alkuperäisen datan
  */
function poistaJoukkue(data, id) {
  let index = 0; //indeksi, jonka perusteella rakenteesta poistetaan
  for (let looppari of data.joukkueet) {
    if (looppari.id==id){
      data.joukkueet.splice(index,1);
    }
    index++; //lisataan indeksia joka kierroksella
  }//for looppi
  return data;
}

/**
  * Taso 3
  * Järjestää rastit aakkosjärjestykseen rastikoodin perustella siten, että 
  * numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen. Alkuperäistä 
  * rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukon kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.rastit-taulukosta
  */
function jarjestaRastit(data) {
  //tehdään syväkopio alkuperäisestä rastit taulukosta, jottei alkuperäinen muutu
  let kopiotaulukko = JSON.parse(JSON.stringify(data.rastit)); //tehdään syväkopio taulukosta

  //funktio joka palauttaa numerollisista arvoista koostuvan rastitaulukon
  function filterByIDnum(item) {
    if (!isNaN(item.koodi.charAt(0))) {
      return true;
    }

    return false;
  }

  //funktio joka palauttaa ei-numeerisilla arvoilla olevat rastit taulukkona
  function filterByIDkirj(item) {
    if (isNaN(item.koodi.charAt(0))) {
      return true;
    }

    return false;
  }
  //tehdään lajitellut taulukot 
  let pelkatnumerot = kopiotaulukko.filter(filterByIDnum);
  let pelkatkirjaimet = kopiotaulukko.filter(filterByIDkirj);
  //aakkostetaan kirjainrastitaulukko
  pelkatkirjaimet.sort((a, b) => {
    let fa = a.koodi.toLowerCase(),
        fb = b.koodi.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
  //yhdistetään taulukot
  Array.prototype.push.apply(pelkatkirjaimet,pelkatnumerot);
  //palautetaan yhdistetty taulukko
  return pelkatkirjaimet;
}


/**
  * Taso 3
  * Lisää joukkueen data-rakenteeseen ja palauttaa muuttuneen datan
  * Joukkue lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä joukkuetta ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    Joukkueen nimi ei voi olla pelkkää whitespacea. 
  *  - Leimaustapoja on annettava vähintään yksi kappale. Leimaustapojen
  *     on löydyttävä data.leimaustavat-taulukosta
  *  - Jäseniä on annettava vähintään kaksi kappaletta. 
  *  - Saman joukkueen jäsenillä ei saa olla kahta samaa nimeä
  *  - Sarjan id on löydyttävä data.sarjat-taulukon sarjoista
  *
  *  Uusi joukkue tallennetaan data.joukkueet-taulukkoon. Joukkueen on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // jokaisella joukkueella oleva uniikki kokonaislukutunniste
  *     "nimi": {String}, // Joukkueen uniikki nimi
  *     "jasenet": {Array}, // taulukko joukkueen jäsenien nimistä
  *     "leimaustapa": {Array}, // taulukko joukkueen leimaustapojen indekseistä (data.leimaustavat)
  *     "rastileimaukset": {Array}, // taulukko joukkueen rastileimauksista. Oletuksena tyhjä eli []
  *     "sarja": {Object}, // viite joukkueen sarjaan, joka löytyy data.sarjat-taulukosta
  *     "pisteet": {Number}, // joukkueen pistemäärä, oletuksena 0
  *     "matka": {Number}, // joukkueen kulkema matka, oletuksena 0
  *     "aika": {String}, // joukkueen käyttämä aika "h:min:s", oletuksena "00:00:00"
  *  }
  * @param {Object} data - tietorakenne johon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {
   //data.joukkueet
  //tarkistetaan, ettei datarakenteessa ole jo samaa nimea
  for (let looppari of data.joukkueet){
    let nimitemp = looppari.nimi.trim();
    let nimilisattava = nimi.trim();
    if (nimilisattava.length==0){
      return data;
    } 
    if (nimitemp.length==0){
      return data;
    } 

    if (nimitemp.toLowerCase()===nimilisattava.toLowerCase()){
      return data;
    }
  }

  //tarkistetaan että leimaustavat löytyvät
  if (leimaustavat.length<1){
    return data;
  }
  for (let looppari of leimaustavat){
    let sisaltaako = data.leimaustavat.indexOf(looppari);
    if (sisaltaako===-1){
      return data;
    }
  
  }
  //tarkistetaan, että jäseniä on tarpeeksi
  if (jasenet.length<2){
    return data;
  } 
  //loopit tarkistavat onko duplikaattijasenia
  for (let looppari of jasenet){
    let indeksi = 0;
    for (let looppari2 of jasenet){
      if (looppari===looppari2){
        indeksi++;
      } 



    }
    if (indeksi>1){
      return data;
    } 
  }

  let sarjaloytyiindeksi = 0;
  //tarkistetaan löytyykö sarja
  for (let looppari of data.sarjat){

    if (looppari.nimi===sarja){
      sarjaloytyiindeksi++;
    } 
    //if (!looppari.nimi==="mirri") return "loytyi sarja";
  }
  if (sarjaloytyiindeksi===0){
    return data;
  } 

  //luodaaan uusi objekti ja lisataan se datarakenteeseen
  let rastileimaukset = [];
  let lisattavajoukkue = {};
  lisattavajoukkue.id = 12345678;
  lisattavajoukkue.nimi = nimi;
  lisattavajoukkue.jasenet = jasenet;
  lisattavajoukkue.leimaustapa = leimaustavat;
  lisattavajoukkue.rastileimaukset = rastileimaukset;
  lisattavajoukkue.sarja = sarja;
  lisattavajoukkue.pisteet = 0;
  lisattavajoukkue.matka = 0;
  lisattavajoukkue.aika = "00:00:00";

data.joukkueet.push(lisattavajoukkue);
 
  
  return data;
}

/**
  * Taso 3
  * Laskee joukkueen käyttämän ajan. Tulos tallennetaan joukkue.aika-ominaisuuteen.
  * Käytä merkkijonoa, jossa aika on muodossa "hh:mm:ss". Esim. "07:30:35"
  * Aika lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * @param {Object} joukkue
  * @return {Object} joukkue
  */

//idea: kaksi eri tyhjää taulukkoa, joihin pusketaan for each funktiolla lahto ja maali rastit
//sitten locale compare tai sort funktiolla pienin tai suurin aika taulukkojen ekaksi
// lopuksi lasketaan erotus, mahdollisesti stringista 8 viimeistä merkkia irrottamalla ensin tunnit, minuutit ja sekunnint
//muunnetaan integeriksi
/* const items = ['item1', 'item2', 'item3'];
const copyItems = [];

items.forEach((item) => {
  copyItems.push(item);
}); */
function laskeAika(joukkue) {
/*   console.log("tahan laske joukkueen aika funktio ---------------------------");
  console.log(joukkue); */
  //joukkue.rastileimaukset.forEach(element => console.log(element.rasti.koodi));
  //console.log(joukkue.rastileimaukset[0].rasti.koodi);
  return joukkue;
}

/**
  * Taso 3 ja Taso 5
  *  Järjestää joukkueet järjestykseen haluttujen tietojen perusteella
  *  järjestetään ensisijaisesti kasvavaan aakkosjärjestykseen 
  *  Järjestäminen on tehtävä alkuperäisen taulukon kopiolle. Alkuperäistä ei saa muuttaa tai korvata.
  *  mainsort-parametrin mukaisen tiedon perusteella. mainsort voi olla nimi, sarja, matka, aika tai pisteet
  *  Joukkueen jäsenet järjestetään aina aakkosjärjestykseen. Alkuperäisen joukkueobjektin jäsenten järjestys ei saa muuttaa.
  *  Joukkueen leimaustavat järjestetään myös aina aakkosjärjestykseen leimaustapojen nimien mukaan
  *  Isoilla ja pienillä kirjaimilla ei ole missään järjestämisissä merkitystä eikä myöskään alussa tai lopussa olevalla whitespacella
  *  sortorder-parametrin käsittely vain tasolla 5
  *  jos sortorder-parametrina on muuta kuin tyhjä taulukko, käytetään 
  *  sortorderin ilmoittamaa järjestystä eikä huomioida mainsort-parametria: 
  *  ensisijaisesti järjestetään taulukon ensimmäisen alkion tietojen perusteella, 
  *  toissijaisesti toisen jne.
  *  sortorder-taulukko sisältää objekteja, joissa kerrotaan järjestysehdon nimi (key),
  *  järjestyssuunta (1 = nouseva, -1 = laskeva) ja järjestetäänkö numeerisesti (true)
  *  vai aakkosjärjestykseen (false)
  *  Toteuta sortorder-taulukon käsittely siten, että taulukossa voi olla vaihteleva määrä rivejä
  *  Sarja täytyy huomioida erikoistapauksena
  *	 sortorder = [
  *	 {"key": "sarja", "order": 1, "numeric": false},
  *	 {"key": "nimi", "order": 1, "numeric": false},
  *	 {"key": "matka", "order": -1, "numeric": true},
  *	 {"key": "aika", "order": 1, "numeric": false},
  *	 {"key": "pisteet", "order": -1, "numeric": true}
  *	]
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
  return data.joukkueet;
}

/**
  * Taso 5
  * Laskee joukkueen kulkeman matkan. Matka tallennetaan joukkue.matka-ominaisuuteen liukulukuna
  * Laske kuinka pitkän matkan kukin joukkue on kulkenut eli laske kunkin rastivälin
  * pituus ja laske yhteen kunkin joukkueen kulkemat rastivälit. Jos rastille ei löydy
  * sijaintitietoa (lat ja lon), niin kyseistä rastia ei lasketa matkaan mukaan. Matka
  * lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * Käytä annettua apufunktiota getDistanceFromLatLonInKm
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeMatka(joukkue) {
  return joukkue;
}

/**
  * Taso 5
  * Laskee joukkueen saamat pisteet. Pistemäärä tallennetaan joukkue.pisteet-ominaisuuteen
  * Joukkue saa kustakin rastista pisteitä rastin koodin ensimmäisen merkin
  * verran. Jos rastin koodi on 9A, niin joukkue saa yhdeksän (9) pistettä. Jos rastin
  * koodin ensimmäinen merkki ei ole kokonaisluku, niin kyseisestä rastista saa nolla
  * (0) pistettä. Esim. rasteista LÄHTÖ ja F saa 0 pistettä.
  * Samasta rastista voi sama joukkue saada pisteitä vain yhden kerran. Jos
  * joukkue on leimannut saman rastin useampaan kertaan lasketaan kyseinen rasti
  * mukaan pisteisiin vain yhden kerran.
  * Rastileimauksia, jotka tehdään ennen lähtöleimausta tai maalileimauksen jälkeen, ei
  * huomioida.
  * Maalileimausta ei huomioida kuin vasta lähtöleimauksen jälkeen.
  * Jos joukkueella on useampi lähtöleimaus, niin pisteet lasketaan vasta
  * viimeisen lähtöleimauksen jälkeisistä rastileimauksista.
  * Joukkue, jolla ei ole ollenkaan rastileimauksia, saa 0 pistettä
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskePisteet(joukkue) {
  return joukkue;
}



// apufunktioita tasolle 5
/**
  * Laskee kahden pisteen välisen etäisyyden
  */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}
/**
   Muuntaa asteet radiaaneiksi
  */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

