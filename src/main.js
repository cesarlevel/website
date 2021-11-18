import './style.css';
import MeshStage from './mesh';
import { gsap } from "gsap";

document.querySelector('#app').innerHTML += `
  <div class="content">
    <small class="name">César Level</small>
    <h1>Front—end developer and graphic designer based in Montréal, Canada.</h1>
    <ul class="link-list">
      <li><a href="https://dribbble.com/aesir" target="_blank">Dribbble</a><span class="underline"></span></li>
      <li><a href="https://github.com/cesarlevel" target="_blank">Github</a><span class="underline"></span></li>
      <li><a href="mailto:cesarlevel@gmail.com" target="_blank">Email</a><span class="underline"></span></li>
    </ul>
  </div>
`;

document.addEventListener('click', changeColor);

const el = document.querySelector('#app');
const title = document.querySelector('h1');
const listItems = document.querySelectorAll('.link-list li');
const myName = document.querySelector('.name');
const mesh = new MeshStage(el);
const backgroundColorArray = [
  ['pink', true],
  ['darkblue'],
  ['indigo'],
  ['azure', true],
  ['beige', true],
  ['bisque', true],
  ['darkslateblue'],
  ['navy'],
];
let lastColorBackgroundColorIndex;

function randomIndex() {
  const index = Math.floor(Math.random() * backgroundColorArray.length);
  if (index !== lastColorBackgroundColorIndex) {
    lastColorBackgroundColorIndex = index;
    return index;
  } else {
    return randomIndex();
  }
}

function changeColor() {
  const [randomBackgroundColor, blackColor = false] =  backgroundColorArray[randomIndex()];

  document.body.style.backgroundColor = randomBackgroundColor;
  document.body.style.color = blackColor ? '#0a1f33' : 'white';
  listItems.forEach(item => item.querySelector('.underline').style.backgroundColor = blackColor ? '#0a1f33' : 'white');
}

gsap.from([title, myName], {
  y: -100,
  opacity: 0,
  stagger: 0.1,
  delay: 0.1,
  ease: 'power2.inOut',
});

gsap.from(listItems, {
  y: 50,
  opacity: 0,
  stagger: 0.1,
  delay: 0.1,
  ease: 'power2.inOut',
});

setTimeout(() => {
  const canvas = document.querySelector('canvas');

  gsap.to(canvas, {
    opacity: 1,
    delay: 0.1,
    ease: 'power2.inOut',
  });
},1500);
