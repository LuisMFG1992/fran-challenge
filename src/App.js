import "./App.css";
import ImgixClient from "@imgix/js-core";
import { useEffect, useRef, useState } from "react";
import Input from "./Components/Input/Input";
import Spinner from "./Components/Spinner/Spinner";

// TODO: Crear estos inputs para que a medida que el usuario agregue propiedades con sus valores se vayan agregando al objeto.
// TODO: El objeto creado debe ser guardado en un estado para poder tener el estado previo y de esa forma tener forma del hacer el undo.

const client = new ImgixClient({
  domain: "assets.imgix.net",
  secureURLToken: "",
});

const inputs = [
  {
    optionName: "Flip Axis",
    options: ["h", "v", "hv"],
  },
  {
    optionName: "Orientation",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270],
  },
  {
    optionName: "Rotation",
    options: [0, 359],
  },
];

function App() {
  const flipRef = useRef();
  const selectedImageRef = useRef();

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Trae los datos del JSON
    (async function imageHandler() {
      const response = await fetch(
        "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json"
      );
      const data = await response.json();
      const urlImages = data.map((element) => element.url.slice(25));
      setImages(urlImages);

      // Hace la peticion a IMAGIX con la primera foto
      const url = client.buildURL(urlImages[0], {
        w: 400,
        h: 400,
      });

      setSelectedImage(url);
    })();
  }, []);

  const selectedImageHandler = () => {
    //TODO: No funciona el renderizado condicional del spinner

    setIsLoading(true);
    const url = client.buildURL(selectedImageRef.current.value, {
      w: 400,
      h: 400,
    });
    // console.log(url);
    setSelectedImage(url);
    setIsLoading(false);
  };

  const inputHandler = () => {
    console.log(flipRef.current.value);
  };

  return (
    <>
      <div className="App">
        <div className="w-4/5 h-screen rounded-lg shadow-lg flex justify-center items-center">
          {isLoading ? <Spinner /> : <img src={selectedImage} />}
        </div>
        <div className="bg-gray-600 w-2/6 h-screen rounded-lg shadow-lg flex justify-center items-center flex-col">
          <div className="flex justify-center items-center flex-col">
            <p className="text-2xl font-bold">Select image</p>
            <select
              onChange={selectedImageHandler}
              ref={selectedImageRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {images.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>

            <p className="text-2xl font-bold">Rotation</p>
            <Input refe={flipRef} inputHandler={inputHandler} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
