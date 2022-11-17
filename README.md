

<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">POKEMON APP</h3>

  <p align="center">
    Project built using open source <a href="https://pokeapi.co">Pokemon API</a>
    <br />
    <a href="https://github.com/anAverageSlavGuy/readme-template"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Menu</summary>
  <ul>
    <li>
      📷 <a href="#-about-the-project">About The Project</a>
      <ul>
        <li>🔨 <a href="#-built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      🔥 <a href="#-getting-started">Getting Started</a>
      <ul>
        <li>📚 <a href="#-prerequisites">Prerequisites</a></li>
        <li>🔧 <a href="#-installation">Installation</a></li>
      </ul>
    </li>
    <li>🚀 <a href="#-usage">Usage</a></li>
  </ul>
</details>


<!-- ABOUT THE PROJECT -->
## 📷 About The Project

[![Pokeapp Screen Shot][project-screenshot]](https://github.com/anAverageSlavGuy/pokeapp)

<p align="right">(<a href="#top">back to top</a>)</p>


### 🔨 Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Prisma](https://www.prisma.io/)
* [Material UI](https://mui.com/)
* [PokeApi](https://pokeapi.co/)

<p align="right">(<a href="#top">back to top</a>)</p> 

<!-- GETTING STARTED -->
## 🔥 Getting Started

In this document I explain how to install and run the application in a few simple steps.
Read on and follow the step-by-step guide.

### 📚 Prerequisites


* Install Node JS and NPM.
  ```sh
  npm install npm@latest -g
  ```
* Check if they are correctly installed.
  ```sh
  node -v
  npm -v
  ```

### 🔧 Installation

1. First of all you have to clone the repository
   ```sh
   git clone https://github.com/anAverageSlavGuy/pokeapp.git
   ```
2. Install NPM packages in project root folder
   ```sh
   cd pokeapp 
   npm install
   ```
3. Install NPM packages in client folder (NextJS application)
   ```sh
   cd client
   npm install
   ```
4. Now just build the project and you will get the compiled version of NextJS app 
   ```sh
   npm run build
   ```
5. Now you are ready to start the application in project root directory (default: pokeapp)
   ```sh
   cd ..
   npm run start
   ```
6. You should now see that the application has started on http://localhost:3000 and Express api are on http://localhost:5000
<br />
   :warning: Default API port can be changed in <b>.env</b> file, in the root directory
   <br/>
   :warning: Instead URL to which all client requests point is editable in <b>client/.env.local<b>

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## 🚀 Usage

Loading the application the list of all the teams present with the relative pokemons will appear, clicking on a team it is possible to change the name or add a random pokemon to the team (As long as you can catch it :stuck_out_tongue_winking_eye:), it is also possible to delete the team with the button at the bottom of the page.
<br/>
You can also create a new team assigning a unique name and you can immediately try to add some pokemons to your collection.
<br/>
Pokemons owned by the team will always be shown, so you always know which ones you have :smiley:

<p align="right">(<a href="#top">back to top</a>)</p>
