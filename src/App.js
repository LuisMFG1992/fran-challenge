import "./App.css";
import ImgixClient from "@imgix/js-core";
import { useEffect, useRef, useState } from "react";
import Input from "./Components/Input/Input";
import Button from "./Components/Button/Button";

// TODO: El objeto creado debe ser guardado en un estado para poder tener el estado previo y de esa forma tener forma del hacer el undo.

const client = new ImgixClient({
  domain: "assets.imgix.net",
  secureURLToken: "",
});

const urlCreator = (imageUrl, paramsObj) => {
  return client.buildURL(imageUrl, paramsObj);
};

function App() {
  const testRef = useRef();
  const flipRef = useRef();
  const orientationRef = useRef();
  const rotationRef = useRef();
  const selectedImageRef = useRef();

  const [images, setImages] = useState(["Select image"]);
  const [params, setParams] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [fullURL, setFullURL] = useState("");

  // Trae todas las imagenes
  useEffect(() => {
    (async function imageHandler() {
      const response = await fetch(
        "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json"
      );
      const data = await response.json();
      console.log(data);
      const urlImages = data.map((element) => element.url.slice(25));
      setImages((prevState) => prevState.concat(urlImages));
    })();
  }, []);

  useEffect(() => {
    if (!imageUrl) return;

    setFullURL(urlCreator(imageUrl, params));
  }, [imageUrl, params]);

  const selectedImageHandler = () => {
    const selectedImage = selectedImageRef.current.value;
    setImageUrl(selectedImage);
  };

  const paramsHandler = (refe) => {
    const inputValue = refe.current.value;
    const inputId = refe.current.id;

    console.log({ inputValue });

    if (!inputValue) {
      setParams((current) => {
        const copy = { ...current };
        delete copy[inputId];
        return copy;
      });
    } else {
      setParams((prevState) => {
        return { ...prevState, [inputId]: inputValue };
      });
    }
  };

  const rotationInputsOptions = [
    {
      ref: flipRef,
      name: "Flip Axis",
      id: "flip",
      options: ["", "h", "v", "hv"],
    },
    {
      ref: orientationRef,
      name: "Orientation",
      id: "orient",
      options: ["", 1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270],
    },
    {
      ref: rotationRef,
      name: "Rotation",
      id: "rot",
      options: [0, 359],
      placeholder: "From 0 to 359",
    },
  ];

  const adjustmentInputsOptions = [
    // options and placeholder van hardcodeados pq todos van de -100 a 100 y 0 es el default
    {
      ref: "",
      name: "Brightness",
      id: "bri",
    },
    {
      ref: "",
      name: "Contrast",
      id: "con",
    },
    {
      ref: "",
      name: "Exposure",
      id: "exp",
    },
    {
      ref: "",
      name: "Gamma",
      id: "gam",
    },
    {
      ref: "",
      name: "Highlight",
      id: "high",
    },
    {
      ref: "",
      name: "Hue Shift",
      id: "hue",
    },
    {
      ref: "",
      name: "Invert",
      id: "invert",
    },
    {
      ref: "",
      name: "Saturation",
      id: "sat",
    },
    {
      ref: "",
      name: "Shadow",
      id: "shad",
    },
    {
      ref: "",
      name: "Sharpen",
      id: "sharp",
    },
    {
      ref: "",
      name: "Unsharp Mask",
      id: "usm",
    },
    {
      ref: "",
      name: "Unsharp Mask Radius",
      id: "usmrad",
    },
    {
      ref: "",
      name: "Vibrance ",
      id: "vib",
    },
  ];

  return (
    <>
      <div className="App">
        <div className="w-4/5 h-screen rounded-lg shadow-lg flex justify-center items-center overflow-hidden">
          {fullURL === "" || fullURL.includes("Select") ? (
            <p>Select mage</p>
          ) : (
            <img src={fullURL} alt={imageUrl} />
          )}
        </div>
        <div className="overflow-scroll bg-gray-600 w-2/6 h-screen rounded-lg shadow-lg flex items-center flex-col overflow-auto">
          <div className="flex justify-start flex-col">
            <p className="text-2xl font-bold m-1">Image</p>

            <select
              onChange={selectedImageHandler}
              ref={selectedImageRef}
              className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {images.map((element, index) => (
                // TODO: Usar un mejor valor para las key
                <option key={index} value={element}>
                  {element}
                </option>
              ))}
            </select>

            <p className="text-2xl font-bold m-1 mt-8">Rotation</p>

            {rotationInputsOptions.map((input) => {
              return (
                <Input
                  key={input.id}
                  refe={input.ref}
                  name={input.name}
                  paramsHandler={paramsHandler}
                  id={input.id}
                  options={input.options}
                  placeholder={input.placeholder}
                />
              );
            })}

            <p className="text-2xl font-bold m-1 mt-8">Adjustment</p>

            {adjustmentInputsOptions.map((input) => {
              return (
                <Input
                  key={input.id}
                  refe={testRef}
                  name={input.name}
                  paramsHandler={paramsHandler}
                  id={input.id}
                />
              );
            })}

            <div className="m-4">
              <Button label={"Backward"} svg={"backward"} />
              <Button label={"Forward"} svg={"forward"} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-600 dark:text-white flex justify-center items-center flex-col">
        {fullURL}
      </div>
    </>
  );
}

export default App;
