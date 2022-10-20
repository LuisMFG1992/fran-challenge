import "./App.css";
import ImgixClient from "@imgix/js-core";
import { useEffect, useRef, useState } from "react";
import Input from "./Components/Input/Input";

// const inputs = [
//   {
//     optionName: "Flip Axis",
//     options: ["h", "v", "hv"],
//   },
//   {
//     optionName: "Orientation",
//     options: [1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270],
//   },
//   {
//     optionName: "Rotation",
//     options: [0, 359],
//   },
// ];

// TODO: Crear estos inputs para que a medida que el usuario agregue propiedades con sus valores se vayan agregando al objeto.
// TODO: El objeto creado debe ser guardado en un estado para poder tener el estado previo y de esa forma tener forma del hacer el undo.

const client = new ImgixClient({
  domain: "assets.imgix.net",
  secureURLToken: "",
});

const urlCreator = (imageUrl, paramsObj) => {
  return client.buildURL(imageUrl, paramsObj);
};

function App() {
  const flipRef = useRef();
  const selectedImageRef = useRef();

  const [images, setImages] = useState([]);
  const [params, setParams] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [fullURL, setFullURL] = useState("");

  const paramsHandler = (inputValue) => {
    setParams((prevState) => {
      return { ...prevState, inputValue };
    });
  };

  // Trae todas las imagenes
  useEffect(() => {
    (async function imageHandler() {
      const response = await fetch(
        "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json"
      );
      const data = await response.json();
      const urlImages = data.map((element) => element.url.slice(25));
      setImages(urlImages);
    })();
  }, []);

  useEffect(() => {
    if (!imageUrl) return;

    console.log(fullURL);
    setFullURL(urlCreator(imageUrl, params));
    console.log("URL CHANGE");
  }, [imageUrl, params]);

  const selectedImageHandler = () => {
    const selectedImage = selectedImageRef.current.value;
    setImageUrl(selectedImage);
  };

  const inputHandler = (paramName) => {
    const inputValue = flipRef.current.value;
    if (!inputValue) {
      delete params.flip;
      console.log("borrado", params);
      // TODO: Se borra el objeto pero aun queda el query en la url &flip=
    }
    setParams((prevState) => {
      return { ...prevState, flip: inputValue };
    });

    // setFullURL(urlCreator(imageUrl, params));
    // console.log(flipRef.current.value);
    // console.log("name", name);
    // setFullURL(urlCreator(imageURL, params));
  };

  return (
    <>
      <div className="App">
        <div className="w-4/5 h-screen rounded-lg shadow-lg flex justify-center items-center">
          {fullURL === "" ? <p>Select image</p> : <img src={fullURL} />}
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
            <Input
              paramsHandler={paramsHandler}
              refe={flipRef}
              inputHandler={inputHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
