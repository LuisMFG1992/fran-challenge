import "./App.css";
import ImgixClient from "@imgix/js-core";

const client = new ImgixClient({
  domain: "assets.imgix.net",
  secureURLToken: "",
});

const url = client.buildURL("unsplash/alarmclock.jpg", {
  w: 400,

  // TODO: Crear estos inputs para que a medida que el usuario agregue propiedades con sus valores se vayan agregando al objeto.

  // TODO: El objeto creado debe ser guardado en un estado para poder tener el estado previo y de esa forma tener forma del hacer el undo.

  // Rotation
  // flip: h, v, hv
  // orient: 1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270
  // rot: 0 a 359,

  // Adjustment -100 a 100
  // bri
  // con
  // exp
  // gam
  h: 400,
  // hue
  // invert
  // sat
  // shad
  // sharp
  // usm
  // usmrad
  // vib
});

console.log(url);

(async function imageHandler() {
  const response = await fetch(
    "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json"
  );
  const data = await response.json();
  console.log(data);
})();

function App() {
  return (
    <div className="App">
      <div className="bg-gray-600 w-4/5 h-72 rounded-lg shadow-lg flex justify-center items-center"></div>
      <div className="bg-gray-600 w-4/5 h-72 rounded-lg shadow-lg flex justify-center items-center mt-4">
        <h1 className="text-3xl font-bold underline ">inputs</h1>
      </div>
    </div>
  );
}

export default App;
