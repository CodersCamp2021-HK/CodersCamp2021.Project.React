<h1 align="center">CodersCamp2021 | Projekt Zespołowy | JavaScript</h1>

## Zespół projektowy
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

![HK](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/blob/main/src/public/img/hk_pixel.png?raw=true)
      </td>
      <td>**Hubert Kawałek** ([@htk4](https://github.com/htk4))</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="2">Uczestnicy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">
        
![MM](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/blob/main/src/public/img/mm_pixel.png?raw=true)
      </td>
      <td>**Marta Mejer** ([@mmejer](https://github.com/mmejer))</td>
    </tr>
    <tr>
      <td>Tech Lead</td>
    </tr>
    <tr>
      <td rowspan="2">
        
![JS](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/blob/main/src/public/img/js_pixel.png?raw=true)
      </td>
      <td>**Justyna Skrajna** ([@jskrajna](https://github.com/jskrajna))</td>
    </tr>
    <tr>
      <td>Designer</td>
    </tr>
    <tr>
      <td rowspan="2">
        
![TC](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/blob/main/src/public/img/tc_pixel.png?raw=true)
      </td>
      <td>**Tomasz Chojnacki** ([@tchojnacki](https://github.com/tchojnacki))</td>
    </tr>
    <tr>
      <td>Project Manager</td>
    </tr>
    <tr>
      <td rowspan="2">
        
![KD](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.React/blob/main/src/public/img/kd_pixel.png?raw=true)
      </td>
      <td>**Kamil Dudek** ([@KamilDudek](https://github.com/mmejer))</td>
    </tr>
    <tr>
      <td>Scrum Master</td>
    </tr>
  </tbody>
</table>

## Kings and Pigs
### Cel projektu
Celem projektu było stworzenie gry platformowej dostępnej online. W tym celu wykorzystaliśmy darmowy pakiet grafik ze strony [itch.io](https://pixelfrog-assets.itch.io/kings-and-pigs). Aplikacja została wykonana według wymagań dostarczonych przez organizatorów CodersCamp.

### Działanie aplikacji
#### Menu główne
Menu główne stanowi zbiór przycisków przenoszących nas do innych sekcji aplikacji.

#### Sterowanie
Popup ze sterowaniem wyjaśnia użytkownikowi w jaki sposób poruszać się po poziomach oraz jak atakować przeciwników.

#### Spis autorów
Widok spisu autorów przedstawia autorów projektu, mentora zespołu oraz zawiera odnośniki do stron repozytorium projektu i autora grafik.

#### Wybór poziomu
Na tym ekranie użytkownik może wybrać poziom na którym będzie grał spośród odblokowanych.

#### Rozgrywka
Postać użytkownika - król zaczyna rozgrywkę w miejscu drzwi wejściowych i musi dostać się do drugich drzwi pokonując po drodze przeciwników. Zgodnie z popupem wyjaśniającym sterowanie, gracz porusza się korzystając ze strzałek, a atakuje naciskając przycisk X na klawiaturze. Życie postaci jest ograniczone i reprezentowane przez serduszka wyświetlane w lewym górnym rogu ekranu. Przeciwnicy - świnki, zaczynają gonić gracza po zauważeniu go oraz atakują gdy go dopadną. Każdy atak świnki zmniejsza nasze zdrowie o jeden, jeżeli stracimy wszystkie punkty życia przegrywamy poziom i musimy go rozegrać od początku.

Z tego ekranu możemy również powrócić do ekranu wyboru poziomu.

## Development projektu
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

Do organizacji wykorzystaliśmy rozwiązania dostarczane przez GitHub, głównie GitHub Issues oraz GitHub Projects. Pracę nad projektem podzieliliśmy na cztery tygodniowe sprinty, podczas których wykonywaliśmy daną część zadań rozpisanych uprzednio w zakładce [Issues](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.JavaScript/issues). Postęp nad zadaniami wizualizowaliśmy za pomocą [tablicy kanban](https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.JavaScript/projects/1) oferowanej jako funkcjonalność GitHub Projects. Kod integrowaliśmy do projektu otwierając pull requesty, w których zmiany musiały być zaakceptowane przez co najmniej dwóch członków zespołu. Członkowie wzajemnie wykonywali code review swoich rozwiązań. Zwracaliśmy również uwagę na pokrycie kodu testami.

Projekty interfejsu użytkownika wykonywaliśmy za pomocą narzędzia o nazwie [Figma](https://www.figma.com/). Poszczególne widoki implementowaliśmy w oparciu o wykonane wcześniej projekty.

Dwa razy w tygodniu odbywały się zdalne spotkania zespołu. Dodatkowo, raz w tygodniu każdy uczestnik relacjonował postęp swoich prac oraz ewentualne problemy poprzez kanał tekstowy.
