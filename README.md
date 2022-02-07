<h1 align="center">CodersCamp2021 | Projekt Zespołowy | React</h1>

![Wyróżniony obrazek](docs/featured.png?raw=true)
<div align="center">

[![Demo](https://img.shields.io/badge/-demo-green?logo=github)](https://coderscamp2021-hk.github.io/CodersCamp2021.Project.React/)
[![Coverage](https://img.shields.io/codecov/c/github/CodersCamp2021-HK/CodersCamp2021.Project.React?logo=codecov)](https://app.codecov.io/gh/CodersCamp2021-HK/CodersCamp2021.Project.React)

</div>

## Zespół projektowy 👨‍💻
Zespół pracował w ramach kursu [CodersCamp](https://www.coderscamp.edu.pl/). Aplikację wykonali uczestnicy kursu przy pomocy mentora.

<table>
  <thead>
    <tr>
      <th colspan="2">Mentor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>

![HK](src/public/img/hk_pixel.png?raw=true)
      </td>
      <td>**Hubert Kawałek** ([@htk4](https://github.com/htk4))</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="4">Uczestnicy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">
        
![MM](src/public/img/mm_pixel.png?raw=true)
      </td>
      <td>**Marta Mejer** ([@mmejer](https://github.com/mmejer))</td>
      <td rowspan="2">
        
![TC](src/public/img/tc_pixel.png?raw=true)
      </td>
      <td>**Tomasz Chojnacki** ([@tchojnacki](https://github.com/tchojnacki))</td>
    </tr>
    <tr>
      <td>Tech Lead</td>
      <td>Project Manager</td>
    </tr>
    <tr>
      <td rowspan="2">
        
![JS](src/public/img/js_pixel.png?raw=true)
      </td>
      <td>**Justyna Skrajna** ([@jskrajna](https://github.com/jskrajna))</td>
      <td rowspan="2">
        
![KD](src/public/img/kd_pixel.png?raw=true)
      </td>
      <td>**Kamil Dudek** ([@KamilDudek](https://github.com/mmejer))</td>
    </tr>
    <tr>
      <td>Designer</td>
      <td>Scrum Master</td>
    </tr>
  </tbody>
</table>

## King and Pigs 👑🐷
### Cel projektu
Celem projektu było stworzenie gry platformowej dostępnej online. W tym celu wykorzystaliśmy darmowy pakiet grafik ze strony [itch.io](https://pixelfrog-assets.itch.io/kings-and-pigs). Aplikacja została wykonana według wymagań dostarczonych przez organizatorów CodersCamp.

### Działanie aplikacji
#### Menu główne
Menu główne stanowi zbiór przycisków przenoszących użytkownika do innych sekcji aplikacji.

![Menu główne](docs/menu.png?raw=true)

#### Sterowanie
Popup ze sterowaniem wyjaśnia użytkownikowi w jaki sposób poruszać się po poziomach oraz jak atakować przeciwników.

![Sterowanie](docs/controls.png?raw=true)

#### Spis autorów
Widok spisu autorów przedstawia autorów projektu, mentora zespołu oraz zawiera odnośniki do stron repozytorium projektu i autora grafik.

![Spis autorów](docs/credits.png?raw=true)

#### Wybór poziomu
Na tym ekranie użytkownik może wybrać poziom spośród odblokowanych, na którym będzie grał.

![Wybór poziomu](docs/levels.png?raw=true)

#### Rozgrywka
Postać użytkownika - król zaczyna rozgrywkę w miejscu drzwi wejściowych i musi dostać się do drugich drzwi pokonując po drodze przeciwników. Zgodnie z popupem wyjaśniającym sterowanie, gracz porusza się korzystając ze strzałek, a atakuje naciskając przycisk X na klawiaturze. Życie króla jest ograniczone i reprezentowane przez serduszka wyświetlane w lewym górnym rogu ekranu. Przeciwnicy - świnki, zaczynają gonić gracza po zauważeniu go oraz atakują gdy do niego dobiegną. Każdy atak świnki zmniejsza zdrowie króla o jeden, po straceniu wszystkich punktów życia gracz przegrywa poziom i musi go rozegrać od początku.

Z tego ekranu gracz może również powrócić do ekranu wyboru poziomu.

![Rozgrywka](docs/game.png?raw=true)

## Development projektu 🛠
### Wykorzystywane technologie
Do stworzenia aplikacji wykorzystaliśmy:
- JavaScript z biblioteką React
- Canvas API do stworzenia silnika gry
- CSS oraz Emotion, aby umieścić CSS w JS
- HTML

Pozostałe narzędzia wspomagające pracę to:
- Yarn - zarządzanie pakietami
- Vite - bundler
- Jest + React Testing Library - testowanie
- Storybook - do podglądu komponentów
- ESLint - linting
- Prettier - formatowanie plików
- VS Code - edytor tekstu
- Git - system kontroli wersji
- GitHub - hostowanie repozytorium i demo projektu
- Figma - mockupy

### Uruchomienie projektu
Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:
1. Zainstaluj projekt za pomocą: `yarn install`
2. Uruchom serwer developerski: `yarn dev`

### Uruchomienie testów
Aby uruchomić testy aplikacji, wykonaj następujące kroki:
1. Zainstaluj projekt za pomocą komendy: `yarn install`
1. Uruchom testy, wykonując komendę: `yarn test` (`yarn test --coverage` aby wyświetlić informacje o pokryciu testami)

### Uruchomienie Storybook
Aby uruchomić Storybook, wykonaj następujące kroki:
1. Zainstaluj projekt za pomocą komendy: `yarn install`
1. Uruchom Storybook, wykonując komendę: `yarn storybook`

### Organizacja pracy
Spośród członków zespołu wyznaczyliśmy osoby pełniące następujące role:
- Scrum Master: [@KamilDudek](https://github.com/KamilDudek)
  - rozpisywanie zadań poprzez GitHub Issues
  - prowadzenie daily w trakcie spotkań na kanale głosowym
- Project Manager: [@tchojnacki](https://github.com/tchojnacki)
  - daily poprzez kanał tekstowy
  - tworzenie dokumentacji
- Tech Lead: [@mmejer](https://github.com/mmejer)
  - przeprowadzanie code review
  - pomoc innym członkom zespołu

Do organizacji wykorzystaliśmy rozwiązania dostarczane przez GitHub, głównie GitHub Issues oraz GitHub Projects. Pracę nad projektem podzieliliśmy na cztery tygodniowe sprinty, podczas których wykonywaliśmy daną część zadań rozpisanych uprzednio w zakładce [Issues](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/issues). Postęp nad zadaniami wizualizowaliśmy za pomocą [tablicy kanban](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/projects/1) oferowanej jako funkcjonalność GitHub Projects. Kod integrowaliśmy do projektu otwierając pull requesty, w których zmiany musiały być zaakceptowane przez co najmniej dwóch członków zespołu. Członkowie wzajemnie wykonywali code review swoich rozwiązań. Zwracaliśmy również uwagę na pokrycie kodu testami.

Projekty interfejsu użytkownika wykonywaliśmy za pomocą narzędzia o nazwie [Figma](https://www.figma.com/). Poszczególne widoki implementowaliśmy w oparciu o wykonane wcześniej projekty.

Dwa razy w tygodniu odbywały się zdalne spotkania zespołu. Dodatkowo, raz w tygodniu każdy uczestnik relacjonował postęp swoich prac oraz ewentualne problemy poprzez kanał tekstowy.
